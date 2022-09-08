import React from 'react';

const Song = (props) => {
  const { songName, songArtist } = props;

  return (
    <div className='song-container'>{songName + ' - By: ' + songArtist}</div>
  );
};

export default Song;
