import { useEffect } from "react";
import { getSongs } from "../services/music.api";

const useMusic = (mood = 'happy')=>{
    const [songs, setSongs] = useState([])
    const [loading, setLoading] = useState(true)


    
    const fetchSongs = async()=>{
        try {
            const data = await getSongs(mood);
            setSongs(data.songs)
            
        } catch (error) {
            console.log(error)
        }
        finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchSongs()
    },[mood])

    return {songs , loading , fetchSongs}
}


export default useMusic