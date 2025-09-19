import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>((
  { label, error, icon, className = '', ...props },
  ref
) => {
  const baseStyles = 'w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200';
  const errorStyles = error ? 'border-red-300 focus:ring-red-500' : '';
  const iconStyles = icon ? 'pl-12' : '';

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-gray-700 text-sm font-semibold">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`${baseStyles} ${errorStyles} ${iconStyles} ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="text-red-500 text-sm flex items-center">
          <span className="mr-1">⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';