import Dropdown from '@/components/Dropdown/Dropdown/Dropdown';

type AzLetterDropdownProps = {
  letter: string | null;
  handleLetterChange: (newLetter: string | null) => void;
};

const AzLetterDropdown = ({ letter, handleLetterChange }: AzLetterDropdownProps) => {
  const LETTERS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
  const NUM_LABEL = '0–9';

  const label = letter === null ? 'A – Z' : letter === 'num' ? NUM_LABEL : letter;

  const options: string[] = ['All', NUM_LABEL, ...LETTERS];

  const handleOptionClick = (opt: string | JSX.Element) => {
    if (typeof opt !== 'string') return;

    if (opt === 'All') {
      handleLetterChange(null);
    } else if (opt === NUM_LABEL) {
      handleLetterChange('num');
    } else {
      handleLetterChange(opt);
    }
  };

  return (
    <Dropdown
      label={label}
      options={options}
      onOptionClick={handleOptionClick}
      closeOnSelect={true}
      ariaLabel='Filter idioms by starting letter'
    />
  );
};

export default AzLetterDropdown;
