// Aboutus.jsx
import React from "react";
import Offer from "../components/Offer";
import Footer from "../components/Footer";

const Aboutus = () => {
  return (
    <div><Offer/>
     <div className='block p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 m-10 w-2/4 p-4 mx-auto text-center border'>
    <h1 className="text-5xl font-bold text-center leading-snug text-white ">
                  About InterviewShala
      </h1>
      <p className="text-1xl mx-auto text-center text-white text-xl max-w-[80rem] place-content-center container ml-30 mt-1">
        <br></br>Welcome to InterviewShala! We are dedicated to providing high-quality
        resources and support for interview preparation. Our mission is to
        help individuals succeed in their interviews and achieve their career
        goals.At InterviewShala, we envision a world where every individual 
        is equipped with the skills and knowledge needed to excel in interviews 
        across diverse industries. We believe that through meticulous preparation 
        and continuous support, anyone can unlock their full potential and make a 
        lasting impact on their professional journey.
      
        Whether you are embarking on your first job search, transitioning to a new industry,
        or aiming for career growth, Interview Shala is your partner in success.
        We are dedicated to supporting you at every step, ensuring that you not only 
        excel in interviews but also achieve your broader career objectives.

Welcome to a community where preparation meets opportunity, and success is not just 
a goal but a tangible reality. Your journey towards professional excellence begins here at InterviewShala!
       
      </p>
      
    </div>
    <div className='py-4 -mb-4 bg-gray-800 text-white text-center'>
    <Footer/>
    </div>
    </div>
  );
};

export default Aboutus;
