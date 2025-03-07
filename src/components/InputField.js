// src/components/InputField.js
import React from 'react';

export default function InputField({ label, type = 'text', value, onChange, placeholder, name }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name} 
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400"
      />
    </div>
  );
}