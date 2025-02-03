import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ variant = 'spinner', size = 'md', fullScreen = false, text = 'Loading...' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const Spinner = () => (
    <svg
      className={`animate-spin ${sizes[size]}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );

  const Dots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${sizes[size]} bg-current rounded-full animate-bounce`}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );

  const Pulse = () => (
    <div className={`${sizes[size]} relative`}>
      <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping" />
      <div className="absolute inset-0 bg-blue-500 rounded-full animate-pulse" />
    </div>
  );

  const variants = {
    spinner: <Spinner />,
    dots: <Dots />,
    pulse: <Pulse />,
  };

  const LoadingContent = () => (
    <div className="flex flex-col items-center justify-center space-y-2">
      {variants[variant]}
      {text && <p className={`${textSizes[size]} text-gray-600`}>{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
        <LoadingContent />
      </div>
    );
  }

  return <LoadingContent />;
};

Loading.propTypes = {
  variant: PropTypes.oneOf(['spinner', 'dots', 'pulse']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fullScreen: PropTypes.bool,
  text: PropTypes.string,
};

export default Loading;