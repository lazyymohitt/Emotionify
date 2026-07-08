import {
  FaHome,
  FaCompass,
  FaHeart,
  FaCog,
  FaMusic,
} from "react-icons/fa";

export const sidebarItems = [
  {
    id: 1,
    title: "Home",
    path: "/",
    icon: FaHome,
  },
  {
    id: 2,
    title: "Explore",
    path: "/explore",
    icon: FaCompass,
  },
  {
    id: 3,
    title: "Mood",
    path: "/mood",
    icon: FaMusic,
  },
  {
    id: 4,
    title: "Favorites",
    path: "/favorites",
    icon: FaHeart,
  },
  {
    id: 5,
    title: "Settings",
    path: "/settings",
    icon: FaCog,
  },
];