import React, { forwardRef } from 'react';
import { WorldEventData } from '../types';
import WorldTimelineEvent from './WorldTimelineEvent';

interface WorldTimelineProps {
  events: WorldEventData[];
  minDay: number;
  remsPerDay: number;
  horizontalPaddingRem: number;
  timelineWidthRem: number;
}

const WorldTimeline = forwardRef<HTMLDivElement, WorldTimelineProps>(({ events, minDay, remsPerDay, horizontalPaddingRem, timelineWidthRem }, ref) => {
  const eventsWithDay = events.filter(e => e.day !== undefined);
  if (eventsWithDay.length === 0) {
    return null;
  }

  return (
    <div ref={ref} className="w-full h-full p-4 overflow-x-auto overflow-y-hidden">
      <div className="relative h-full" style={{ width: `${timelineWidthRem}rem` }}>
        {/* The horizontal timeline bar */}
        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-600 -translate-y-1/2"></div>
        
        {events.map((event, index) => {
          const positionRem = ((event.day - minDay) * remsPerDay) + horizontalPaddingRem;
          return (
              <WorldTimelineEvent 
                  key={event.id} 
                  event={event} 
                  index={index} 
                  style={{ left: `${positionRem}rem` }}
              />
          );
        })}
      </div>
    </div>
  );
});

export default WorldTimeline;
