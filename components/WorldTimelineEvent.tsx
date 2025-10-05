import React from 'react';
import { WorldEventData } from '../types';

interface WorldTimelineEventProps {
  event: WorldEventData;
  index: number;
  style: React.CSSProperties;
}

const WorldTimelineEvent: React.FC<WorldTimelineEventProps> = ({ event, index, style }) => {
  const isUp = index % 2 !== 0;

  return (
    <div 
      className="absolute h-full w-64 flex items-center"
      style={{ ...style, transform: 'translateX(-50%)' }}
    >
      {/* Dot on timeline */}
      <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-gray-500 rounded-full border-2 border-gray-800 -translate-x-1/2 -translate-y-1/2 z-10"></div>
      
      {/* Content */}
      <div className={`absolute left-1/2 -translate-x-1/2 w-full px-2 py-1 ${isUp ? 'bottom-1/2 mb-4' : 'top-1/2 mt-4'}`}>
        <div className="relative text-center">
            {/* Connector */}
            <div className={`absolute left-1/2 -translate-x-1/2 w-px h-4 bg-gray-600 ${isUp ? 'top-full' : 'bottom-full'}`}></div>
            <p className="text-sm font-bold text-gray-300">{event.year}</p>
            <p className="text-xs text-gray-400">{event.title}</p>
        </div>
      </div>
    </div>
  );
};

export default WorldTimelineEvent;
