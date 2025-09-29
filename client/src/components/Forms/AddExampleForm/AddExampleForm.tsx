import { useContext, useState } from 'react';
import Swal from 'sweetalert2';

import { WideSuccessButton } from '@/components/ButtonStyles';
import { IdiomsContext } from '@/context/idiomsContext';
import { ExampleFormValues, exampleSchema } from '@/validation/idiomSchema';

import RHFTextAreaField from '@/components/FormFields/RHFTextAreaField';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { FormContainer, FormControlsWrapper, SubmitButtonWrapper, TitleArea } from '../Form.styles';

type AddExampleProps = {
  idiomId: number;
  idiomTitle: string;
  onClose: () => void;
  onAddSuccess?: () => void;
};

const AddExampleForm = ({ idiomId, idiomTitle, onClose, onAddSuccess }: AddExampleProps) => {
  const { addExampleToIdiom } = useContext(IdiomsContext);
  const [keepOpen, setKeepOpen] = useState(false);

  const methods = useForm<ExampleFormValues>({
    resolver: zodResolver(exampleSchema),
    mode: 'onBlur',
    defaultValues: { newExample: '' },
  });

  const { handleSubmit, reset, formState } = methods;
  const { isSubmitting } = formState;

  const onSubmit = async (values: ExampleFormValues) => {
    try {
      const newExample = await addExampleToIdiom(idiomId, values.newExample);
      if (newExample) {
        reset();
        onAddSuccess?.();
        Swal.fire({
          title: 'Example Added!',
          text: 'The example has been successfully added.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });

        if (!keepOpen) {
          setTimeout(() => {
            onClose();
          }, 200);
        }
      } else {
        throw new Error('No example returned');
      }
    } catch (err) {
      console.error('Error adding idiom.', err);
      Swal.fire({
        title: 'Error',
        text: 'There was a problem adding the example.',
        icon: 'error',
      });
    }
  };

  return (
    <FormContainer>
      <TitleArea>{idiomTitle}</TitleArea>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <RHFTextAreaField
            id='newExample'
            label='New Example'
            placeholder='This is an example sentence.'
            rows={3}
            maxLength={500}
          />
          <FormControlsWrapper>
            <div className='form-check'>
              <input
                id='flexCheckDefault'
                type='checkbox'
                value=''
                className='form-check-input'
                checked={keepOpen}
                onChange={(e) => setKeepOpen(e.target.checked)}
              />
              <label className='form-check-label' htmlFor='flexCheckDefault'>
                Keep Open
              </label>
            </div>
            <SubmitButtonWrapper>
              <WideSuccessButton type='submit' className='btn btn-success' disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add'}
              </WideSuccessButton>
            </SubmitButtonWrapper>
          </FormControlsWrapper>
        </form>
      </FormProvider>
    </FormContainer>
  );
};

export default AddExampleForm;
