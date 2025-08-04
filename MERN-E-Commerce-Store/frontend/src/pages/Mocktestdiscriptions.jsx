import React, { useState } from 'react';
import Footer from '../components/Footer';


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
      window.location.href = `${import.meta.env.VITE_API_URL || 'http://localhost:8000'}/mock-test-1`;
    }
    
   
  };

  return (
    <div>
             <div className='block p-4 sm:p-6 lg:p-10 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 m-4 sm:m-6 lg:m-10 w-full max-w-2xl mx-auto text-center border'>
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Mock Test Instructions</h5>
        <div className={`font-normal text-gray-700 dark:text-gray-400 text-left mb-10`}>
         
          
          Before the Test:
<li>
Please check your test details.
</li>
<li>  
Your test will start at the Scheduled time.
</li>
<li>
If you have any questions or need any assistance, please send an email.

</li>

During the Test:

<li>
This test is highly secure, safe and designed to ensure least possibility of malpractice. 
</li>

<li>
  All answers are saved instantaneously to the test server and secured.
</li>
<li>
Use the Quick Scan option to quickly browse through your test.
</li>
<li>
The top band changes colour to orange five minutes prior to end of Test.
</li>
<li>
Once a Test is submitted you will not be able to make any changes.
</li>
<li>
We recommend that you review your answers before submitting.
</li>
<li>
At the end of the scheduled time, the test will automatically submit for evaluation.
</li>
All the best!! Enjoy your test experience!

<div className="flex items-center mt-5" >
      
      <input type="checkbox" className='outline-none border-transparent p-3' value={isChecked} onChange={handleCheckboxChange} />
      <label htmlFor="agree-checkbox" className="ms-2 text-sm font-medium text-gray-100 dark:text-gray-300">I agree to the terms and conditions</label>
    </div>
        </div>
          <button
            onClick={handleSubmit}
            // disabled={isChecked !== true}
            className={`bg-pink-600 ${isChecked=== false?"hover:cursor-not-allowed":"cursor-pointer"} text-white py-2 px-4 rounded-md hover:bg-pink-700 focus:outline-none focus:ring focus:border-blue-300`}
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

