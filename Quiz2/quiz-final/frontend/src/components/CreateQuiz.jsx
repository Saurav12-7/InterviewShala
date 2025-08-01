import axios from "axios";
import React, { useState } from "react";

const CreateQuiz = ({ user, setQuizCreatedClicked }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isQuizCreated, setIsQuizCreated] = useState(false);
  const [quizId, setQuizId] = useState("");
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const createQuiz = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3000/user/createQuiz/${user._id}`,
        {
          title,
          description,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        setIsQuizCreated(true);
        setQuizId(res.data.data._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addQuestion = async (e) => {
    e.preventDefault();
    setIsQuizCreated(true);
    try {
      const res = await axios.post(
        `http://localhost:3000/user/add-question/${quizId}`,
        {
          question,
          option1,
          option2,
          option3,
          option4,
          correctAnswer,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        setQuestion("");
        setOption1("");
        setOption2("");
        setOption3("");
        setOption4("");
        setCorrectAnswer("");
        // setIsQuizCreated(false);
        // setQuizCreatedClicked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const submitQuiz = async (e) => {
    e.preventDefault();
    setIsQuizCreated(true);
    try {
      const res = await axios.post(
        `http://localhost:3000/user/add-question/${quizId}`,
        {
          question,
          option1,
          option2,
          option3,
          option4,
          correctAnswer,
        }
      );
      console.log(res.data);
      if (res.data.success) {
        setQuestion("");
        setOption1("");
        setOption2("");
        setOption3("");
        setOption4("");
        setCorrectAnswer("");

        setIsQuizCreated(false);
        setQuizCreatedClicked(false);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gray-900">
      <div className="container max-w-[1400px]  mx-auto text-white py-10">
        <h1 className="text-3xl font-bold mb-6 text-center border-b-2 border-green-400 pb-4">
          Create Quiz
        </h1>
        {isQuizCreated ? (
          <form className="bg-gray-800 p-6 rounded-lg max-w-[500px] mx-auto">
            <input
              type="text"
              className="w-full p-2 mb-4 text-black rounded"
              placeholder="Enter Question *"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <input
              type="text"
              className="w-full p-2 mb-4 text-black rounded"
              placeholder="Option 1*"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
            />
            <input
              type="text"
              className="w-full p-2 mb-4 text-black rounded"
              placeholder="Option 2*"
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
            />
            <input
              type="text"
              className="w-full p-2 mb-4 text-black rounded"
              placeholder="Option 3*"
              value={option3}
              onChange={(e) => setOption3(e.target.value)}
            />
            <input
              type="text"
              className="w-full p-2 mb-4 text-black rounded"
              placeholder="Option 4*"
              value={option4}
              onChange={(e) => setOption4(e.target.value)}
            />
            <input
              type="text"
              className="w-full p-2 mb-4 text-black rounded"
              placeholder="Correct Answer*"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
            />
            <div className="flex justify-between">
              <button
                className="border-green-400 bg-green-400  hover:bg-green-600 text-black font-bold py-2 px-4 rounded"
                onClick={addQuestion}
              >
                Add New Question
              </button>
              <button
                className="border-red-400 bg-red-400  hover:bg-red-600 text-black font-bold py-2 px-4 rounded"
                onClick={submitQuiz}
              >
                Submit
              </button>
            </div>
          </form>
        ) : (
          <form
            onSubmit={createQuiz}
            className="bg-gray-800 p-6 rounded-lg max-w-[500px] mx-auto"
          >
            <input
              type="text"
              className="w-full p-2 mb-4 text-black rounded"
              placeholder="Title*"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              type="text"
              className="w-full p-2 mb-4 text-black rounded"
              placeholder="Description*"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              className="w-full border-green-400 bg-green-400  hover:bg-green-600 text-black font-bold py-2 px-4 rounded"
              type="submit"
            >
              Create
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateQuiz;
