import SongCard from "../components/SongCard";
import "../styles/home.scss";
import  useMusic from "../../music/hooks/useMusic"


const Home = () => {
  const {songs ,loading} = useMusic("happy")

  if (loading){
      return <h2>Loadng Songs</h2>
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

    <button className="hero-btn">
      Detect Mood
    </button>

  </div>

  <div className="home__hero-right">

    <div className="hero-card">

      <h3>Current Mood</h3>

      <h2>😊 Neutral</h2>

      <p>
        Camera not started yet.
      </p>

    </div>

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
          {songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>

      <section className="home__section">
        <h2>Your Playlists</h2>

        <div className="songs">
          {songs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>
    </section>
  );
};

export default Home;