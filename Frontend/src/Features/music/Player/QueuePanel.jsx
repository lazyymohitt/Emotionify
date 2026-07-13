import "./queue.scss";

import QueueItem from "./QueueItem";

import { usePlayer } from "../../../context/PlayerContext";

const QueuePanel = () => {

  const {

    queue,

    currentSong,

    showQueue,

    setShowQueue,

    playFromQueue,

  } = usePlayer();

  return (

    <div
      className={`queue-panel ${
        showQueue ? "open" : ""
      }`}
    >

      <div className="queue-header">

        <h2>Up Next</h2>

        <button
          onClick={() =>
            setShowQueue(false)
          }
        >
          ✕
        </button>

      </div>

      <div className="queue-list">

        {queue.map((song, index) => (

          <QueueItem

            key={song.id}

            song={song}

            active={
              currentSong?.id === song.id
            }

            onClick={() =>
              playFromQueue(index)
            }

          />

        ))}

      </div>

    </div>

  );

};

export default QueuePanel;