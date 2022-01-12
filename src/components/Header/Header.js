import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <div className={classes["header-container"]}>
      <header className={classes.header}>
        <h1>Weather app</h1>
        <nav className={classes.nav}>
          <ul>
            <li>Home</li>
            <li>About</li>
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default Header;
