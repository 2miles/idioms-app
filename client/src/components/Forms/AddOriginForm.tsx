// components/Forms/AddOriginForm/AddOriginForm.tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { useContext } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { WideSuccessButton } from '@/components/ButtonStyles';
import TextAreaField from '@/components/FormFields/TextAreaField';
import {
  FormContainer,
  FormControlsWrapper,
  SubmitButtonWrapper,
} from '@/components/Forms/Form.styles';
import { IdiomsContext } from '@/context/idiomsContext';
import { UpsertOriginInput } from '@/types';
import { showError, showSuccess } from '@/utils/alerts';
import { OriginFormValues, originSchema } from '@/validation/idiomSchema';

type AddOriginFormProps = {
  idiomId: number;
  onClose: () => void;
  onSuccess?: () => void;
};

const AddOriginForm = ({ idiomId, onClose, onSuccess }: AddOriginFormProps) => {
  const { upsertOrigin } = useContext(IdiomsContext);

  const methods = useForm<OriginFormValues>({
    resolver: zodResolver(originSchema),
    mode: 'onBlur',
    defaultValues: {
      originText: '',
    },
  });

  const { handleSubmit, formState, reset } = methods;
  const { isSubmitting } = formState;

  const onSubmit = async (values: OriginFormValues) => {
    const payload: UpsertOriginInput = {
      origin_text: values.originText,
      model: 'manual',
    };

    try {
      await upsertOrigin(idiomId, payload);
      reset();
      onSuccess?.();
      showSuccess('Origin Added', 'The origin has been successfully added.');
      onClose();
    } catch (error) {
      console.error(error);
      showError('Error', 'There was a problem adding the origin.');
    }
  };

  return (
    <FormContainer>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextAreaField
            id='originText'
            label='Origin'
            placeholder='Add a description of the idiom origin here...'
            rows={6}
            maxLength={4000}
          />

          <FormControlsWrapper>
            <SubmitButtonWrapper>
              <WideSuccessButton type='submit' className='btn btn-success' disabled={isSubmitting}>
                {isSubmitting ? 'Adding...' : 'Add Origin'}
              </WideSuccessButton>
            </SubmitButtonWrapper>
          </FormControlsWrapper>
        </form>
      </FormProvider>
    </FormContainer>
  );
};

export default AddOriginForm;
