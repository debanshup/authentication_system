"use client";

import React, { FC, ChangeEvent, FormEvent, FocusEvent } from 'react';

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
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  className?: string;
  feedbackText?: { message: string; isValid: boolean }; // New feedbackText prop
}

const InputForm: FC<InputFormProps> = ({
  changeHandler,
  inputValue,
  type,
  id,
  placeholder,
  label,
  required,
  disabled,
  onSubmit,
  onFocus,
  className,
  feedbackText
}) => {
  return (
    <form 
      className="form-floating"
      onSubmit={onSubmit}
      noValidate
    >
      <input
        id={id}
        className={`form-control ${className || ''}`}
        onChange={changeHandler}
        value={inputValue}
        type={type}
        placeholder={placeholder || `Enter ${label}`}
        required={required}
        disabled={disabled}
        aria-label={label}
        onFocus={onFocus}
      />
      <label htmlFor={id}>{label}</label>

      {/* Conditionally render feedback text */}
      {feedbackText && (
        <p className={`form-text text-center ${feedbackText.isValid ? 'text-success' : 'text-danger'}`}>
          {feedbackText.message}
        </p>
      )}
    </form>
  );
};

export default InputForm;
