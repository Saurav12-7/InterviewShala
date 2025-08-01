// src/pages/AttendQuiz.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AttendQuiz = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState({});
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  //   useEffect(() => {
  //     if (
  //       localStorage.getItem("user") &&
  //       JSON.parse(localStorage.getItem("user")).role === "teacher"
  //     ) {
  //       setUser(JSON.parse(localStorage.getItem("user")));
  //       fetchQuiz();
  //     } else {
  //       window.location.href = "/";
  //     }
  //   }, []);

  useEffect(() => {
    if (quizId) {
      fetchQuiz();
      fetchQuestions();
    }
  }, [quizId]);

  const fetchQuiz = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/student/getQuizById/${quizId}`
      );
      setQuiz(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/student/getQuestionById/${quizId}`
      );
      setQuestions(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOptionChange = (questionId, selectedOption) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: selectedOption,
    });
  };

  const handleSubmit = async () => {
    console.log("Selected Answers: ", selectedAnswers);
    let marks = 0;
    questions.forEach((question) => {
      if (selectedAnswers[question._id] === question.correctAnswer) {
        marks += 1;
        console.log("correct");
      } else {
        console.log("wrong");
      }
    });
    console.log(marks);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post(
        `http://localhost:3000/student/attendQuizById/${quizId}`,
        {
          userId: user._id,
          marks,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        alert("Quiz Submitted Successfully");
        window.location.href = `/studentDashboard`;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md text-white">
        <h1 className="text-3xl font-bold mb-6 text-center border-b-2 border-green-400 pb-4">
          {quiz.title || "Loading..."}
        </h1>
        <div>
          {questions.map((question, index) => (
            <div key={question._id} className="mb-6">
              <div className="mb-2 text-xl font-semibold">
                {index + 1}. {question.question}
              </div>
              <div className="flex flex-col space-y-2">
                {["option1", "option2", "option3", "option4"].map(
                  (optionKey) => (
                    <label
                      key={optionKey}
                      className={`p-3 rounded-lg cursor-pointer ${
                        selectedAnswers[question._id] === question[optionKey]
                          ? "bg-green-500"
                          : "bg-gray-700"
                      } hover:bg-gray-600`}
                    >
                      <input
                        type="radio"
                        name={question._id}
                        value={question[optionKey]}
                        checked={
                          selectedAnswers[question._id] === question[optionKey]
                        }
                        onChange={() =>
                          handleOptionChange(question._id, question[optionKey])
                        }
                        className="hidden"
                      />
                      {question[optionKey]}
                    </label>
                  )
                )}
              </div>
            </div>
          ))}
          <div className="text-center mt-6">
            <button
              onClick={handleSubmit}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-4 rounded"
            >
              Submit Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendQuiz;
