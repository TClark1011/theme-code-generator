import { ChangeEvent } from 'react';

const getInputOnChangeValue = (event: ChangeEvent<HTMLInputElement>): string => event.target.value;

export default getInputOnChangeValue;
