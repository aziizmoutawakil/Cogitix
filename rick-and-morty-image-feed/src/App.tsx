import React, { useState } from 'react';
import EpisodeList from './Components/EpisodeList';
import CharacterFeed from './Components/CharacterFeed';

const App: React.FC = () => {
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);

  return (
    <div>
      <div className='bg- '>
        <h1 className=' flex justify-center font-bold text-[#00712D] text-3xl pt-3 pb-3'>  Rick and morty Characters</h1>
      </div>
    <div className="flex justify-center h-screen gap-2">
      <EpisodeList  onSelect={setSelectedEpisode} selectedEpisode={selectedEpisode} />
      {selectedEpisode ? (
        <CharacterFeed episodeId={selectedEpisode} />
      ) : (
        <div className="w-3/4 p-3  flex items-center justify-center">
          <h2 className="text-2xl">Select an episode to see the characters</h2>
        </div>
      )}
    </div>
    </div>
  );
};

export default App;
