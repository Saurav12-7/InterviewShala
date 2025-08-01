import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Offer from '../components/Offer';

const DummyQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [selectedAnswers, setSelectedAnswers] = useState({});

  // Dummy quiz questions
  const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correct: 2
    },
    {
      id: 2,
      question: "Which programming language is known as the 'language of the web'?",
      options: ["Java", "Python", "JavaScript", "C++"],
      correct: 2
    },
    {
      id: 3,
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
      correct: 0
    },
    {
      id: 4,
      question: "Which of the following is a JavaScript framework?",
      options: ["Django", "React", "Flask", "Express"],
      correct: 1
    },
    {
      id: 5,
      question: "What is the main purpose of CSS?",
      options: ["To create databases", "To style web pages", "To handle server logic", "To manage user authentication"],
      correct: 1
    },
    {
      id: 6,
      question: "Which HTTP method is used to send data to a server?",
      options: ["GET", "POST", "PUT", "DELETE"],
      correct: 1
    },
    {
      id: 7,
      question: "What is a REST API?",
      options: ["A type of database", "A web service architecture", "A programming language", "A browser extension"],
      correct: 1
    },
    {
      id: 8,
      question: "Which of the following is NOT a JavaScript data type?",
      options: ["String", "Number", "Boolean", "Float"],
      correct: 3
    },
    {
      id: 9,
      question: "What does API stand for?",
      options: ["Application Programming Interface", "Advanced Programming Integration", "Automated Program Interface", "Application Process Integration"],
      correct: 0
    },
    {
      id: 10,
      question: "Which database is commonly used with Node.js?",
      options: ["MySQL", "MongoDB", "PostgreSQL", "All of the above"],
      correct: 3
    }
  ];

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !showResults) {
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
  }, [timeLeft, showResults]);

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmitQuiz = () => {
    let correctAnswers = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correct) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setShowResults(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 90) return "Excellent! You're a pro! 🎉";
    if (percentage >= 80) return "Great job! Well done! 👍";
    if (percentage >= 70) return "Good work! Keep it up! 👏";
    if (percentage >= 60) return "Not bad! You can do better! 💪";
    return "Keep practicing! You'll improve! 📚";
  };

  if (showResults) {
    return (
      <div>
        <Offer />
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4">
            {/* Results Header */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-8 mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Quiz Results</h1>
              <div className="text-6xl font-bold text-blue-600 mb-4">
                {score}/{questions.length}
              </div>
              <div className="text-xl text-gray-700 mb-6">
                {getScoreMessage()}
              </div>
              <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <p className="text-lg font-semibold text-gray-800">
                  Score: {((score / questions.length) * 100).toFixed(1)}%
                </p>
              </div>
            </div>

            {/* Detailed Results */}
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Question Review</h2>
              <div className="space-y-4">
                {questions.map((question, index) => {
                  const userAnswer = selectedAnswers[question.id];
                  const isCorrect = userAnswer === question.correct;
                  
                  return (
                    <div key={question.id} className={`border rounded-lg p-4 ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Question {index + 1}: {question.question}
                      </h3>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <div key={optionIndex} className={`p-2 rounded ${
                            optionIndex === question.correct 
                              ? 'bg-green-200 text-green-800 font-semibold' 
                              : optionIndex === userAnswer && !isCorrect
                              ? 'bg-red-200 text-red-800 font-semibold'
                              : 'bg-gray-100'
                          }`}>
                            {option}
                            {optionIndex === question.correct && <span className="ml-2">✓ Correct</span>}
                            {optionIndex === userAnswer && !isCorrect && <span className="ml-2">✗ Your Answer</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="text-center space-x-4">
              <button 
                onClick={() => window.location.reload()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Retake Quiz
              </button>
              <button 
                onClick={() => window.location.href = "/"}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Offer />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Quiz Header */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Mock Test Quiz</h1>
              <div className="text-lg font-semibold text-red-600">
                Time Left: {formatTime(timeLeft)}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </p>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Current Question */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              {questions[currentQuestion].question}
            </h2>
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(questions[currentQuestion].id, index)}
                  className={`w-full text-left p-4 rounded-lg border transition-all duration-200 ${
                    selectedAnswers[questions[currentQuestion].id] === index
                      ? 'bg-blue-100 border-blue-500 text-blue-900'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
              className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            
            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmitQuiz}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
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

export default DummyQuiz; 