
import React from 'react';
// import React from 'react'
import ReactPlayer from 'react-player'
import "./component.css"

const VideoCard = ({ title, url }) => {
  return (
    <div className="w-[600px] h-[400px] video-card flex flex-col items-center justify-center bg-pink-600 mb-10 rounded-lg p-4 animation-card">
      
      <ReactPlayer url={url} controls width="500px" height="300px"/>
      <h2 className='text-lg font-bold video-card-heading text-center'>{title}</h2>
    </div>
  );
};

export default VideoCard;
