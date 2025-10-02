import Dropdown from '@/components/Dropdown/Dropdown/Dropdown';
import { useSearchParams } from 'react-router-dom';

const LETTERS = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));
const NUM_LABEL = '0–9'; // shown in UI
const NUM_VALUE = 'num'; // stored in URL ?letter=num

const AzLetterDropdown = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // read current query param
  const current = searchParams.get('letter'); // "A".."Z" | "num" | null

  // label to display on the dropdown button
  let label: string;
  if (current === NUM_VALUE) {
    label = NUM_LABEL;
  } else if (current && /^[A-Z]$/.test(current)) {
    label = current;
  } else {
    label = 'A – Z'; // default / no filter
  }

  // dropdown options (All at top)
  const options: string[] = ['All', NUM_LABEL, ...LETTERS];

  const handleOptionClick = (opt: string | JSX.Element) => {
    if (typeof opt !== 'string') return;

    const next = opt === 'All' ? null : opt === NUM_LABEL ? NUM_VALUE : opt;

    // reset page to 1 whenever filter changes
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('page', '1');
    if (next) {
      nextParams.set('letter', next);
    } else {
      nextParams.delete('letter');
    }
    setSearchParams(nextParams, { replace: false });
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
