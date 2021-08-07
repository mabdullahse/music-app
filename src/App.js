import React, { useState, useRef } from "react";

import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";

import "./styles/app.scss";

import Data from "./data";

function App() {
  const [songs, setSongs] = useState(Data());
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [libraryActive, setlibraryActive] = useState(false);
  const audioRef = useRef(null);

  return (
    <div className={`app ${libraryActive ? "app-active" : ""}`}>
      <Nav libraryActive={libraryActive} setlibraryActive={setlibraryActive} />
      <Library
        audioRef={audioRef}
        isPlaying={isPlaying}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
        libraryActive={libraryActive}
      />
      <Song currentSong={currentSong} />
      <Player
        audioRef={audioRef}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setCurrentSong={setCurrentSong}
        songs={songs}
        setSongs={setSongs}
      />
    </div>
  );
}

export default App;
