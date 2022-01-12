import Header from "../components/Header/Header";
import Home from "../pages/Home";

import classes from "./Layout.module.css";

const Layout = (props) => {
  return (
    <div className={classes.layout}>
      <Header />
      <Home />
      {props.children}
    </div>
  );
};

export default Layout;
