// VideoCollectionPage.js
import React from 'react';

import Footer from './Footer';
import VideoCard from './VideoCard';
import Offer from './Offer'; // Assuming you have a VideoCard component

const videoData = [
  {
    id: 1,    title: 'Most important questions and answers asked in every interview - Job interview Conversation',
    url: 'https://youtu.be/ACiNC1T0Et0?si=sfEgBB76Sb4XiEBv',
  },
  {
    id: 2,
    title: 'IBM Interview Preparation DAY 1| IBM coding assessment',
    url: 'https://youtu.be/8edZCUF4s7I?si=Cxu1lWwk_ksCosnO',
  },
  {
    id: 3,
    title: 'Help to Choose Best College In Bangalore|| Mobile Calling Counselling ||rvce,msrit,Christ, PES,CMRIT',
    url: 'https://youtu.be/pHYwwcKMxVI?si=yo6Dd5MmtqFXT-7Z',
  },
  {
    id: 4,
    title: 'Christ University||Ofline Addmission process||How to pay Fees||Payment Method|Interview & MP',
    url: 'https://youtu.be/jVRONUDQ8nQ?si=gUlOi8v4j_FBkSe8',
  },
  {
    id: 5,
    title: 'Introduction to ReactPES University MCA Review 2023||MCA placements||Syllabus||Hostel||Campus||Best College in Bangalore?',
    url: 'https://youtu.be/bDoZ-DVVhIg?si=iRx3xFRNt9q1MEAX',
  },
  {
    id: 6,
    title: 'Our Placement Journey at PES University, Bangalore | Engineering',
    url: 'https://youtu.be/0mipJat6un8?si=-aeAh1etQ45wQhHB',
  },
  {
  id: 7,
    title: 'https://youtu.be/FxgM9k1rg0Q?si=Yql7RcATbDcAkEDr',
    url: 'https://youtu.be/FxgM9k1rg0Q?si=Yql7RcATbDcAkEDr',
  },
  {
    id: 8,
      title: 'PES University, Bangalore | Engineering',
      url: 'https://youtu.be/RGKi6LSPDLU?si=6zQS4Nxwmr2p0Rym',
    },
  

];

  const VideoCollectionPage = () => {
   return (
     <div className="min-h-screen bg-gray-50">
       <Offer />
       <div className="container mx-auto py-6 sm:py-8 lg:py-12">
         <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-center leading-snug mb-6 sm:mb-8 lg:mb-12 text-gray-800">
                  Free Video Course
       </h1>
      
             <div className="video-list px-2 sm:px-4 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 items-start gap-3 sm:gap-4 lg:gap-6 max-w-7xl mx-auto">
        {videoData.map((video) => (
          <VideoCard key={video.id} title={video.title} url={video.url} />
                 ))}
       </div>
       </div>
       <Footer />
     </div>
  );
};

export default VideoCollectionPage;
