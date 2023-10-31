import React from 'react';

const Input = ({ id, placeholder, value, onChange, darkMode }) => {
  const inputStyle = {
    backgroundColor: darkMode ? '#333' : '#ffffff',
    color: darkMode ? '#ffffff' : '#000000',
    width: '400px',
    height: '40px',
    borderRadius: '8px',
    padding: '10px',
  };

  return (
    <div>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete='off'
        style={inputStyle}
      />
    </div>
  );
};

export default Input;
