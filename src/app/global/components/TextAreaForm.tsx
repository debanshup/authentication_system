"use client";

import React, { FC, ChangeEvent, FocusEvent } from 'react';

interface TextAreaFormProps {
  id: string;
  placeholder?: string;
  inputValue: string;
  changeHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  maxLength?: number;
  minHeight?: string;
  maxHeight?: string;
  label: string;
  disabled?: boolean;       // prop for disabling the textarea
  required?: boolean;       // prop to make textarea required
  className?: string;       // prop to extend class names
  onFocus?: (e: FocusEvent<HTMLTextAreaElement>) => void; // New prop for focus event
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
  disabled = false, // Default to not disabled
  required = false, // Default to not required
  className = '',   // Default to no additional classes
  onFocus           // Optional onFocus handler
}) => {
  return (
    <form className="form-floating">
      <textarea
        className={`form-control ${className}`} // Combine with additional class names
        id={id}
        placeholder={placeholder || `Enter ${label}`} // Default placeholder fallback
        value={inputValue}
        onChange={changeHandler}
        maxLength={maxLength}
        style={{ maxHeight, minHeight }}
        aria-label={label} // Accessibility improvement
        disabled={disabled} // Disabled prop
        required={required} // Required prop
        onFocus={onFocus}   // onFocus event
      />
      <label htmlFor={id}>{label}</label>
    </form>
  );
};

export default TextAreaForm;
