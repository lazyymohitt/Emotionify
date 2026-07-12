import { usePlayer } from "../../../context/PlayerContext";
import "./player.scss";


const Player = () => {
  const { currentSong, isPlaying, playSong, pauseSong } = usePlayer();

  if (!currentSong) return null;

  return (
    <footer className="player">
      <div className="player__left">
        <img src={currentSong.image} alt={currentSong.name} />

        <div>
          <h3>{currentSong.name}</h3>

          <p>{currentSong.artist_name}</p>
        </div>
      </div>

      <div className="player__center">
        <button
          onClick={() => (isPlaying ? pauseSong() : playSong(currentSong))}
        >
          {isPlaying ? "⏸" : "▶"}
        </button>
      </div>

      <div className="player__right">
        <span>{currentSong.mood}</span>
      </div>
    </footer>
  );
};

export default Player;
