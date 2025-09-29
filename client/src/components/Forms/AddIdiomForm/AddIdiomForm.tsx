import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import { useContext, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { WideSuccessButton } from '@/components/ButtonStyles';
import TextAreaField from '@/components/FormFields/TextAreaField';
import TextField from '@/components/FormFields/TextField';
import TimestampField from '@/components/FormFields/TimestampField';
import { IdiomsContext } from '@/context/idiomsContext';
import { NewIdiomInput } from '@/types';
import { showError, showSuccess } from '@/utils/alerts';
import { IdiomFormValues, idiomSchema } from '@/validation/idiomSchema';

import { FormContainer, FormControlsWrapper, SubmitButtonWrapper } from '../Form.styles';

type AddIdiomProps = {
  onClose: () => void;
  onSucess?: () => void;
};

const AddIdiomForm = ({ onClose, onSucess }: AddIdiomProps) => {
  const { addIdiom } = useContext(IdiomsContext);
  const [keepOpen, setKeepOpen] = useState(false);

  const methods = useForm<IdiomFormValues>({
    resolver: zodResolver(idiomSchema),
    mode: 'onBlur',
    defaultValues: {
      title: '',
      titleGeneral: null,
      definition: null,
      contributor: null,
      timestamp: new Date(),
    },
  });

  const { handleSubmit, reset, formState } = methods;
  const { isSubmitting } = formState;

  const onSubmit = async (values: IdiomFormValues) => {
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
      reset();
      onSucess?.();
      showSuccess('Idiom Added', 'The idiom has been successfully added.');

      if (!keepOpen) {
        setTimeout(() => {
          onClose();
        }, 200);
      }
    } else {
      showError('Error', 'There was a problem adding the idiom.');
    }
  };

  return (
    <FormContainer>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            id='title'
            label='Title'
            placeholder='Pull yourself up by your bootstraps'
            maxLength={100}
          />
          <TextField
            id='titleGeneral'
            label='Title General'
            placeholder="Pull (oneself) up by (one's) (own) bootstraps"
            maxLength={100}
          />
          <TextAreaField
            id='definition'
            label='Definition'
            placeholder="To improve one's life or circumstances through one's own efforts, rather than relying on others."
            rows={3}
            maxLength={500}
          />
          <TimestampField id='timestamp' label='Timestamp' />
          <TextField id='contributor' label='Contributor' placeholder='Miles' maxLength={50} />

          <FormControlsWrapper>
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
            <SubmitButtonWrapper>
              <WideSuccessButton
                type='submit'
                className='btn btn-success'
                data-testid='submit-add-idiom-button'
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Adding...' : 'Add'}
              </WideSuccessButton>
            </SubmitButtonWrapper>
          </FormControlsWrapper>
        </form>
      </FormProvider>
    </FormContainer>
  );
};

export default AddIdiomForm;
