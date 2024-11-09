import { useState, useEffect } from 'react';

export const useFullnameValidation = (fullname: string) => {
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        setIsValid(/^[a-zA-Z\s]{1,}$/.test(fullname));
    }, [fullname]);

    return isValid;
};
