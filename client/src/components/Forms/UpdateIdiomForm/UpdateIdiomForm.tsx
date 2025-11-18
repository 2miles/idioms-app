import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { DangerButton, PrimaryButton } from '@/components/ButtonStyles';
import TextAreaField from '@/components/FormFields/TextAreaField';
import TextField from '@/components/FormFields/TextField';
import TimestampField from '@/components/FormFields/TimestampField';
import { IdiomsContext } from '@/context/idiomsContext';
import { Idiom, UpdateIdiomInput } from '@/types';
import { showError, showSuccess } from '@/utils/alerts';
import { IdiomFormValues, idiomSchema } from '@/validation/idiomSchema';

import { FormContainer, HalfButton, HalfButtonsWrapper } from '../Form.styles';

type UpdateIdiomProps = {
  idiom: Idiom | null;
  onDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClose: () => void;
  onUpdateSuccess?: () => void;
};

const UpdateIdiomForm = ({ idiom, onDelete, onClose, onUpdateSuccess }: UpdateIdiomProps) => {
  const { updateIdiom, upsertOrigin, deleteOrigin } = useContext(IdiomsContext);

  const methods = useForm<IdiomFormValues>({
    resolver: zodResolver(idiomSchema),
    mode: 'onBlur',
    defaultValues: {
      title: idiom?.title || '',
      titleGeneral: idiom?.title_general || null,
      definition: idiom?.definition || null,
      contributor: idiom?.contributor || null,
      timestamp: idiom?.timestamps ? new Date(idiom.timestamps) : new Date(),
      originText: idiom?.origin?.origin_text || '',
    },
  });

  const { handleSubmit, formState } = methods;
  const { isSubmitting } = formState;

  const onSubmit = async (values: IdiomFormValues) => {
    if (!idiom) return;

    // Format timestamp for the backend and remove milliseconds
    const formattedTimestamp = moment(values.timestamp).toISOString().split('.')[0] + 'Z';

    const payload: UpdateIdiomInput = {
      title: values.title,
      title_general: values.titleGeneral,
      definition: values.definition,
      contributor: values.contributor,
      timestamps: formattedTimestamp,
    };

    try {
      // 1) Update idiom core fields
      const updated = await updateIdiom(idiom.id, payload);
      if (!updated) {
        throw new Error('No idiom returned');
      }

      // 2) Update origin, if changed/filled
      const rawOrigin = values.originText ?? '';
      const trimmedOrigin = rawOrigin.trim();

      if (trimmedOrigin) {
        await upsertOrigin(idiom.id, {
          origin_text: trimmedOrigin,
          // if you’re storing model, you can keep existing or default:
          model: idiom.origin?.model ?? 'manual',
        });
      } else if (idiom.origin) {
        // field is empty but origin exists -> delete it
        await deleteOrigin(idiom.id);
      }

      onUpdateSuccess?.();
      showSuccess('Updated!', 'The idiom has been successfully updated.');
      onClose();
    } catch (error) {
      console.error('Update idiom with origin failed:', error);
      showError('Error', 'There was a problem updating the idiom.');
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

          {/* NEW ORIGIN FIELD */}
          <TextAreaField
            id='originText'
            label='Origin'
            rows={6}
            maxLength={4000}
            placeholder='Explain the origin of this idiom (optional)...'
          />

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
