// components/Forms/UpdateOriginForm/UpdateOriginForm.tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { DangerButton, PrimaryButton } from '@/components/ButtonStyles';
import TextAreaField from '@/components/FormFields/TextAreaField';
import { FormContainer, HalfButton, HalfButtonsWrapper } from '@/components/Forms/Form.styles';
import { IdiomsContext } from '@/context/idiomsContext';
import { Origin, UpsertOriginInput } from '@/types';
import { showError, showSuccess } from '@/utils/alerts';
import { OriginFormValues, originSchema } from '@/validation/idiomSchema';

type UpdateOriginFormProps = {
  idiomId: number;
  origin: Origin | null;
  onClose: () => void;
  onUpdateSuccess?: () => void;
};

const UpdateOriginForm = ({ idiomId, origin, onClose, onUpdateSuccess }: UpdateOriginFormProps) => {
  const { upsertOrigin, deleteOrigin } = useContext(IdiomsContext);

  const methods = useForm<OriginFormValues>({
    resolver: zodResolver(originSchema),
    mode: 'onBlur',
    defaultValues: {
      originText: origin?.origin_text ?? '',
    },
  });

  const { handleSubmit, formState } = methods;
  const { isSubmitting } = formState;

  const onSubmit = async (values: OriginFormValues) => {
    const payload: UpsertOriginInput = {
      origin_text: values.originText,
      model: origin?.model || 'manual',
    };

    try {
      await upsertOrigin(idiomId, payload);
      onUpdateSuccess?.();
      showSuccess('Updated!', 'The origin has been successfully updated.');
      onClose();
    } catch (error) {
      console.error(error);
      showError('Error', 'There was a problem updating the origin.');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteOrigin(idiomId);
      onUpdateSuccess?.();
      showSuccess('Deleted', 'The origin has been deleted.');
      onClose();
    } catch (error) {
      console.error(error);
      showError('Error', 'There was a problem deleting the origin.');
    }
  };

  return (
    <FormContainer>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextAreaField id='originText' label='Origin' rows={6} maxLength={4000} />

          <HalfButtonsWrapper>
            <HalfButton as={PrimaryButton} type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save'}
            </HalfButton>
            <HalfButton as={DangerButton} type='button' onClick={handleDelete}>
              Delete
            </HalfButton>
          </HalfButtonsWrapper>
        </form>
      </FormProvider>
    </FormContainer>
  );
};

export default UpdateOriginForm;
