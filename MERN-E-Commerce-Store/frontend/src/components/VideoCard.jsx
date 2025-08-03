
import React from 'react';
// import React from 'react'
import ReactPlayer from 'react-player'
import "./component.css"

const VideoCard = ({ title, url }) => {
  return (
    <div className="w-full max-w-[600px] h-auto min-h-[300px] sm:h-[400px] video-card flex flex-col items-center justify-center bg-pink-600 mb-6 sm:mb-10 rounded-lg p-3 sm:p-4 animation-card">
      
      <ReactPlayer url={url} controls width="100%" height="auto" style={{ maxWidth: '500px', maxHeight: '300px' }}/>
      <h2 className='text-sm sm:text-base lg:text-lg font-bold video-card-heading text-center mt-2 sm:mt-3'>{title}</h2>
    </div>
  );
};

export default VideoCard;
