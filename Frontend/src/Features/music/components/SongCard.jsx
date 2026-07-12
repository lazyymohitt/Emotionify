import { usePlayer } from "../../../context/PlayerContext";
import "../styles/songcard.scss";



const SongCard = ({ song }) => {

  const { playSong } = usePlayer();

  return (

    <div
      className="song-card"
      onClick={() => playSong(song)}
    >

      <img
        src={song.image}
        alt={song.name}
        className="song-card__image"
      />

      <div className="song-card__content">

        <h3>{song.name}</h3>

        <p>{song.artist_name}</p>

        <span className="song-card__mood">
          {song.mood}
        </span>

      </div>

    </div>

  );
};

export default SongCard;