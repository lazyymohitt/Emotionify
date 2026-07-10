 import { createContext, useContext, useRef  , useState } from "react";


const PlayerContext  = createContext()


export const PlayerProvider  = ({children})=>{

    const audioRef = useRef(new Audio())


    const [currentSong, setCurrentSong] = useState(null)

    const [isPlaying, setIsPlaying] = useState(false)


    const playSong = (song) =>{
         if(!song) return; 


         if(currentSong === null || currentSong.id !== song.id) {
            audioRef.current.src = song.audio;
            setCurrentSong(song)
         }

         audioRef.current.play();
         setIsPlaying(true); 


    }

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