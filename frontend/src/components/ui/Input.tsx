import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium text-cyber-text-muted">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            bg-cyber-bg border border-cyber-border rounded-md px-4 py-2 
            text-cyber-text-main font-mono placeholder:text-cyber-border
            focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary
            transition-colors
            ${error ? 'border-cyber-danger focus:border-cyber-danger focus:ring-cyber-danger' : ''}
            ${className}
          `}
          {...props}
        />
        {error && <span className="text-xs text-cyber-danger mt-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
