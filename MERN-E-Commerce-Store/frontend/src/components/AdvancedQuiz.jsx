import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Footer from './Footer';
import Offer from './Offer';

const AdvancedQuiz = ({ quizId }) => {
  const { user } = useSelector((state) => state.auth);
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    fetchQuiz();
  }, [quizId]);

  useEffect(() => {
    if (quiz && timeLeft > 0 && !showResults) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, showResults, quiz]);

  const fetchQuiz = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/quiz/${quizId}`);
      const data = await response.json();
      
      if (data.success) {
        setQuiz(data.data);
        setTimeLeft(data.data.timeLimit || 300);
        setLoading(false);
      } else {
        toast.error('Failed to load quiz');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching quiz:', error);
      toast.error('Failed to load quiz');
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const handleSubmitQuiz = async () => {
    if (submitting) return;
    
    setSubmitting(true);
    
    try {
      const answers = Object.entries(selectedAnswers).map(([questionId, answer]) => ({
        questionId,
        answer,
      }));

      const timeTaken = (quiz.timeLimit || 300) - timeLeft;

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/quiz/${quizId}/take`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          answers,
          timeTaken,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setResults(data.data);
        setShowResults(true);
      } else {
        toast.error(data.message || 'Failed to submit quiz');
      }
    } catch (error) {
      console.error('Error submitting quiz:', error);
      toast.error('Failed to submit quiz');
    } finally {
      setSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreMessage = () => {
    if (!results) return '';
    const percentage = results.percentage;
    
    if (percentage >= 90) return 'Excellent! 🎉';
    if (percentage >= 80) return 'Great job! 👍';
    if (percentage >= 70) return 'Good work! 😊';
    if (percentage >= 60) return 'Not bad! 🙂';
    return 'Keep practicing! 💪';
  };

  if (loading) {
    return (
      <div>
        <Offer />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading quiz...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!quiz) {
    return (
      <div>
        <Offer />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600">Quiz not found</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (showResults) {
    return (
      <div>
        <Offer />
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Quiz Results</h1>
                <h2 className="text-xl text-gray-700 mb-2">{quiz.title}</h2>
                <p className="text-gray-600">{quiz.description}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Your Score</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {results.marks}/{results.totalQuestions}
                  </div>
                  <div className="text-lg text-blue-700 mb-2">
                    {results.percentage}%
                  </div>
                  <div className="text-blue-800 font-medium">
                    {getScoreMessage()}
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Time Taken</h3>
                  <div className="text-2xl font-bold text-green-600">
                    {formatTime(results.timeTaken)}
                  </div>
                  <div className="text-green-700 mt-2">
                    out of {formatTime(quiz.timeLimit || 300)}
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={() => window.location.href = '/profile'}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold mr-4"
                >
                  View All Results
                </button>
                <button
                  onClick={() => window.location.href = '/shop'}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
                >
                  Take Another Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestion];

  return (
    <div>
      <Offer />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Quiz Header */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{quiz.title}</h1>
                <p className="text-gray-600">{quiz.description}</p>
                <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                  <span>Category: {quiz.category}</span>
                  <span>Difficulty: {quiz.difficulty}</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{formatTime(timeLeft)}</div>
                  <div className="text-sm text-gray-500">Time Remaining</div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Question {currentQuestion + 1} of {quiz.questions.length}
              </span>
              <span className="text-sm text-gray-500">
                {Math.round(((currentQuestion + 1) / quiz.questions.length) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {currentQ.question}
            </h2>

            <div className="space-y-3">
              {[currentQ.option1, currentQ.option2, currentQ.option3, currentQ.option4].map((option, index) => (
                <label
                  key={index}
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedAnswers[currentQ._id] === option
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQ._id}`}
                    value={option}
                    checked={selectedAnswers[currentQ._id] === option}
                    onChange={() => handleAnswerSelect(currentQ._id, option)}
                    className="mr-3"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentQuestion === quiz.questions.length - 1 ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={submitting || Object.keys(selectedAnswers).length < quiz.questions.length}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Quiz'}
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(prev => Math.min(quiz.questions.length - 1, prev + 1))}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdvancedQuiz; 