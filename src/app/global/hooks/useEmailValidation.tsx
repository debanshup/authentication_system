import { useState, useEffect } from 'react';

export const useEmailValidation = (email: string) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
  }, [email]);

  return isValid;
};
