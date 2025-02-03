import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

const Input = forwardRef(({
  type = 'text',
  label,
  error,
  helperText,
  fullWidth = false,
  required = false,
  disabled = false,
  className = '',
  ...props
}, ref) => {
  const baseInputStyles = 'block w-full px-4 py-2.5 text-gray-900 placeholder-gray-500 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200';
  
  const inputClasses = [
    baseInputStyles,
    error 
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
    disabled ? 'bg-gray-100 cursor-not-allowed' : '',
    fullWidth ? 'w-full' : 'w-auto',
    className
  ].join(' ');

  const labelClasses = [
    'block text-sm font-medium text-gray-700 mb-1',
    required ? 'after:content-["*"] after:ml-0.5 after:text-red-500' : '',
  ].join(' ');

  return (
    <div className={fullWidth ? 'w-full' : 'w-auto'}>
      {label && (
        <label className={labelClasses}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          className={inputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={helperText ? `${props.id}-description` : undefined}
          {...props}
        />
      </div>
      {helperText && (
        <p
          id={`${props.id}-description`}
          className={`mt-1 text-sm ${
            error ? 'text-red-600' : 'text-gray-500'
          }`}
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

Input.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  fullWidth: PropTypes.bool,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default Input;