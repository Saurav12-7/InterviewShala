// src/pages/TeacherDashboard.js
import axios from "axios";
import { useEffect, useState } from "react";
import CreateQuiz from "../components/CreateQuiz";

function TeacherDashboard() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [quizzes, setQuizzes] = useState([]);
  const [quizCreatedClicked, setQuizCreatedClicked] = useState(false);
  useEffect(() => {
    if (
      localStorage.getItem("user") &&
      JSON.parse(localStorage.getItem("user")).role === "teacher"
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
        `http://localhost:3000/user/getQuiz/${user._id}`
      );
      console.log(res.data.data);
      setQuizzes(res.data.data);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };
  const createQuiz = (e) => {
    e.preventDefault();
    setQuizCreatedClicked(true);
  };
  return (
    <div className="min-h-screen bg-gray-900 p-6 relative">
        <div className="max-w-7xl mx-auto bg-gray-800 p-6 rounded-lg shadow-md text-white">
            <h1 className="text-3xl font-bold mb-6 text-center border-b-2 border-green-400 pb-4">
            Teacher Dashboard
            </h1>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Previous Quizzes</h2>
          <button
            className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 px-4 rounded"
            onClick={createQuiz}
          >
            Create New Quiz
          </button>
        </div>
        <div className="bg-gray-700 p-4 rounded-lg shadow-md">
          <div className="flex justify-between border-b-2 border-gray-600 pb-2 mb-4">
            <div className="w-1/6 font-semibold">ID</div>
            <div className="w-2/3 font-semibold">Title</div>
            <div className="w-1/6 font-semibold">Date</div>
          </div>
          {quizzes.length === 0 ? (
            <p className="text-center text-3xl">No Quizzes</p>
          ) : (
            quizzes.map((quiz, index) => (
              <div
                key={quiz.id}
                className="flex justify-between border-b border-gray-600 py-2 hover:bg-gray-600"
              >
                <div className="w-1/6">{index + 1}</div>
                <div className="w-2/3">{quiz.title}</div>
                <div className="w-1/6">{quiz.createdAt}</div>
              </div>
            ))
          )}
        </div>
      </div>

      {quizCreatedClicked && (
        <CreateQuiz user={user} setQuizCreatedClicked={setQuizCreatedClicked} />
      )}
    </div>
  );
}

export default TeacherDashboard;
