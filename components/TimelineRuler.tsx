import React from 'react';
import { Gospel } from '../types';

type RulerEvent = { id: number; day: number; gospels?: Gospel[]; type: 'gospel' | 'world' };

interface TimelineRulerProps {
  selectedGospels: Gospel[];
  events: RulerEvent[];
  minDay: number;
  remsPerDay: number;
  horizontalPaddingRem: number;
  timelineWidthRem: number;
  style?: React.CSSProperties;
  onRulerClick: (day: number) => void;
}

const TimelineRuler: React.FC<TimelineRulerProps> = ({
  events,
  selectedGospels,
  minDay,
  remsPerDay,
  horizontalPaddingRem,
  timelineWidthRem,
  style,
  onRulerClick,
}) => {
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    // Convert click position from pixels to rems
    const remToPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const clickedRem = clickX / remToPx;

    // Convert click position (as a percentage of the ruler width) to a 'day'
    const totalTimelineRem = timelineWidthRem;
    const clickPercentage = clickX / rect.width;
    const clickedRemOnTimeline = clickPercentage * totalTimelineRem;
    const day = ((clickedRemOnTimeline - horizontalPaddingRem) / remsPerDay) + minDay;

    onRulerClick(day);
  };

  return (
    <div className="relative w-full h-full cursor-pointer" style={style} onClick={handleClick}>
      {/* Ruler track */}
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-700 -translate-y-1/2"></div>

      {/* Event dots */}
      {events.map((event) => {
        if (event.day === undefined) return null;

        let dotClass = 'bg-gray-600'; // Default/inactive
        if (event.type === 'world') {
          dotClass = 'bg-gray-500'; // World events are always the same color
        } else if (event.gospels && event.gospels.some(gospel => selectedGospels.includes(gospel))) {
          dotClass = 'bg-cyan-400'; // Active gospel event
        }

        const eventPositionRem = ((event.day - minDay) * remsPerDay) + horizontalPaddingRem;
        const positionPercentage = (eventPositionRem / timelineWidthRem) * 100;

        return (
          <div
            key={`ruler-dot-${event.id}`}
            className={`absolute top-1/2 w-2 h-2 rounded-full -translate-x-1/2 -translate-y-1/2 transition-colors duration-300 pointer-events-none ${dotClass}`}
            style={{ left: `${positionPercentage}%` }}
          ></div>
        );
      })}
    </div>
  );
};

export default TimelineRuler;