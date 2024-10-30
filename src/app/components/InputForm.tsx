"use client";

import React, { FC, ChangeEvent, FormEvent } from 'react';

interface InputFormProps {
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  type: 'text' | 'email' | 'password' | 'number' | 'tel';
  id: string;
  placeholder?: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
}

const InputForm: FC<InputFormProps> = ({
  changeHandler,
  inputValue,
  type,
  id,
  placeholder, 
  label,
  required,
  disabled
}) => {
  return (
    <form 
      className="form-floating"
    //   onSubmit={onSubmit}
      noValidate // Avoid browser-native validation styling (optional)
    >
      <input
        id={id}
        className="form-control"
        onChange={changeHandler}
        value={inputValue}
        type={type}
        placeholder={placeholder || `Enter ${label}`} // Default placeholder
        required={required}
        disabled={disabled}
        aria-label={label} // For accessibility
      />
      <label htmlFor={id}>{label}</label>
    </form>
  );
};

export default InputForm;
