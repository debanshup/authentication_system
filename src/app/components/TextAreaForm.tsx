"use client";

import React, { FC, ChangeEvent } from 'react';

interface TextAreaFormProps {
  id: string;
  placeholder?: string;
  inputValue: string;
  changeHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  minHeight?: string;
  maxHeight?: string;
  label: string;
}

const TextAreaForm: FC<TextAreaFormProps> = ({
  id,
  placeholder = '', // Optional placeholder
  inputValue,
  changeHandler,
  maxLength = 500, // Default max length
  minHeight = '150px',
  maxHeight = '500px',
  label,
}) => {
  return (
    <form className="form-floating">
      <textarea
        className="form-control"
        id={id}
        placeholder={placeholder || `Enter ${label}`} // Default placeholder fallback
        value={inputValue}
        onChange={changeHandler}
        maxLength={maxLength}
        style={{ maxHeight, minHeight }}
        aria-label={label} // Accessibility improvement
      />
      <label htmlFor={id}>{label}</label>
    </form>
  );
};

export default TextAreaForm;
