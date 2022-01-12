import classes from "./NotFound.module.css";

const NotFound = (props) => {
  const message = props.error?.message;

  let errorToDisplay;

  if (message) {
    errorToDisplay = <p>{message}</p>;
  } else {
    errorToDisplay = <p>No information available!</p>;
  }

  return <div className={classes.error}>{errorToDisplay}</div>;
};

export default NotFound;
