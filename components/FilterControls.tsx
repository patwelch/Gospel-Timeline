
import React from 'react';
import { Gospel } from '../types';
import { GOSPEL_NAMES, GOSPEL_COLORS } from '../constants';

interface FilterControlsProps {
  selectedGospels: Gospel[];
  setSelectedGospels: React.Dispatch<React.SetStateAction<Gospel[]>>;
}

const FilterControls: React.FC<FilterControlsProps> = ({ selectedGospels, setSelectedGospels }) => {
  const handleCheckboxChange = (gospel: Gospel) => {
    setSelectedGospels(prev =>
      prev.includes(gospel)
        ? prev.filter(g => g !== gospel)
        : [...prev, gospel]
    );
  };

  return (
    <div className="p-4 bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 z-20 shadow-md">
      <div className="flex justify-center items-center space-x-6">
        <span className="text-gray-300 font-semibold mr-4">Display Narratives from:</span>
        {GOSPEL_NAMES.map(gospel => {
          const isSelected = selectedGospels.includes(gospel);
          const color = GOSPEL_COLORS[gospel];
          return (
            <label key={gospel} className="flex items-center cursor-pointer select-none">
              <div className={`w-6 h-6 rounded-md flex items-center justify-center mr-2 transition-all duration-200 ${isSelected ? `${color.bg} border-2 ${color.border}` : 'bg-gray-700 border-2 border-gray-600'}`}>
                {isSelected && (
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                className="hidden"
                checked={isSelected}
                onChange={() => handleCheckboxChange(gospel)}
              />
              <span className={`font-medium ${isSelected ? 'text-white' : 'text-gray-400'}`}>{gospel}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default FilterControls;
