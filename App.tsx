import React, { useState } from 'react';
import { Gospel } from './types';
import { timelineData } from './data/timelineData';
import { worldEventsData } from './data/worldEventsData';
import { GOSPEL_NAMES } from './constants';
import FilterControls from './components/FilterControls';
import Timeline from './components/Timeline';
import WorldTimeline from './components/WorldTimeline';

const App: React.FC = () => {
  const [selectedGospels, setSelectedGospels] = useState<Gospel[]>(GOSPEL_NAMES);

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans flex flex-col">
      <header className="sticky top-0 z-30">
        <div className="p-4 bg-gray-900/70 backdrop-blur-lg">
          <h1 className="text-4xl font-bold text-center text-cyan-400 tracking-wider">
            Gospel Harmony Timeline
          </h1>
          <p className="text-center text-gray-400 mt-1">
            An interactive visualization of the life of Christ across the four Gospels.
          </p>
        </div>
        <FilterControls selectedGospels={selectedGospels} setSelectedGospels={setSelectedGospels} />
      </header>

      <main className="flex-grow flex flex-col overflow-hidden">
        <div className="flex-grow relative">
          <Timeline events={timelineData} selectedGospels={selectedGospels} />
        </div>
        <div className="flex-shrink-0 h-48 bg-gray-800 border-t-2 border-gray-700">
          <WorldTimeline events={worldEventsData} />
        </div>
      </main>
    </div>
  );
};

export default App;
