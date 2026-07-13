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
  const [queue, setQueue] = useState([]);

  const [currentSong, setCurrentSong] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const [showQueue, setShowQueue] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);

  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // ==========================
  // Play Song
  // ==========================

  const playSong = async (song, songs = []) => {
    if (!song) return;

    try {
      // Initialize playlist & queue
      if (songs.length > 0) {
        setPlaylist(songs);
        setQueue(songs);

        const index = songs.findIndex(
          (item) => item.id === song.id
        );

        setCurrentIndex(index);
      }

      // Change source only if different song
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
  // Next
  // ==========================

  const nextSong = () => {
    if (queue.length === 0) return;

    const nextIndex = currentIndex + 1;

    if (nextIndex >= queue.length) return;

    playSong(queue[nextIndex], queue);
  };

  // ==========================
  // Previous
  // ==========================

  const previousSong = () => {
    if (queue.length === 0) return;

    const prevIndex = currentIndex - 1;

    if (prevIndex < 0) return;

    playSong(queue[prevIndex], queue);
  };

  // ==========================
  // Queue Functions
  // ==========================

  const playFromQueue = (index) => {
    if (index < 0 || index >= queue.length) return;

    playSong(queue[index], queue);
  };

  const removeFromQueue = (id) => {
    setQueue((prev) =>
      prev.filter((song) => song.id !== id)
    );
  };

  const clearQueue = () => {
    setQueue([]);
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

    return `${minutes}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // ==========================
  // Audio Events
  // ==========================

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

    audio.addEventListener(
      "timeupdate",
      updateTime
    );

    audio.addEventListener(
      "loadedmetadata",
      handleLoadedMetadata
    );

    audio.addEventListener(
      "ended",
      handleSongEnded
    );

    return () => {
      audio.removeEventListener(
        "timeupdate",
        updateTime
      );

      audio.removeEventListener(
        "loadedmetadata",
        handleLoadedMetadata
      );

      audio.removeEventListener(
        "ended",
        handleSongEnded
      );
    };
  }, [currentIndex, queue]);

  return (
    <PlayerContext.Provider
      value={{
        currentSong,

        playlist,
        queue,

        currentIndex,

        showQueue,
        setShowQueue,

        isPlaying,

        currentTime,
        duration,

        playSong,
        pauseSong,

        nextSong,
        previousSong,

        playFromQueue,

        removeFromQueue,
        clearQueue,

        seekSong,
        changeVolume,

        formatTime,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () =>
  useContext(PlayerContext);