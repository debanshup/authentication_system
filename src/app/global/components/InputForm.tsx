"use client";

import React, { FC, ChangeEvent, FormEvent, FocusEvent } from "react";

interface InputFormProps {
  changeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "search"
    | "date"
    | "datetime-local"
    | "month"
    | "week"
    | "time"
    | "color"
    | "checkbox"
    | "radio"
    | "file"
    | "hidden"
    | "image"
    | "range"
    | "reset"
    | "button"
    | "submit";
  id: string;
  placeholder?: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  onSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  className?: string;
  feedbackText?: { message: string; isValid: boolean };
  style?: React.CSSProperties;
}

const InputForm: FC<InputFormProps> = ({
  style = {},
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
  feedbackText,
}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page reload
    if (onSubmit) onSubmit(e); // Execute provided submit handler (if any)
  };

  return (
    <form
      className="form-floating"
      onSubmit={onSubmit || handleSubmit}
      noValidate
    >
      <input
        id={id}
        className={`form-control ${className || ""}`}
        onChange={changeHandler}
        value={inputValue}
        type={type}
        placeholder={placeholder || `Enter ${label}`}
        required={required}
        disabled={disabled}
        aria-label={label}
        onFocus={onFocus}
        style={style}
        aria-describedby={`${id}-feedback`}
      />
      <label htmlFor={id}>{label}</label>

      {/* Accessible feedback text */}
      {feedbackText && (
        <p
          id={`${id}-feedback`}
          className={`form-text text-center ${
            feedbackText.isValid ? "text-success" : "text-danger"
          }`}
          role="alert"
          aria-live="polite"
        >
          {feedbackText.message}
        </p>
      )}
    </form>
  );
};

export default InputForm;
