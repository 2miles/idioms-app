import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import Swal from 'sweetalert2';

import { DangerButton, PrimaryButton } from '@/components/ButtonStyles';
import TextAreaField from '@/components/FormFields/TextAreaField';
import TextField from '@/components/FormFields/TextField';
import TimestampField from '@/components/FormFields/TimestampField';
import { IdiomsContext } from '@/context/idiomsContext';
import { Idiom, UpdateIdiomInput } from '@/types';
import { IdiomFormValues, idiomSchema } from '@/validation/idiomSchema';

import { FormContainer, HalfButton, HalfButtonsWrapper } from '../Form.styles';

type UpdateIdiomProps = {
  idiom: Idiom | null;
  onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClose: () => void;
  onUpdateSuccess?: () => void;
};

const UpdateIdiomForm = ({ idiom, onDelete, onClose, onUpdateSuccess }: UpdateIdiomProps) => {
  const { updateIdiom } = useContext(IdiomsContext);

  const methods = useForm<IdiomFormValues>({
    resolver: zodResolver(idiomSchema),
    mode: 'onBlur',
    defaultValues: {
      title: idiom?.title || '',
      titleGeneral: idiom?.title_general || null,
      definition: idiom?.definition || null,
      contributor: idiom?.contributor || null,
      timestamp: idiom?.timestamps ? new Date(idiom.timestamps) : new Date(),
    },
  });

  const { handleSubmit, formState } = methods;
  const { isSubmitting } = formState;

  const onSubmit = async (values: IdiomFormValues) => {
    // Format for the backend and remove milliseconds
    const formattedTimestamp = moment(values.timestamp).toISOString().split('.')[0] + 'Z';

    const payload: UpdateIdiomInput = {
      title: values.title,
      title_general: values.titleGeneral,
      definition: values.definition,
      contributor: values.contributor,
      timestamps: formattedTimestamp,
    };

    try {
      const updated = await updateIdiom(idiom!.id, payload);

      if (updated) {
        Swal.fire({
          title: 'Updated!',
          text: 'The idiom has been successfully updated.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
        onUpdateSuccess?.();
        onClose();
      } else {
        throw new Error('No idiom returned');
      }
    } catch (error) {
      console.error('Update failed:', error);
      Swal.fire({
        title: 'Error',
        text: 'There was a problem updating the idiom.',
        icon: 'error',
      });
    }
  };

  return (
    <FormContainer>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField id='title' label='Title' maxLength={100} />
          <TextField id='titleGeneral' label='Title General' maxLength={100} />
          <TextAreaField label='Definition' id='definition' rows={3} maxLength={500} />
          <TimestampField label='Timestamp' id='timestamp' />
          <TextField label='Contributor' id='contributor' maxLength={50} />
          <HalfButtonsWrapper>
            <HalfButton as={PrimaryButton} type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save'}
            </HalfButton>
            <HalfButton as={DangerButton} type='button' onClick={onDelete}>
              Delete
            </HalfButton>
          </HalfButtonsWrapper>
        </form>
      </FormProvider>
    </FormContainer>
  );
};

export default UpdateIdiomForm;
