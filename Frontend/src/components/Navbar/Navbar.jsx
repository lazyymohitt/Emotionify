import React, { useState } from "react";
import "./navbar.scss";

const Navbar = () => {

  const [query, setQuery] = useState("");

  return (
    <header className="navbar">

      <div className="navbar__left">

        <input
          className="navbar__search"
          type="text"
          placeholder="Search songs, artists..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

      </div>

      <div className="navbar__right">

        <div className="navbar__weather">
          🌤 28°C
        </div>

        <button className="navbar__theme">
          🌙
        </button>

        <div className="navbar__user">
          Mohit
        </div>

      </div>

    </header>
  );
};

export default Navbar;