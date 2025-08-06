import React, { useEffect, useState } from 'react';
import Footer from '../components/Footer';


const QuizRedirect = () => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Redirect to our dummy quiz after countdown
          window.location.href = "/dummy-quiz";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
                  Your mock test payment has been processed successfully. Redirecting to quiz...
                </p>
              </div>
            </div>
          </div>

          {/* Quiz Instructions */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Mock Test Instructions</h2>
            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Before Starting the Test:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Ensure you have a stable internet connection</li>
                  <li>Find a quiet environment to take the test</li>
                  <li>Have your identification ready if required</li>
                  <li>Make sure your device is fully charged or plugged in</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">During the Test:</h3>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Read each question carefully before answering</li>
                  <li>Don't refresh the page during the test</li>
                  <li>Submit your answers before the time limit</li>
                  <li>Stay focused and avoid distractions</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Redirecting to Quiz:</h3>
                <p>You will be automatically redirected to the quiz platform in <span className="font-bold text-blue-600">{countdown}</span> seconds.</p>
              </div>
            </div>
          </div>

          {/* Manual Redirect Button */}
          <div className="text-center">
            <button 
              onClick={() => window.location.href = "/dummy-quiz"}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Go to Quiz Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default QuizRedirect; 