
import React from 'react';
// import React from 'react'
import ReactPlayer from 'react-player'
import "./component.css"

const VideoCard = ({ title, url }) => {
  return (
    <div className="w-full max-w-[600px] h-auto min-h-[250px] sm:min-h-[300px] lg:min-h-[350px] video-card flex flex-col items-center justify-center bg-gradient-to-br from-pink-500 to-pink-600 mb-4 sm:mb-6 lg:mb-8 rounded-xl p-3 sm:p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300">
      
      <div className="w-full max-w-full overflow-hidden rounded-lg">
        <ReactPlayer 
          url={url} 
          controls 
          width="100%" 
          height="200px"
          style={{ maxWidth: '100%' }}
        />
      </div>
      <h2 className='text-xs sm:text-sm lg:text-base font-bold video-card-heading text-center mt-3 sm:mt-4 text-white leading-tight px-2'>{title}</h2>
    </div>
  );
};

export default VideoCard;
