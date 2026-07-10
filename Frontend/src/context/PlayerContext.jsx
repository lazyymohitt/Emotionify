 import { createContext, useContext, useRef  , useState } from "react";


const PlayerContext  = createContext()


export const PlayerProvider  = ({children})=>{

    const audioRef = useRef(new Audio())


    const [currentSong, setCurrentSong] = useState(null)

    const [isPlaying, setIsPlaying] = useState(false)


const playSong = async (song) => {
  if (!song) return;

  try {
    // Agar naya song hai
    if (!currentSong || currentSong.id !== song.id) {
      audioRef.current.pause();

      audioRef.current.src = song.audio;

      audioRef.current.load(); // ⭐ Important

      setCurrentSong(song);
    }

    await audioRef.current.play();

    setIsPlaying(true);

  } catch (error) {
    console.error("Audio Error :", error);
  }
};

    const pauseSong = () =>{
        audioRef.current.pause()
        setIsPlaying(false)
    };

    return (
        <PlayerContext.Provider
        value={{
            currentSong,
            isPlaying,
            playSong,
            pauseSong,
            audioRef
        }}
        >
        {children}

        </PlayerContext.Provider>
    )
}

export const usePlayer  = () => useContext(PlayerContext)