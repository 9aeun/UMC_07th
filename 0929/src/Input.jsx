import React from 'react';

function Input({ value, onChange, className, placeholder }) {
  return (
    <input
      className={className}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}

export default Input;
