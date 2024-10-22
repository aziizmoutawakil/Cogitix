import React, { useState } from 'react';
import EpisodeList from './Components/EpisodeList';
import CharacterFeed from './Components/CharacterFeed';
import Image from './assets/124947-3840x2160-desktop-4k-rick-and-morty-background-photo.jpg'
import logo from './assets/klipartz.com.png'
const App: React.FC = () => {
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);

  return (
    <div>
      <div className='flex justify-center items-center'>
        <img src={logo} className='h-20 m-4'></img>
      </div>
    <div className="flex justify-center h-screen gap-2">
      <EpisodeList  onSelect={setSelectedEpisode} selectedEpisode={selectedEpisode} />
      {selectedEpisode ? (
        <CharacterFeed episodeId={selectedEpisode} />
      ) : (
        <div className="h-5/6    flex  ">
          <img src={Image}  className="rounded-md"></img>
        </div>
      )}
    </div>
    </div>
  );
};

export default App;
