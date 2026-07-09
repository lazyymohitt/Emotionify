import SongCard from "../components/SongCard";
import dummySongs from "../data/dummysongs";
import "../styles/home.scss";


const Home = () => {
  return (
    <section className="home">
      <div className="home__hero">
        <div className="home__welcome">
          <h1>Good Evening, Mohit 👋</h1>
          <p>Ready to discover music that matches your mood?</p>
        </div>
      </div>

      <div className="home__cards">
        <div className="card">
          <h3>😊 Current Mood</h3>
          <p>Not Detected Yet</p>
        </div>

        <div className="card">
          <h3>🌤 Weather</h3>
          <p>28°C • Clear Sky</p>
        </div>
      </div>

      <section className="home__section">
        <h2>Recommended Songs</h2>

        <div className="songs">
          {dummySongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>

      <section className="home__section">
        <h2>Your Playlists</h2>

        <div className="songs">
          {dummySongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>
    </section>
  );
};

export default Home;