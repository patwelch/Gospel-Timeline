
import React from 'react';
import { Gospel } from '../types';
import { GOSPEL_COLORS } from '../constants';

interface GospelIndicatorProps {
  gospels: Gospel[];
}

const GospelIndicator: React.FC<GospelIndicatorProps> = ({ gospels }) => {
  return (
    <div className="flex items-center space-x-2">
      {gospels.map(gospel => (
        <div 
          key={gospel} 
          className={`w-3 h-3 rounded-full ${GOSPEL_COLORS[gospel].bg}`}
          title={gospel}
        ></div>
      ))}
    </div>
  );
};

export default GospelIndicator;
