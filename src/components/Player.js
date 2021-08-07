import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faAngleLeft,
  faAngleRight,
  faPause,
} from "@fortawesome/free-solid-svg-icons";

import { playAudio } from "../utils";

function Player({
  currentSong,
  setIsPlaying,
  isPlaying,
  audioRef,
  setCurrentSong,
  songs,
  setSongs,
}) {
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animatePercentage: 0,
  });


  useEffect(() => {
     
    const updatedSongList = songs.map((item) => {
      if (item.id === currentSong.id) {
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
  }, [currentSong]);

  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const timeUpdateHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;

    setSongInfo({
      currentTime,
      duration,
      animatePercentage: Math.round((currentTime / duration) * 100),
    });
  };
  const getTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({
      ...songInfo,
      currentTime: e.target.value,
    });
  };

  const skipHandler = (direction) => {
    const selectedSongIndex = songs.findIndex(
      (item) => item.id === currentSong.id
    );

    if (direction === "skip-back") {
      let setIndex = (selectedSongIndex - 1) % songs.length;
      if (setIndex === -1) {
        setIndex = songs.length - 1;
      }
      setCurrentSong(songs[setIndex]);
    }
    if (direction === "skip-forward") {
      setCurrentSong(songs[(selectedSongIndex + 1) % songs.length]);
    }
    playAudio(isPlaying, audioRef);
  };

  const animateTrack = {
    transform: `translateX(${songInfo.animatePercentage}%)`,
  };

  const songEndedHandler = () => {
    const selectedSongIndex = songs.findIndex(
      (item) => item.id === currentSong.id
    );

    let setIndex = (selectedSongIndex - 1) % songs.length;
    if (setIndex === -1) {
      setIndex = songs.length - 1;
    }
    setCurrentSong(songs[setIndex]);

    playAudio(isPlaying, audioRef);
  };


  return (
    <div className="player">
      <div className="time-control">
        <p> {getTime(songInfo.currentTime)}</p>

        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]} )`,
          }}
          className="track"
        >
          <input
            min="0"
            max={songInfo.duration || 0}
            value={songInfo.currentTime}
            onChange={dragHandler}
            type="range"
          />
          <div style={animateTrack} className="animate-track"></div>
        </div>
        <p> {songInfo.duration ? getTime(songInfo.duration) : "0:00"} </p>
      </div>

      <div className="play-control">
        <FontAwesomeIcon
          onClick={() => skipHandler("skip-back")}
          className="skip-back"
          icon={faAngleLeft}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={playSongHandler}
          className="play"
          icon={!isPlaying ? faPlay : faPause}
          size="2x"
        />
        <FontAwesomeIcon
          onClick={() => skipHandler("skip-forward")}
          className="skip-forward"
          icon={faAngleRight}
          size="2x"
        />
        <audio
          onTimeUpdate={timeUpdateHandler}
          onLoadedMetadata={timeUpdateHandler}
          ref={audioRef}
          src={currentSong.audio}
          onEnded={songEndedHandler}
        ></audio>
      </div>
    </div>
  );
}

export default Player;
