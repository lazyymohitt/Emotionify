import { useEffect, useState } from "react";
import { usePlayer } from "../../../context/PlayerContext";
import { getSongs, searchSong } from "../services/music.api";
import { useSearch } from "../../../context/SearchContext";

const useMusic = (mood = "happy") => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const { query } = useSearch();
  const { playSong } = usePlayer();

const fetchSongs = async () => {
  try {
    setLoading(true);

    const data = await getSongs(mood);

    setSongs(data.songs);

   

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  const handleSearch = async (query) => {
    try {
      if (!query.trim()) {
        fetchSongs();
        return;
      }

      const data = await searchSong(query);
      console.log(data)
      setSongs(data.songs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  if (query.trim()) {
    handleSearch(query);
  } else {
    fetchSongs();
  }
}, [query, mood]);

  return {
    songs,
    loading,
    handleSearch,
  };
};

export default useMusic;