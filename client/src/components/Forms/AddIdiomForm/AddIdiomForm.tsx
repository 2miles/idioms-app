import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { z } from 'zod';

import { SuccessButton } from '@/components/ButtonStyles';
import RHFTextAreaField from '@/components/FormFields/RHFTextAreaField';
import RHFTextField from '@/components/FormFields/RHFTextField';
import RHFTimestampField from '@/components/FormFields/RHFTimestampField';
import { IdiomsContext } from '@/context/idiomsContext';
import { NewIdiomInput } from '@/types';

const FormContainer = styled.div`
  background-color: var(--bg-dark);
  border-radius: var(--radius-sm);
  font-size: var(--font-md);
  padding-left: var(--padding-lg);
  padding-right: var(--padding-lg);
  padding-bottom: var(--padding-sm);

  @media (max-width: 600px) {
    padding-left: 0;
    padding-right: 0;
  }

  .form-group {
    padding: var(--padding-md);
  }

  label {
    font-weight: 600;
    padding-bottom: var(--padding-xs);
  }
`;

const FormControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  .form-check {
    margin: var(--margin-lg);
  }
  .button {
    margin: var(--margin-lg);
  }
  label {
    font-weight: normal;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  margin-left: var(--margin-lg);
  margin-top: var(--margin-lg);
  margin-bottom: var(--margin-md);
  max-height: 40px;
  align-items: center;
`;

type AddIdiomProps = {
  onClose: () => void;
  onSucess?: () => void;
};

const schema = z.object({
  title: z.string().min(1, 'Title is required').max(100).trim(),
  titleGeneral: z
    .string()
    .transform((val) => (val.trim() === '' ? null : val))
    .nullable(),
  definition: z
    .string()
    .transform((val) => (val.trim() === '' ? null : val))
    .nullable(),
  contributor: z
    .string()
    .transform((val) => (val.trim() === '' ? null : val))
    .nullable(),
  timestamp: z.date(),
});

type FormValues = z.infer<typeof schema>;

const AddIdiomForm = ({ onClose, onSucess }: AddIdiomProps) => {
  const { addIdiom } = useContext(IdiomsContext);
  const [keepOpen, setKeepOpen] = useState(false);

  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      titleGeneral: null,
      definition: null,
      contributor: null,
      timestamp: new Date(),
    },
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (values: FormValues) => {
    // Format timestamp to backend format (remove milliseconds)
    const formattedTimestamp = moment(values.timestamp).toISOString().split('.')[0] + 'Z';

    const payload: NewIdiomInput = {
      title: values.title,
      title_general: values.titleGeneral,
      definition: values.definition,
      contributor: values.contributor,
      timestamps: formattedTimestamp,
    };

    const addedIdiom = await addIdiom(payload);

    if (addedIdiom) {
      reset(); // clears the form
      Swal.fire({
        title: 'Idiom Added!',
        text: 'The idiom has been successfully added.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
      onSucess?.();

      if (!keepOpen) {
        setTimeout(() => {
          onClose();
        }, 200);
      }
    } else {
      Swal.fire({
        title: 'Error',
        text: 'There was a problem adding the idiom.',
        icon: 'error',
      });
    }
  };

  return (
    <FormContainer>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField
            id='title'
            label='Title'
            placeholder='Pull yourself up by your bootstraps'
            maxLength={100}
          />
          <RHFTextField
            id='titleGeneral'
            label='Title General'
            placeholder="Pull (oneself) up by (one's) (own) bootstraps"
            maxLength={200}
          />
          <RHFTextAreaField
            id='definition'
            label='Definition'
            placeholder="To improve one's life or circumstances through one's own efforts, rather than relying on others."
            rows={3}
          />
          <RHFTimestampField id='timestamp' label='Timestamp' />
          <RHFTextField id='contributor' label='Contributor' placeholder='Miles' maxLength={50} />

          <FormControlsWrapper>
            <ButtonsWrapper>
              <SuccessButton
                type='submit'
                className='btn btn-success'
                data-testid='submit-add-idiom-button'
              >
                Add
              </SuccessButton>
              <div className='form-check'>
                <input
                  id='flexCheckDefault'
                  type='checkbox'
                  className='form-check-input'
                  checked={keepOpen}
                  onChange={(e) => setKeepOpen(e.target.checked)}
                />
                <label className='form-check-label' htmlFor='flexCheckDefault'>
                  Keep Open
                </label>
              </div>
            </ButtonsWrapper>
          </FormControlsWrapper>
        </form>
      </FormProvider>
    </FormContainer>
  );
};

export default AddIdiomForm;
