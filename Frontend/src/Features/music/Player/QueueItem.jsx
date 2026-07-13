import "./queue.scss";

const QueueItem = ({
  song,
  active,
  onClick,
}) => {
  return (
    <div
      className={`queue-item ${
        active ? "active" : ""
      }`}
      onClick={onClick}
    >
      <img
        src={song.image}
        alt={song.name}
      />

      <div>

        <h4>{song.name}</h4>

        <p>{song.artist_name}</p>

      </div>

    </div>
  );
};

export default QueueItem;