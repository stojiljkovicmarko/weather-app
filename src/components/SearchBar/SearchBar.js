import { useState } from "react";

import classes from "./SearchBar.module.css";

const SearchBar = (props) => {
  const [query, setQuery] = useState("");

  const onInputChangeHandler = (event) => {
    setQuery(event.target.value);
  };

  const onInputHandler = (event) => {
    if (event.keyCode === 13) {
      props.searchCity(query);
      setQuery("");
    }
  };

  return (
    <div className={classes["search-bar"]}>
      <input
        type="text"
        value={query}
        onChange={onInputChangeHandler}
        placeholder="Enter city..."
        onKeyDown={onInputHandler}
      />
    </div>
  );
};

export default SearchBar;
