

import { useEffect, useState } from "react";
import { getSongs, searchSongs } from "../services/music.api";

const useMusic = (mood = "happy") => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSongs = async () => {
    try {
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

      const data = await searchSongs(query);
      setSongs(data.songs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, [mood]);

  return {
    songs,
    loading,
    handleSearch,
  };
};

export default useMusic;