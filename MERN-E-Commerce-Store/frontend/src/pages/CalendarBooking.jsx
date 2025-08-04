import React, { useState } from 'react';
import { InlineWidget } from "react-calendly";
import Footer from '../components/Footer';


const CalendarBooking = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Success Message */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="h-8 w-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-green-800">
                  Payment Successful! 🎉
                </h3>
                <p className="text-green-700 mt-1">
                  Your payment has been processed successfully. Now you can schedule your mock interview.
                </p>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mock Interview Instructions</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Before the Interview:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Please check your Mock Interview details carefully</li>
                  <li>Your Interview will start at the Scheduled time</li>
                  <li>If you have any questions, please email interviewshala@gmail.com</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">During the Interview:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>LOGOUT from all other email IDs before joining the Google Meet</li>
                  <li>Ensure your camera, microphone, and stable internet connection are working</li>
                  <li>Join the meet at least 5 minutes before the scheduled time</li>
                  <li>Requests for rescheduling will not be honored</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Schedule Interview:</h3>
                <p>Once you successfully pay the interview fee, you can book an interview slot as per your preferences. We will be allotting seats on a first-come-first-serve basis.</p>
              </div>
            </div>

            <div className="flex items-center mt-6">
              <input 
                type="checkbox" 
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <label className="ml-2 text-sm text-gray-700">
                I agree to the terms and conditions
              </label>
            </div>
          </div>

          {/* Calendar Widget */}
          {isChecked && (
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Schedule Your Mock Interview</h2>
              <p className="text-gray-600 mb-6">
                Choose a convenient time slot for your mock interview. Available slots are shown below.
              </p>
              <div className="calendly-inline-widget" style={{ minHeight: '700px' }}>
                <InlineWidget 
                  url="https://calendly.com/interviewshala/30min"
                  styles={{
                    height: '700px',
                    width: '100%'
                  }}
                />
              </div>
            </div>
          )}

          {!isChecked && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
              <p className="text-yellow-800">
                Please agree to the terms and conditions to proceed with scheduling your interview.
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CalendarBooking; 