import React from "react";
import { playAudio } from "../utils";

function LibrarySong({
  song,
  setCurrentSong,
  audioRef,
  isPlaying,
  setSongs,
  songs,
}) {
  const changeSongHandler = () => {
    setCurrentSong(song);

    playAudio(isPlaying, audioRef);

    const updatedSongList = songs.map((item) => {
      if (item.id === song.id) {
        return {
          ...item,
          active: true,
        };
      } else {
        return {
          ...item,
          active: false,
        };
      }
    });

    setSongs(updatedSongList);
  };
  return (
    <div
      onClick={changeSongHandler}
      className={`library-song-container ${song.active ? "selected" : ""} `}
    >
      <img src={song.cover} alt="" />
      <div className="song-detail">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
}

export default LibrarySong;
