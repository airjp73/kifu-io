import { useState } from 'react';

function useFormState() {
  const [state, setState] = useState(null);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setState(event.target.value);
  return [state, onChange];
}

export default useFormState;
