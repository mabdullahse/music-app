import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

function Nav({ setlibraryActive, libraryActive }) {
  return (
    <div className="nav">
      <h1>Wave</h1>

      <button
        className="library-button"
        onClick={() => setlibraryActive(!libraryActive)}
      >
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </div>
  );
}

export default Nav;
