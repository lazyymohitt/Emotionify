import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio());

  const [playlist, setPlaylist] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const [isPlaying, setIsPlaying] = useState(false);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // ==========================
  // Play Song
  // ==========================

  const playSong = async (song, songs = []) => {
    if (!song) return;

    try {
      if (songs.length > 0) {
        setPlaylist(songs);

        const index = songs.findIndex((item) => item.id === song.id);

        setCurrentIndex(index);
      }

      if (!currentSong || currentSong.id !== song.id) {
        audioRef.current.pause();

        audioRef.current.src = song.audio;

        audioRef.current.load();

        setCurrentSong(song);
      }

      await audioRef.current.play();

      setIsPlaying(true);
    } catch (error) {
      console.log(error);
    }
  };

  // ==========================
  // Pause
  // ==========================

  const pauseSong = () => {
    audioRef.current.pause();

    setIsPlaying(false);
  };

  // ==========================
  // Next Song
  // ==========================

  const nextSong = () => {
    if (playlist.length === 0) return;

    const nextIndex = currentIndex + 1;

    if (nextIndex >= playlist.length) return;

    playSong(playlist[nextIndex], playlist);
  };

  // ==========================
  // Previous Song
  // ==========================

  const previousSong = () => {
    if (playlist.length === 0) return;

    const prevIndex = currentIndex - 1;

    if (prevIndex < 0) return;

    playSong(playlist[prevIndex], playlist);
  };

  // ==========================
  // Seek
  // ==========================

  const seekSong = (time) => {
    audioRef.current.currentTime = time;

    setCurrentTime(time);
  };

  // ==========================
  // Volume
  // ==========================

  const changeVolume = (volume) => {
    audioRef.current.volume = volume;
  };

  // ==========================
  // Format Time
  // ==========================

  const formatTime = (time) => {
    if (!time) return "00:00";

    const minutes = Math.floor(time / 60);

    const seconds = Math.floor(time % 60);

    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleSongEnded = () => {
      nextSong();
    };

    audio.addEventListener("timeupdate", updateTime);

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);

    audio.addEventListener("ended", handleSongEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);

      audio.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );

      audio.removeEventListener("ended", handleSongEnded);
    };
  }, [currentIndex, playlist]);

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        playlist,
        currentIndex,

        isPlaying,

        currentTime,
        duration,

        playSong,
        pauseSong,

        nextSong,
        previousSong,

        seekSong,
        changeVolume,

        formatTime,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);