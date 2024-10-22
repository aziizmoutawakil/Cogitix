    import React, { useEffect, useState } from 'react';
    import { getEpisodes } from '../services/api';

    interface Episode {
    id: number;
    name: string;
    }

    const EpisodeList: React.FC<{ onSelect: (id: number) => void; selectedEpisode: number | null }> = ({ onSelect, selectedEpisode }) => {
    const [episodes, setEpisodes] = useState<Episode[]>([]);

    useEffect(() => {
        getEpisodes().then((response) => setEpisodes(response.data.results));
    }, []);

    return (
        <div className="w-1/5  h-5/6 bg-[#D3EE98] rounded-lg overflow-auto p-4 ">
        <h2 className="text-xl text-[#00712D]  mb-4">Episodes</h2>
        <ul>
            {episodes.map((episode) => (
            <li
                key={episode.id}
                onClick={() => onSelect(episode.id)}
                className={`cursor-pointer p-2 mb-2 ${selectedEpisode === episode.id ? '' : 'bg-[#C0EBA6]'} text-[#347928] hover:bg-[#72BF78] duration-150`}
            >
                {episode.name }
            </li>
            ))}
        </ul>
        </div>
    );
    };

    export default EpisodeList;
