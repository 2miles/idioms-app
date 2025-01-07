//   const handleDeleteExample = (index: number) => {
//     setExampleData((prevData) => prevData.filter((_, i) => i !== index));
//   };

import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

import { Example } from '@/types';
import { IdiomsContext } from '@/context/idiomsContext';
import TextAreaField from '@/components/formFields/TextAreaField';
import IdiomFinder from '@/apis/idiomFinder';

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

  & button {
    margin-top: var(--margin-xxl) !important;
  }
  label {
    font-weight: 600 !important;
    padding-bottom: var(--padding-xs);
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;

  button {
    margin: var(--margin-lg);
  }
`;

type UpdateExamplesProps = {
  idiomId: number;
  examples: Example[];
  onClose: () => void;
};

const UpdateExamples = ({ idiomId, examples, onClose }: UpdateExamplesProps) => {
  const [exampleData, setExampleData] = useState<Example[]>(examples);
  const { updateExamples } = useContext(IdiomsContext);

  const handleExampleChange = (e: React.ChangeEvent<HTMLTextAreaElement>, index: number) => {
    const { value } = e.target;
    setExampleData((prevData) =>
      prevData.map((example, i) => (i === index ? { ...example, example: value } : example)),
    );
  };

  const validateExamples = () => {
    return exampleData.every((example) => example.example && example.example.trim() !== '');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      const response = await IdiomFinder.put(`/${idiomId}/examples`, {
        examples: exampleData,
      });

      if (response.data && response.data.status === 'success') {
        updateExamples(idiomId, response.data);
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
      <form onSubmit={handleSubmit}>
        {exampleData.map((example, index) => (
          <div key={index}>
            <TextAreaField
              label={`Example ${index + 1}`}
              id={`example-${index}`}
              value={example.example || ''}
              onChange={(e) => handleExampleChange(e, index)}
              aria-label={`Edit example ${index + 1}`}
            />
          </div>
        ))}
        <ButtonsWrapper>
          <button type='submit' className='btn btn-primary'>
            Save
          </button>
        </ButtonsWrapper>
      </form>
    </FormContainer>
  );
};

export default UpdateExamples;
