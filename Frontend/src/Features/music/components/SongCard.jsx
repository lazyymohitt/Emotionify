import { usePlayer } from "../../../context/PlayerContext";
import "../styles/songcard.scss";

const SongCard = ({ song, playlist }) => {

  const { playSong } = usePlayer();

  return (
    <div
      className="song-card"
      onClick={() => playSong(song, playlist)}
    >
      <img
        src={song.image}
        alt={song.name}
        className="song-card__image"
      />

      <div className="song-card__content">
        <h3>{song.name}</h3>
        <p>{song.artist_name}</p>
      </div>
    </div>
  );
};

export default SongCard;