import { useState, useEffect } from 'react';

export const useUsernameValidation = (username: string) => {
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        setIsValid(/^[a-z\d]{3,}$/.test(username));
    }, [username]);

    return isValid;
};
