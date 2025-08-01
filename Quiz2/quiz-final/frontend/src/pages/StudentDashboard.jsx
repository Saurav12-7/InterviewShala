import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [quizzes, setQuizzes] = useState([]);
  const [completedQuiz, setCompletedQuiz] = useState([]);
  const [unAttemptedQuiz, setUnAttemptedQuiz] = useState([]);
  const [answers, setAnswers] = useState({});
  const [isAnswers, setIsAnswers] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("user") &&
      JSON.parse(localStorage.getItem("user")).role === "student"
    ) {
      setUser(JSON.parse(localStorage.getItem("user")));
      fetchQuiz();
    } else {
      window.location.href = "/";
    }
  }, []);

  const fetchQuiz = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/student/getQuiz/${user._id}`
      );
      console.log(res.data.data);
      //   setQuizzes(res.data.data);
      setCompletedQuiz(res.data.data.completedQuizzes);
      setUnAttemptedQuiz(res.data.data.unattemptedQuizzes);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  const attendQuiz = (quiz) => {
    // const navigate = useNavigate();

    const confirm = window.confirm(
      "Are you sure you want to attend this quiz?"
    );
    if (confirm) {
      navigate(`/attendQuiz/${quiz._id}`);
    }
  };

  const openQuiz = async (quiz) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/student/getResult/${quiz._id}`
      );
      setIsAnswers(true);
      console.log(res.data.data);
      setAnswers(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-900 p-6 relative">
      <div className="max-w-7xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md text-white">
        <h1 className="text-3xl font-bold mb-6 text-center border-b-2 border-green-400 pb-4">
          Student Dashboard
        </h1>
        <div className="flex flex-col  mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Unattempted Quizzes</h2>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow-md">
            <div className="flex justify-between border-b-2 border-gray-600 pb-2 mb-4">
              <div className="w-1/6 font-semibold">ID</div>
              <div className="w-2/3 font-semibold">Title</div>
              <div className="w-1/6 font-semibold">Date</div>
            </div>
            {unAttemptedQuiz.length === 0 ? (
              <p className="text-center text-3xl">No Quizzes</p>
            ) : (
              unAttemptedQuiz.map((quiz, index) => (
                <div
                  key={quiz.id}
                  className="cursor-pointer flex justify-between border-b border-gray-600 py-2 hover:bg-gray-600"
                  onClick={() => attendQuiz(quiz)}
                >
                  <div className="w-1/6">{index + 1}</div>
                  <div className="w-2/3">{quiz.title}</div>
                  <div className="w-1/6">{quiz.createdAt}</div>
                </div>
              ))
            )}
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Completed Quizzes</h2>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg shadow-md">
            <div className="flex justify-between border-b-2 border-gray-600 pb-2 mb-4">
              <div className="w-1/6 font-semibold">ID</div>
              <div className="w-2/3 font-semibold">Title</div>
              <div className="w-1/6 font-semibold">Date</div>
            </div>
            {completedQuiz.length === 0 ? (
              <p className="text-center text-3xl">No Quizzes</p>
            ) : (
              completedQuiz.map((quiz, index) => (
                <div
                  key={quiz.id}
                  className="cursor-pointer flex justify-between border-b border-gray-600 py-2 hover:bg-gray-600"
                  onClick={() => openQuiz(quiz)}
                >
                  <div className="w-1/6">{index + 1}</div>
                  <div className="w-2/3">{quiz.title}</div>
                  <div className="w-1/6">{quiz.createdAt}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {isAnswers && (
        <div className="absolute top-0 left-0 w-full h-full bg-white z-[9999] py-10">
          <div
            onClick={() => setIsAnswers(false)}
            className="absolute cursor-pointer bg-green-400 top-[10%] right-[7%] p-2 px-3 rounded-md"
          >
            X
          </div>
          <div className="container max-w-[1400px] h-full mx-auto bg-slate-900 rounded-md">
            <h1 className="text-3xl pt-5 font-bold mb-6 text-center border-b-2 border-green-400 pb-4 text-white">
              Results
            </h1>

            <div className="px-10">
              <div className="flex justify-between border-b-2 mb-10">
                <h1 className="text-xl text-white uppercase">Students</h1>
                <h1 className="text-xl text-white">Total Marks</h1>
              </div>
              {answers.map((answer, index) => (
                <div
                  key={index}
                  className="flex justify-between border-b border-gray-600 py-2 hover:bg-gray-600 px-3"
                >
                  <h1 className="text-xl text-white uppercase">
                    {answer.user}
                  </h1>
                  <h1 className="text-xl text-white">{answer.marks}</h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
