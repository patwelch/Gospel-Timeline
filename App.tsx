import React, { useState, useRef, useEffect } from 'react';
import { Gospel } from './types';
import { timelineData } from './data/timelineData';
import { worldEventsData } from './data/worldEventsData';
import { GOSPEL_NAMES } from './constants';
import FilterControls from './components/FilterControls';
import Timeline from './components/Timeline';
import WorldTimeline from './components/WorldTimeline';
import TimelineRuler from './components/TimelineRuler';
import AboutModal from './components/AboutModal';

const App: React.FC = () => {
  const [selectedGospels, setSelectedGospels] = useState<Gospel[]>(GOSPEL_NAMES);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const mainTimelineRef = useRef<HTMLDivElement>(null);
  const worldTimelineRef = useRef<HTMLDivElement>(null);
  const rulerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const isSyncing = useRef(false); // To prevent scroll event loops

  // Centralize timeline dimension calculations
  const REMS_PER_DAY = 3;
  const HORIZONTAL_PADDING_REM = 50;
  const allEvents = [...timelineData, ...worldEventsData];
  const allDays = allEvents.filter(e => e.day !== undefined).map(e => e.day);
  const minDay = Math.min(...allDays);
  const maxDay = Math.max(...allDays);
  const totalDays = maxDay - minDay;
  const timelineWidthRem = (totalDays * REMS_PER_DAY) + (HORIZONTAL_PADDING_REM * 2);

  const timelineProps = { minDay, remsPerDay: REMS_PER_DAY, horizontalPaddingRem: HORIZONTAL_PADDING_REM, timelineWidthRem };

  // Create a unified list of events for the ruler
  const rulerEvents = [
    ...timelineData.map(e => ({ ...e, type: 'gospel' as const })),
    ...worldEventsData.map(e => ({ ...e, type: 'world' as const }))
  ];


  useEffect(() => {
    const mainEl = mainTimelineRef.current;
    const worldEl = worldTimelineRef.current;
    const viewportEl = viewportRef.current;

    if (!mainEl || !worldEl || !viewportEl) return;

    // Update viewport indicator on scroll
    const updateViewport = () => {
      const scrollableWidth = mainEl.scrollWidth - mainEl.clientWidth;
      const viewportWidthPercentage = (mainEl.clientWidth / mainEl.scrollWidth) * 100;
      const scrollPercentage = (mainEl.scrollLeft / scrollableWidth) * (100 - viewportWidthPercentage);

      viewportEl.style.width = `${viewportWidthPercentage}%`;
      viewportEl.style.left = `${scrollPercentage}%`;
    };

    const syncScroll = (source: 'main' | 'world') => {
      if (isSyncing.current) return;
      isSyncing.current = true;

      if (source === 'main') {
        worldEl.scrollLeft = mainEl.scrollLeft;
      } else {
        mainEl.scrollLeft = worldEl.scrollLeft;
      }

      // Reset the flag after the scroll event has had time to propagate
      requestAnimationFrame(() => {
        isSyncing.current = false;
      });
    };
    
    const handleMainScroll = () => {
        syncScroll('main');
        updateViewport();
    };
    const handleWorldScroll = () => syncScroll('world');

    mainEl.addEventListener('scroll', handleMainScroll);
    worldEl.addEventListener('scroll', handleWorldScroll);

    updateViewport(); // Initial position

    return () => {
      mainEl.removeEventListener('scroll', handleMainScroll);
      worldEl.removeEventListener('scroll', handleWorldScroll);
    };
  }, []); // Run only once on mount

  // Re-introduce horizontal scrolling via mouse wheel
  useEffect(() => {
    const mainEl = mainTimelineRef.current;
    if (!mainEl) return;

    const handleWheel = (e: WheelEvent) => {
      // We only want to hijack vertical scroll wheel events for horizontal scrolling
      if (e.deltaY === 0) return;

      e.preventDefault();
      mainEl.scrollBy({
        left: e.deltaY, // Using deltaY directly provides a natural scroll speed
      });
    };

    mainEl.addEventListener('wheel', handleWheel, { passive: false });

    return () => mainEl.removeEventListener('wheel', handleWheel);
  }, []);

  const handleRulerClick = (clickedDay: number) => {
    const mainEl = mainTimelineRef.current;
    if (!mainEl) return;

    // Find the event in the main timeline data closest to the clicked day
    const closestEvent = allEvents
      .filter(e => e.day !== undefined && e.day !== null)
      .reduce((prev, curr) => 
        Math.abs(curr.day - clickedDay) < Math.abs(prev.day - clickedDay) ? curr : prev
      );

    // Calculate the scroll position to center this event
    const remToPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const eventPositionRem = ((closestEvent.day - minDay) * timelineProps.remsPerDay) + timelineProps.horizontalPaddingRem;
    const eventPositionPx = eventPositionRem * remToPx;
    const containerWidthPx = mainEl.clientWidth;
    const targetScrollLeft = eventPositionPx - (containerWidthPx / 2);

    mainEl.scrollTo({ left: targetScrollLeft, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans flex flex-col">
      <header className="sticky top-0 z-30">
        <div className="p-4 bg-gray-900/70 backdrop-blur-lg relative">
          <h1 className="text-4xl font-bold text-center text-cyan-400 tracking-wider">
            Gospel Harmony Timeline
          </h1>
          <p className="text-center text-gray-400 mt-1">
            An interactive visualization of the life of Christ across the four Gospels.
          </p>
          <button
            onClick={() => setIsAboutModalOpen(true)}
            className="absolute top-4 right-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-1 px-3 rounded-full text-sm"
          >
            About
          </button>
        </div>
        <FilterControls selectedGospels={selectedGospels} setSelectedGospels={setSelectedGospels} />
      </header>

      <main className="flex-grow flex flex-col overflow-hidden">
        <div className="flex-grow relative h-64">
          <Timeline ref={mainTimelineRef} events={timelineData} selectedGospels={selectedGospels} {...timelineProps} />
        </div>

        {/* Timeline Ruler / Minimap */}
        <div className="flex-shrink-0 h-8 px-10 bg-gray-800/50 flex items-center">
            <div ref={rulerRef} className="w-full h-full relative">
                <TimelineRuler 
                    events={rulerEvents} 
                    selectedGospels={selectedGospels} 
                    onRulerClick={handleRulerClick}
                    {...timelineProps}
                />
                {/* Viewport Indicator */}
                <div ref={viewportRef} className="absolute top-0 h-full bg-cyan-400/20 border-x-2 border-cyan-400 rounded-sm pointer-events-none"></div>
            </div>
        </div>

        <div className="flex-shrink-0 h-64 bg-gray-800 border-t-2 border-gray-700">
          <WorldTimeline ref={worldTimelineRef} events={worldEventsData} {...timelineProps} />
        </div>
      </main>
      {isAboutModalOpen && <AboutModal onClose={() => setIsAboutModalOpen(false)} />}
    </div>
  );
};

export default App;
