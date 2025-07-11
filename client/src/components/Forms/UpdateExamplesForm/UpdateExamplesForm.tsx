import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { Example } from '@/types';
import { IdiomsContext } from '@/context/idiomsContext';
import TextAreaField from '@/components/FormFields/TextAreaField';
import { DangerButton, PrimaryButton } from '@/components/ButtonStyles';

const FormContainer = styled.div`
  background-color: var(--color-canvas);
  border-radius: var(--radius-sm);
  font-size: var(--font-md);
  padding-right: var(--padding-lg);
  padding-left: var(--padding-lg);
  padding-bottom: var(--padding-lg);

  @media (max-width: 600px) {
    padding-left: 0;
    padding-right: 0;
  }

  .form-group {
    padding: var(--padding-md);
  }

  label {
    font-weight: 600 !important;
    padding-bottom: var(--padding-xs);
  }
`;

const DeleteButtonArea = styled.div`
  margin: 0 var(--margin-md);
`;

const ButtonWrapper = styled.div`
  margin-top: var(--margin-lg);
  margin-left: var(--margin-lg);
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  button {
    float: right;
  }
`;
const TitleArea = styled.div`
  text-align: center;
  font-size: var(--font-xl);
  margin: 0;
  font-style: italic;
  font-weight: normal;
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
  examples: initialExamples,
  idiomTitle,
  onClose,
  onUpdateSuccess,
}: UpdateExamplesProps) => {
  const { updateExamples, deleteExampleById } = useContext(IdiomsContext);
  const [examples, setExamples] = useState<Example[]>([...initialExamples]);

  const handleExampleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const { value } = e.target;
    setExamples((prev) =>
      prev.map((example, i) => (i === index ? { ...example, example: value } : example)),
    );
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
        const updated = examples.filter((_, i) => i !== index);
        setExamples(updated);
        await updateExamples(idiomId, updated);
        onUpdateSuccess?.();
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

  const validateExamples = () => {
    return examples.every((example) => example.example && example.example.trim() !== '');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateExamples()) {
      Swal.fire({
        title: 'Error',
        text: 'All examples must have text.',
        icon: 'warning',
      });
      return;
    }

    try {
      const savedExamples = await updateExamples(idiomId, examples);
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

  return (
    <FormContainer>
      <TitleArea>{idiomTitle}</TitleArea>
      <form onSubmit={handleSubmit}>
        {examples.map((example, index) => (
          <InputArea>
            <div key={index}>
              <TextAreaField
                label={`Example ${index + 1}`}
                id={`example-${index}`}
                value={example.example || ''}
                onChange={(e) => handleExampleChange(e, index)}
                aria-label={`Edit example ${index + 1}`}
              />
              <DeleteButtonArea>
                <DangerButton
                  type='button'
                  className='btn btn-danger'
                  onClick={() => handleDeleteExample(index, example.example_id)}
                >
                  Delete
                </DangerButton>
              </DeleteButtonArea>
            </div>
          </InputArea>
        ))}
        <ButtonWrapper>
          <PrimaryButton type='submit' className='btn btn-primary'>
            save
          </PrimaryButton>
        </ButtonWrapper>
      </form>
    </FormContainer>
  );
};

export default UpdateExamplesForm;
