import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { z } from 'zod';

import useAuthorizedRequestFinder from '@/apis/useAuthorizedRequestFinder';
import { SuccessButton } from '@/components/ButtonStyles';
import RHFTextField from '@/components/FormFields/RHFTextField';

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

const ButtonsWrapper = styled.div`
  display: flex;
  margin-left: var(--margin-lg);
  margin-top: var(--margin-lg);
  margin-bottom: var(--margin-md);
  align-items: center;
`;

type RequestIdiomFormProps = {
  onClose: () => void;
};

const capitalize = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : '');

const schema = z.object({
  title: z
    .string()
    .min(1, 'Idiom is required')
    .max(100, 'Idiom must be 100 characters or less')
    .trim(),
  contributor: z
    .string()
    .max(50, 'Name must be 50 characters or less')
    .transform((val) => (val.trim() === '' ? null : capitalize(val)))
    .nullable(),
});

type FormValues = z.infer<typeof schema>;

const RequestIdiomForm = ({ onClose }: RequestIdiomFormProps) => {
  const getAuthorizedApi = useAuthorizedRequestFinder();
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      contributor: null,
    },
  });
  const { reset, handleSubmit } = methods;

  const onSubmit = async (values: FormValues) => {
    try {
      const api = await getAuthorizedApi();
      await api.post('/', {
        title: capitalize(values.title),
        contributor: values.contributor,
      });

      Swal.fire({
        title: 'Request Submitted!',
        text: 'Your idiom request has been sent.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
      });
      reset();
      onClose();
    } catch (err) {
      console.error('Failed to submit request:', err);
      Swal.fire({
        title: 'Error',
        text: 'There was a problem submitting your request.',
        icon: 'error',
      });
    }
  };

  return (
    <FormContainer>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <RHFTextField id='title' label='Idiom' placeholder='Break a leg' maxLength={100} />
          <RHFTextField id='contributor' label='Your Name' placeholder='Miles' maxLength={50} />
          <ButtonsWrapper>
            <SuccessButton type='submit' className='btn btn-success'>
              Submit
            </SuccessButton>
          </ButtonsWrapper>
        </form>
      </FormProvider>
    </FormContainer>
  );
};

export default RequestIdiomForm;
