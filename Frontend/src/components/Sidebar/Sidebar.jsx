import { NavLink } from "react-router-dom";

import { sidebarItems } from "../../constants/sidebar.config";

import "./sidebar.scss";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <h2>Moodify</h2>
      </div>

      <nav className="sidebar__nav">
        {sidebarItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "sidebar__link active" : "sidebar__link"
              }
            >
              <Icon className="sidebar__icon" />

              <span className="sidebar__text">{item.title}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
