import React from 'react';
import { TimelineEventData, Gospel } from '../types';
import GospelIndicator from './GospelIndicator';

interface TimelineEventProps {
  event: TimelineEventData;
  index: number;
  isCentered: boolean;
  selectedGospels: Gospel[];
  style: React.CSSProperties;
}

const LinkIcon: React.FC<{className: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
    </svg>
);


const TimelineEvent: React.FC<TimelineEventProps> = ({ event, index, isCentered, selectedGospels, style }) => {
  const isVisible = event.gospels.some(gospel => selectedGospels.includes(gospel));
  const isUp = index % 2 !== 0;

  return (
    <div 
      className="absolute h-full w-80" 
      style={{ ...style, transform: 'translateX(-50%)' }}
      data-id={event.id}
    >
      <div className={`relative h-full flex items-center`}>
        {/* Wrapper for visible elements to control opacity */}
        <div className={`w-full transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${isUp ? 'absolute bottom-1/2 mb-8' : 'absolute top-1/2 mt-8'}`}>
          <div className={`bg-gray-800 rounded-lg shadow-xl border-2 transition-colors duration-300 ${isCentered ? 'border-cyan-400' : 'border-gray-700'} transform hover:scale-105 hover:-translate-y-1 ease-in-out cursor-pointer overflow-hidden`}>
            {event.imageUrl && (
              <div className="h-40 overflow-hidden">
                <img 
                  src={event.imageUrl} 
                  alt={event.title}
                  className={`w-full h-full object-cover transition-opacity duration-500 ease-in-out ${isCentered ? 'opacity-100' : 'opacity-20'}`}
                />
              </div>
            )}
            <div className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-cyan-400">{event.title}</h3>
                <GospelIndicator gospels={event.gospels} />
              </div>
              <p className="text-gray-300 text-sm mb-4 h-20 overflow-auto">
                {event.description}
              </p>
              <a 
                href={event.reference.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center text-sm text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                {event.reference.text}
              </a>
            </div>
          </div>
          
          {/* Connector from card to timeline bar */}
          <div className={`absolute left-1/2 -translate-x-1/2 w-1 bg-gray-700 h-8 ${isUp ? 'bottom-[-2rem]' : 'top-[-2rem]'}`}></div>
        </div>
      </div>
      
      {/* Dot on the timeline bar */}
      <div className={`absolute top-1/2 left-1/2 w-4 h-4 rounded-full border-4 border-gray-900 -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 ${isVisible ? 'opacity-100 bg-cyan-400' : 'opacity-0 bg-gray-700'} ${isCentered ? 'scale-125' : ''}`}></div>
    </div>
  );
};

export default TimelineEvent;
