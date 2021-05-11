import {
  LightningBoltIcon,
  FilmIcon,
  SearchIcon,
  DesktopComputerIcon,
} from "@heroicons/react/solid";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [activeNav, setActiveNav] = useState();
  const navItems = [
    {
      id: 0,
      title: "HOME",
      route: "/",
      icon: LightningBoltIcon,
    },
    {
      id: 1,
      title: "MOVIES",
      route: "/movies",
      icon: FilmIcon,
    },
    {
      id: 2,
      title: "TV",
      route: "/tv-shows",
      icon: DesktopComputerIcon,
    },
    {
      id: 3,
      title: "SEARCH",
      route: "/search",
      icon: SearchIcon,
    },
  ];
  return (
    <nav className="fixed bottom-0 inset-x-0 border-t-2 bg-[#06202a] z-50">
      <div className="flex flex-grow justify-evenly md:justify-center m-4 mb-1 md:mb-2 ">
        {navItems.map((navItem) => (
          <Link key={navItem.id} to={navItem.route}>
            <div
              className={`flex flex-col items-center cursor-pointer group w-12 sm:w-20  hover:text-red-400 ${
                activeNav === navItem.id ? "text-red-400" : null
              }`}
              onClick={() => setActiveNav(navItem.id)}
            >
              <navItem.icon className="h-5 w-5 md:h-8 md:w-8 group-hover:animate-bounce" />
              <p className="opacity-100 md:opacity-0 group-hover:opacity-100 tracking-widest">
                {navItem.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
