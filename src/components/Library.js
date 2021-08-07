import React from "react";

import LibrarySong from "./LibrarySong";
function Library({
  songs,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  libraryActive,
}) {
  return (
    <div className={`library ${libraryActive ? "library-active" : ""}`}>
      <h1>Library</h1>
      <div className="library-container">
        {songs.map((song) => (
          <LibrarySong
            audioRef={audioRef}
            isPlaying={isPlaying}
            setCurrentSong={setCurrentSong}
            song={song}
            songs={songs}
            setSongs={setSongs}
            key={song.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Library;
