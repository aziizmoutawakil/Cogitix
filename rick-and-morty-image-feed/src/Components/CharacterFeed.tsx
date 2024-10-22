import React, { useEffect, useState } from 'react';
import { getCharactersByEpisode } from '../services/api';
import axios from 'axios';

interface Character {
  id: number;
  name: string;
  image: string;
}

interface Episode {
  name: string;
  characters: string[];
}

const CharacterFeed: React.FC<{ episodeId: number | null }> = ({ episodeId }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [episodeName, setEpisodeName] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const charactersPerPage = 20;

  useEffect(() => {
    const fetchCharacters = async () => {
      if (episodeId) {
        setLoading(true);
        try {
          const response = await getCharactersByEpisode(episodeId);
          const episodeData: Episode = response.data;
          const characterURLs: string[] = episodeData.characters;

          const characterPromises = characterURLs.map((url) => axios.get(url));
          const characterResponses = await Promise.all(characterPromises);

          const characterData = characterResponses.map((res) => res.data);
          setCharacters(characterData);

          setEpisodeName(episodeData.name);
        } catch (error) {
          console.error('Failed to fetch characters:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCharacters();
  }, [episodeId]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const indexOfLastCharacter = currentPage * charactersPerPage;
  const indexOfFirstCharacter = indexOfLastCharacter - charactersPerPage;
  const currentCharacters = characters.slice(indexOfFirstCharacter, indexOfLastCharacter);

  const renderSkeletons = () => {
    return Array.from({ length: charactersPerPage }).map((_, index) => (
      <div key={index} className="flex flex-col justify-center items-center bg-gray-300 p-2 rounded-sm animate-pulse">
        <div className="h-[6rem] w-full bg-gray-400 rounded"></div>
        <div className="mt-2 h-4 w-3/4 bg-gray-400 rounded"></div>
      </div>
    ));
  };

  return (
    <div className='h-5/6 w-3/4'>
      <div className="h-full w-full rounded-md">
        <div className="text-xl mb-1 p-2 rounded-sm bg-[#D3EE98] text-[#347928]">
          {loading ? 'Loading Episode...' : `${characters.length} Characters in Episode "${episodeName}"`}
        </div>

        <div className="grid grid-cols-5 gap-1">
          {loading ? renderSkeletons() : currentCharacters.map((character) => (
            <div key={character.id} className="flex flex-col justify-start items-center bg-[#D3EE98] p-1 rounded-sm">
              <img 
                src={character.image}
                alt={character.name}
                className="rounded h-[6rem]"
              />
              <h4 className="text-center text-[#347928]">{character.name}</h4>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center p-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 bg-[#00712D] text-[#DBD3D3] rounded-l-lg hover:bg-[#DBD3D3] hover:text-[#00712D]"
          >
            Prev
          </button>
          {[...Array(Math.ceil(characters.length / charactersPerPage))].map((_, pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => handlePageChange(pageIndex + 1)}
              className={`px-4 border ${currentPage === pageIndex + 1 ? 'bg-[#00712D] text-[#DBD3D3]' : 'bg-[#DBD3D3] text-[#00712D]'}`}
            >
              {pageIndex + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(characters.length / charactersPerPage)}
            className="px-4 bg-[#00712D] text-[#DBD3D3] rounded-r-lg duration-300 hover:bg-[#DBD3D3] hover:text-[#00712D]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default CharacterFeed;
