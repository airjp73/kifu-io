import { useContext } from 'react';
import { WindowContext } from 'WindowContext';

const useWindowDimensions = () => useContext(WindowContext);

export default useWindowDimensions;
