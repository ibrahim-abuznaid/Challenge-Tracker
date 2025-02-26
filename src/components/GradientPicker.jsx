import React from 'react';

const GradientPicker = ({ onSelect, selectedGradient }) => {
  const gradients = [
    { id: 1, name: 'Indigo Purple', class: 'gradient-1' },
    { id: 2, name: 'Blue Sky', class: 'gradient-2' },
    { id: 3, name: 'Emerald', class: 'gradient-3' },
    { id: 4, name: 'Ruby', class: 'gradient-4' },
    { id: 5, name: 'Amber', class: 'gradient-5' },
    { id: 6, name: 'Royal Blue', class: 'gradient-6' },
    { id: 7, name: 'Purple Dream', class: 'gradient-7' },
    { id: 8, name: 'Pink Rose', class: 'gradient-8' },
    { id: 9, name: 'Cyan Ocean', class: 'gradient-9' },
    { id: 10, name: 'Deep Purple', class: 'gradient-10' }
  ];

  return (
    <div className="gradient-options">
      {gradients.map((gradient) => (
        <div
          key={gradient.id}
          className={`gradient-option ${gradient.class} ${
            selectedGradient === gradient.id ? 'selected' : ''
          }`}
          onClick={() => onSelect(gradient.id)}
          title={gradient.name}
        />
      ))}
    </div>
  );
};

export default GradientPicker; 