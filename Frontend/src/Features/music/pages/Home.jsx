import { useState } from "react";

import SongCard from "../components/SongCard";
import FaceExpression from "../../mood/components/FaceExpression";

import "../styles/home.scss";
import useMusic from "../../music/hooks/useMusic";

const Home = () => {
  const [mood, setMood] = useState("happy");
  const [showCamera, setShowCamera] = useState(false);

  const { songs, loading } = useMusic(mood);

  const handleMoodDetected = (expression) => {
    setMood(expression);
    setShowCamera(false);
  };

  if (loading) {
    return <h2>Loading Songs...</h2>;
  }

  return (
    <section className="home">

      <div className="home__hero">

        <div className="home__hero-left">

          <span className="hero-tag">
            🎵 Moodify AI
          </span>

          <h1>
            Good Evening,
            <span> Mohit 👋</span>
          </h1>

          <p>
            Discover songs, playlists and lyrics based on your
            mood and current weather.
          </p>

          <button
            className="hero-btn"
            onClick={() => setShowCamera(true)}
          >
            Detect Mood
          </button>

        </div>

        <div className="home__hero-right">

          <div className="hero-card">

            <h3>Current Mood</h3>

            <h2>{mood}</h2>

            <p>
              {showCamera
                ? "Detecting..."
                : "Ready"}
            </p>

          </div>

        </div>

      </div>

      {showCamera && (
        <FaceExpression
          onClick={handleMoodDetected}
        />
      )}

      <div className="home__cards">

        <div className="card">
          <h3>😊 Current Mood</h3>
          <p>{mood}</p>
        </div>

        <div className="card">
          <h3>🌤 Weather</h3>
          <p>28°C • Clear Sky</p>
        </div>

      </div>

      <section className="home__section">

        <h2>Recommended Songs</h2>

        <div className="songs">

          {songs.map((song) => (
            <SongCard
              key={song.id}
              song={song}
              playlist={songs}
            />
          ))}

        </div>

      </section>

    </section>
  );
};

export default Home;