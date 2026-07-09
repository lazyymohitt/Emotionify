import "../styles/songCard.scss";

const SongCard = ({ song }) => {
  return (
    <div className="song-card">

      <img
        src={song.cover}
        alt={song.title}
        className="song-card__image"
      />

      <div className="song-card__content">

        <h3>{song.title}</h3>

        <p>{song.artist}</p>

        <span className="song-card__mood">
          {song.mood}
        </span>

      </div>

    </div>
  );
};

export default SongCard;