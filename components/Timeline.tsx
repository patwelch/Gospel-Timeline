import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { TimelineEventData, Gospel } from '../types';
import TimelineEvent from './TimelineEvent';

interface TimelineProps {
  events: TimelineEventData[];
  selectedGospels: Gospel[];
  minDay: number;
  remsPerDay: number;
  horizontalPaddingRem: number;
  timelineWidthRem: number;
}

const Timeline = forwardRef<HTMLDivElement, TimelineProps>(({ events, selectedGospels, minDay, remsPerDay, horizontalPaddingRem, timelineWidthRem }, ref) => {
  const [centeredEventId, setCenteredEventId] = useState<number | null>(events[0]?.id ?? null);
  // Use a local ref for the intersection observer, but the passed-in ref for the element itself
  const localScrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!localScrollContainerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.id;
            if (id) {
              setCenteredEventId(Number(id));
            }
          }
        });
      },
      {
        root: localScrollContainerRef.current,
        rootMargin: '0px -40% 0px -40%',
        threshold: 0.5,
      }
    );

    const elements = localScrollContainerRef.current?.querySelectorAll('[data-id]');
    if (elements) {
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (elements && localScrollContainerRef.current) {
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, [events, selectedGospels]); // Rerun when filters change


  if (selectedGospels.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500 text-xl">Select a gospel to view the timeline.</p>
      </div>
    );
  }


  return (
    <div 
      ref={(node) => {
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
        localScrollContainerRef.current = node;
      }} 
      className="w-full h-full overflow-x-auto overflow-y-hidden p-10 cursor-grab active:cursor-grabbing">
      <div className="relative h-full" style={{ width: `${timelineWidthRem}rem` }}>
        {/* The horizontal timeline bar */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700 -translate-y-1/2"></div>
        
        {events.map((event, index) => {
           const positionRem = ((event.day - minDay) * remsPerDay) + horizontalPaddingRem;
          return (
            <TimelineEvent 
              key={event.id} 
              event={event} 
              index={index} 
              isCentered={centeredEventId === event.id} 
              selectedGospels={selectedGospels}
              style={{ left: `${positionRem}rem` }}
            />
          );
        })}
      </div>
    </div>
  );
});

export default Timeline;
