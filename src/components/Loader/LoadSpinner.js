import classes from "./LoadSpinner.module.css";
import cloud from "../../assets/cloud.png";

const LoadingSpinner = () => {
  return (
    <div className={classes.loadspinner}>
      <div className={classes.spinner}>
        <div className={classes.bounce1}></div>
        <div className={classes.bounce2}></div>
        <div className={classes.bounce3}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
