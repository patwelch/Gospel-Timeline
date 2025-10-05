import React, { useState, useEffect, useRef } from 'react';
import { TimelineEventData, Gospel } from '../types';
import TimelineEvent from './TimelineEvent';

interface TimelineProps {
  events: TimelineEventData[];
  selectedGospels: Gospel[];
}

const Timeline: React.FC<TimelineProps> = ({ events, selectedGospels }) => {
  const [centeredEventId, setCenteredEventId] = useState<number | null>(events[0]?.id ?? null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollContainerRef.current) return;
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
        root: scrollContainerRef.current,
        rootMargin: '0px -40% 0px -40%',
        threshold: 0.5,
      }
    );

    const elements = scrollContainerRef.current?.querySelectorAll('[data-id]');
    if (elements) {
      elements.forEach((el) => observer.observe(el));
    }

    return () => {
      if (elements) {
        elements.forEach((el) => observer.unobserve(el));
      }
    };
  }, [events, selectedGospels]); // Rerun when filters change

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      scrollContainer.scrollBy({
        left: e.deltaY * 2, // Increase scroll speed
        behavior: 'smooth'
      });
    };

    scrollContainer.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      scrollContainer.removeEventListener('wheel', handleWheel);
    };
  }, []);


  if (selectedGospels.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500 text-xl">Select a gospel to view the timeline.</p>
      </div>
    );
  }

  // This scale determines the spacing. 1 day = X rems.
  // This value is chosen to make closely-packed events readable.
  const REMS_PER_DAY = 3; 
  const HORIZONTAL_PADDING_REM = 50; // Padding at start/end of timeline

  const eventsWithDay = events.filter(e => e.day !== undefined);
  if (eventsWithDay.length === 0) {
    return <div className="flex items-center justify-center h-full"><p className="text-gray-500">No events to display.</p></div>;
  }

  const minDay = Math.min(...eventsWithDay.map(e => e.day));
  const maxDay = Math.max(...eventsWithDay.map(e => e.day));
  const totalDays = maxDay - minDay;
  const timelineWidthRem = (totalDays * REMS_PER_DAY) + (HORIZONTAL_PADDING_REM * 2);


  return (
    <div ref={scrollContainerRef} className="w-full h-full overflow-x-auto overflow-y-hidden p-10 cursor-grab active:cursor-grabbing">
      <div className="relative h-full" style={{ width: `${timelineWidthRem}rem` }}>
        {/* The horizontal timeline bar */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-700 -translate-y-1/2"></div>
        
        {events.map((event, index) => {
           const positionRem = ((event.day - minDay) * REMS_PER_DAY) + HORIZONTAL_PADDING_REM;
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
};

export default Timeline;
