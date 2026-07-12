import "./player.scss";

import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaVolumeUp,
  FaHeart,
} from "react-icons/fa";

import { usePlayer } from "../../../context/PlayerContext";

const Player = () => {
  const {
    currentSong,
    isPlaying,
    playSong,
    pauseSong,

    nextSong,
    previousSong,

    currentTime,
    duration,

    seekSong,
    changeVolume,

    formatTime,
  } = usePlayer();

  if (!currentSong) return null;

  return (
    <footer className="player">

      {/* LEFT */}

      <div className="player__left">

        <img
          src={currentSong.image}
          alt={currentSong.name}
        />

        <div>

          <h3>{currentSong.name}</h3>

          <p>{currentSong.artist_name}</p>

        </div>

        <button className="player__like">
          <FaHeart />
        </button>

      </div>

      {/* CENTER */}

      <div className="player__center">

        <div className="player__controls">

          <button onClick={previousSong}>
            <FaBackward />
          </button>

          <button
            className="player__play"
            onClick={() =>
              isPlaying
                ? pauseSong()
                : playSong(currentSong)
            }
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </button>

          <button onClick={nextSong}>
            <FaForward />
          </button>

        </div>

        <div className="player__progress">

          <span>{formatTime(currentTime)}</span>

          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={(e) =>
              seekSong(Number(e.target.value))
            }
          />

          <span>{formatTime(duration)}</span>

        </div>

      </div>

      {/* RIGHT */}

      <div className="player__right">

        <FaVolumeUp />

        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          defaultValue="1"
          onChange={(e) =>
            changeVolume(Number(e.target.value))
          }
        />

      </div>

    </footer>
  );
};

export default Player;