// import { useState } from 'react';
// import styled from 'styled-components';
// import Swal from 'sweetalert2';

// import useAuthorizedRequestFinder from '@/apis/useAuthorizedRequestFinder';
// import { SuccessButton } from '@/components/ButtonStyles';
// import TextField from '@/components/FormFields/TextField';

// const FormContainer = styled.div`
//   background-color: var(--bg-dark);
//   border-radius: var(--radius-sm);
//   font-size: var(--font-md);
//   padding-left: var(--padding-lg);
//   padding-right: var(--padding-lg);
//   padding-bottom: var(--padding-sm);
//   @media (max-width: 600px) {
//     padding-left: 0;
//     padding-right: 0;
//   }

//   .form-group {
//     padding: var(--padding-md);
//   }

//   label {
//     font-weight: 600;
//     padding-bottom: var(--padding-xs);
//   }
// `;

// const ButtonsWrapper = styled.div`
//   display: flex;
//   margin-left: var(--margin-lg);
//   margin-top: var(--margin-lg);
//   margin-bottom: var(--margin-md);
//   align-items: center;
// `;

// type RequestIdiomFormProps = {
//   onClose: () => void;
// };

// const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

// const RequestIdiomForm = ({ onClose }: RequestIdiomFormProps) => {
//   const [formData, setFormData] = useState({
//     title: '',
//     contributor: '',
//   });

//   const [validated, setValidated] = useState(false);
//   const getAuthorizedApi = useAuthorizedRequestFinder();

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { id, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [id]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setValidated(true);
//     if (formData.title.trim() === '') return;

//     try {
//       const api = await getAuthorizedApi();
//       await api.post('/', {
//         title: capitalize(formData.title.trim()),
//         contributor: capitalize(formData.contributor.trim()) || null,
//       });

//       Swal.fire({
//         title: 'Request Submitted!',
//         text: 'Your idiom request has been sent.',
//         icon: 'success',
//         timer: 1500,
//         showConfirmButton: false,
//       });
//       onClose();
//     } catch (err) {
//       console.error('Failed to submit request:', err);
//       Swal.fire({
//         title: 'Error',
//         text: 'There was a problem submitting your request.',
//         icon: 'error',
//       });
//     }
//   };

//   return (
//     <FormContainer>
//       <form
//         className={`needs-validation ${validated ? 'was-validated' : ''}`}
//         noValidate
//         onSubmit={handleSubmit}
//       >
//         <TextField
//           label='Idiom'
//           id='title'
//           value={formData.title}
//           onChange={handleInputChange}
//           placeholder='The cat’s out of the bag'
//           required
//           maxLength={100}
//         />
//         <TextField
//           label='Your Name'
//           id='contributor'
//           placeholder='Miles'
//           value={formData.contributor}
//           onChange={handleInputChange}
//           maxLength={50}
//         />
//         <ButtonsWrapper>
//           <SuccessButton type='submit' className='btn btn-success'>
//             Submit
//           </SuccessButton>
//         </ButtonsWrapper>
//       </form>
//     </FormContainer>
//   );
// };

// export default RequestIdiomForm;

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields, isSubmitted },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      contributor: null,
    },
  });

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField
          id='title'
          label='Idiom'
          placeholder='The cat’s out of the bag'
          maxLength={100}
          registration={register('title')}
          error={errors.title}
          isSubmitted={isSubmitted}
          isTouched={!!touchedFields.title}
        />

        <RHFTextField
          id='contributor'
          label='Your Name'
          placeholder='Miles'
          maxLength={50}
          registration={register('contributor')}
          error={errors.contributor}
          isSubmitted={isSubmitted}
          isTouched={!!touchedFields.contributor}
        />

        <ButtonsWrapper>
          <SuccessButton type='submit' className='btn btn-success'>
            Submit
          </SuccessButton>
        </ButtonsWrapper>
      </form>
    </FormContainer>
  );
};

export default RequestIdiomForm;
