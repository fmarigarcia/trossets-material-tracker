import React from 'react';
import { cn } from '@/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="label">
            {label}
            {props.required && <span className="text-error-500 ml-1">*</span>}
          </label>
        )}
        <input
          id={inputId}
          className={cn(
            'input',
            error && 'border-error-300 focus:border-error-500 focus:ring-error-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="error-text">{error}</p>}
        {helperText && !error && <p className="text-secondary-600 mt-1 text-sm">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
