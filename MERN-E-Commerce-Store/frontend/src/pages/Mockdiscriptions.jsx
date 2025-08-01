import React, { useState } from 'react';
import Footer from '../components/Footer';
import Offer from '../components/Offer';

const Mocktestdiscriptions = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    console.log(isChecked);
  };

  const handleSubmit = () => {
    if(!isChecked){
      alert('Please agree terms and condition to continue!')
      
    }else{
      
      console.log('working')
      window.location.href = "http://localhost:3004/";
      // window.location.href = `https://calendly.com/interviewshala/30min`;
    }
    
   
  };

  return (
    <div>
      <Offer />
      <div className='block p-10 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 m-10 w-2/4 p-4 mx-auto text-center border'>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Mock Interview Instructions</h5>
        <div className={`font-normal text-gray-700 dark:text-gray-400 text-left mb-10`}>
         
          
          Before the Interview:
<li>
Please check your Mock Interview details.
</li>
<li>  
Your Interview will start at the Scheduled time.
</li>
<li>
If you have any questions or need any assistance, please send an email interviewshala@gmail.com.

</li>

During the Interview:

<li>
LOGOUT from all other email ids before joining the Google Meet. Candidates with email ids other than GMAIL, please ensure to SWITCH ACCOUNT and join only through the alternate GMAIL EMAIL id you have provided while uploading the documents before joining the Google Meet. It is the responsibility of the candidate to ensure that the camera, microphone, power back up and stable internet connection is available during the selection process. Requests for rescheduling will not be honored. Join the meet at least 5mts before the scheduled time.
</li>
<li>
Schedule Interview: Once you successfully pay the interview fee you can book an interview slot as per your preferences Reply in same mail what is your course,date,time and venue of the interview.Please note we will be alloting seats on a first come first serve basis. The moment the seats are full, we will be Change the Fate of interview and time of interview. We urge you to give your interview as soon as possible if you wish to secure a seat in the Mock interview.
</li>
All the best!! Enjoy your Mock Interview experience!

<div className="flex items-center mt-5" >
      
      <input type="checkbox" className='outline-none border-transparent p-3' value={isChecked} onChange={handleCheckboxChange} />
      <label htmlFor="agree-checkbox" className="ms-2 text-sm font-medium text-gray-100 dark:text-gray-300">I agree to the terms and conditions</label>
    </div>
        </div>
          <button
            onClick={handleSubmit}
            // disabled={isChecked !== true}
            className={`bg-blue-600 ${isChecked=== false?"hover:cursor-not-allowed":"cursor-pointer"} text-white py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring focus:border-blue-300`}
          >
            Next
          </button>
        
      </div>
      <div className='py-4 -mb-4 bg-gray-800 text-white text-center'>
      <Footer />
      </div>
    </div>
  );
}

export default Mocktestdiscriptions;

