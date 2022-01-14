import { NavLink } from "react-router-dom";

import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={classes.header}>
      <h1>Weather app</h1>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink
              onClick={console.log("about")}
              to="/home"
              className={(navData) =>
                navData.isActive ? `${classes.active}` : ""
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={console.log("about")}
              to="/about"
              className={(navData) =>
                navData.isActive ? `${classes.active}` : ""
              }
            >
              About
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
