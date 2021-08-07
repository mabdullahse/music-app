export const playAudio = (isPlaying, audioRef) => {
  if (isPlaying) {
    const audioRefPromise = audioRef.current.play();
    if (audioRefPromise !== undefined) {
      audioRefPromise
        .then((audio) => {
          audioRef.current.play();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
};
