import "./mainlayout.scss";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import Player from "../features/music/Player/Player";

import { usePlayer } from "../context/PlayerContext";

const MainLayout = () => {

  const { currentSong } = usePlayer();

  return (
    <div className="layout">

      <Sidebar />

      <main
        className={`layout__main ${
          currentSong ? "player-open" : ""
        }`}
      >
        <Navbar />

        <Outlet />
      </main>

      <Player />

    </div>
  );
};

export default MainLayout;