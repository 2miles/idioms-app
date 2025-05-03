import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { Example } from '@/types';
import { IdiomsContext } from '@/context/idiomsContext';
import TextAreaField from '@/components/formFields/TextAreaField';
import useAuthorizedIdiomFinder from '@/apis/useAuthorizedIdiomFinder';
import { SecondaryButton } from '@/components/ButtonStyles';

const FormContainer = styled.div`
  background-color: var(--color-ui-primary);
  border-radius: var(--radius-sm);
  font-size: var(--font-md);
  padding-right: var(--padding-lg);
  padding-left: var(--padding-lg);
  padding-bottom: var(--padding-sm);

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

const ButtonWrapper = styled.button`
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
  onClose: () => void;
};

const UpdateExamples = ({ idiomId, onClose }: UpdateExamplesProps) => {
  const { idioms, updateExamples } = useContext(IdiomsContext);
  const getAuthorizedIdiomFinder = useAuthorizedIdiomFinder();
  const initialExamples = idioms.find((idiom) => idiom.id === idiomId)?.examples || [];
  const [examples, setExamples] = useState<Example[]>(initialExamples);

  const idiomTitle = idioms.find((idiom) => idiom.id === idiomId)?.title;

  const handleExampleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const { value } = e.target;
    const updatedExamples = examples.map((example, i) =>
      i === index ? { ...example, example: value } : example,
    );
    setExamples(updatedExamples);
  };

  const handleDeleteExample = async (index: number, exampleId: number) => {
    const confirmResult = await Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this example!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#DC3545',
      cancelButtonText: 'No, keep it',
    });

    if (confirmResult.isConfirmed) {
      try {
        const api = await getAuthorizedIdiomFinder();
        await api.delete(`/examples/${exampleId}`);
        // Update local state to remove the example
        const updatedExamples = examples.filter((_, i) => i !== index);
        setExamples(updatedExamples);
        updateExamples(idiomId, updatedExamples);

        Swal.fire({
          title: 'Deleted!',
          text: 'The example has been successfully deleted.',
          icon: 'success',
          timer: 1800,
          showConfirmButton: false,
        });
      } catch (err) {
        console.error('Error deleting example:', err);
        Swal.fire({
          title: 'Error',
          text: 'There was a problem deleting the example.',
          icon: 'error',
        });
      }
    }
  };

  const validateExamples = () => {
    return examples.every((example) => example.example && example.example.trim() !== '');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted!');
    if (!validateExamples()) {
      Swal.fire({
        title: 'Error',
        text: 'All examples must have text.',
        icon: 'warning',
      });
      return;
    }

    try {
      // Send the updated examples to your API
      console.log('Submitting examples:', examples);
      const api = await getAuthorizedIdiomFinder();
      const response = await api.put(`/${idiomId}/examples`, {
        examples,
      });

      if (response.data && response.data.status === 'success') {
        console.log(response.data);
        const updatedExamples = response.data.examples || examples;
        updateExamples(idiomId, updatedExamples);

        Swal.fire({
          title: 'Updated!',
          text: 'Examples have been successfully updated.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
        onClose();
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
                <SecondaryButton
                  type='button'
                  className='btn btn-danger'
                  onClick={() => handleDeleteExample(index, example.example_id)}
                >
                  Delete
                </SecondaryButton>
              </DeleteButtonArea>
            </div>
          </InputArea>
        ))}
        <ButtonWrapper type='submit' className='btn btn-success'>
          Save
        </ButtonWrapper>
      </form>
    </FormContainer>
  );
};

export default UpdateExamples;
