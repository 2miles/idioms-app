import { useContext } from 'react';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { zodResolver } from '@hookform/resolvers/zod';

import { DangerButton, WideSuccessButton } from '@/components/ButtonStyles';
import TextAreaField from '@/components/FormFields/TextAreaField';
import { IdiomsContext } from '@/context/idiomsContext';
import { Example } from '@/types';
import { UpdateExamplesFormValues, updateExamplesSchema } from '@/validation/idiomSchema';

import { FormContainer, SubmitButtonWrapper, TitleArea } from '../Form.styles';

const DeleteButtonArea = styled.div`
  margin: 0 var(--margin-md);
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  button {
    float: right;
  }
`;

type UpdateExamplesProps = {
  idiomId: number;
  examples: Example[];
  idiomTitle: string;
  onClose: () => void;
  onUpdateSuccess?: () => void;
};

const UpdateExamplesForm = ({
  idiomId,
  examples,
  idiomTitle,
  onClose,
  onUpdateSuccess,
}: UpdateExamplesProps) => {
  const { updateExamples, deleteExampleById } = useContext(IdiomsContext);

  const methods = useForm<UpdateExamplesFormValues>({
    resolver: zodResolver(updateExamplesSchema),
    mode: 'onBlur',
    defaultValues: {
      examples: examples.map((e) => ({
        example_id: e.example_id,
        example: e.example || '',
      })),
    },
  });

  const { handleSubmit, control, formState } = methods;
  const { fields, remove } = useFieldArray({
    control,
    name: 'examples',
  });

  const { isSubmitting } = formState;

  const onSubmit = async (values: UpdateExamplesFormValues) => {
    try {
      const savedExamples = await updateExamples(
        idiomId,
        values.examples.map((e) => ({ ...e, idiom_id: idiomId })),
      );
      if (savedExamples) {
        onUpdateSuccess?.();
        Swal.fire({
          title: 'Updated!',
          text: 'Examples have been successfully updated.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
        onClose();
      } else {
        throw new Error('Context updateExamples returned false');
      }
    } catch (err) {
      console.error('Error updating examples:', err);
      Swal.fire({
        title: 'Error',
        text: 'There was a problem updating the examples.',
        icon: 'error',
      });
    }
  };

  const handleDeleteExample = async (index: number, exampleId: number) => {
    try {
      const confirmResult = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this example!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        confirmButtonColor: '#DC3545',
        cancelButtonText: 'No, keep it',
      });

      if (!confirmResult.isConfirmed) return;

      const deleted = await deleteExampleById(exampleId);
      if (deleted) {
        remove(index); // remove from RHF state first for responsiveness
        // update RHF state

        // immediately sync DB with remaining examples
        const current = methods.getValues('examples');
        await updateExamples(
          idiomId,
          current.map((e) => ({ ...e, idiom_id: idiomId })),
        );

        onUpdateSuccess?.(); // tells parent to refresh examples

        Swal.fire({
          title: 'Deleted!',
          text: 'The example has been successfully deleted.',
          icon: 'success',
          timer: 1800,
          showConfirmButton: false,
        });
      } else {
        throw new Error('Failed to delete example');
      }
    } catch (err) {
      console.error('Error deleting example:', err);
      Swal.fire({
        title: 'Error',
        text: 'There was a problem deleting the example.',
        icon: 'error',
      });
    }
  };

  return (
    <FormContainer>
      <TitleArea>{idiomTitle}</TitleArea>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <InputArea>
              <div key={index}>
                <TextAreaField
                  id={`examples.${index}.example`}
                  label={`Example ${index + 1}`}
                  rows={3}
                  aria-label={`Edit example ${index + 1}`}
                />
                <DeleteButtonArea>
                  <DangerButton
                    type='button'
                    className='btn btn-danger'
                    onClick={() => handleDeleteExample(index, field.example_id)}
                  >
                    Delete
                  </DangerButton>
                </DeleteButtonArea>
              </div>
            </InputArea>
          ))}
          <SubmitButtonWrapper>
            <WideSuccessButton type='submit' className='btn btn-primary' disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save'}
            </WideSuccessButton>
          </SubmitButtonWrapper>
        </form>
      </FormProvider>
    </FormContainer>
  );
};

export default UpdateExamplesForm;
