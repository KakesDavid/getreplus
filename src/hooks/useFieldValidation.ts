'use client';
import { useState } from 'react';

export function useFieldValidation(validator: (val: string) => boolean | any) {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (val: string) => {
    setValue(val);
    if (touched) validate(val);
  };

  const validate = (val: string) => {
    const isValid = validator(val);
    if (!isValid) {
      setError('Invalid field');
      return false;
    }
    setError(null);
    return true;
  };

  return { value, touched, error, setTouched, handleChange, validate };
}
