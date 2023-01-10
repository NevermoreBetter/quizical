import { useState, useEffect } from "react";
import Start from "./components/Start";
import "./styles/App.css";
import { nanoid } from "nanoid";
import Question from "./components/Question";

function App() {
  const [initiate, setInitiate] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [count, setCount] = useState(0);
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(0);

  function start() {
    setInitiate(true);
  }

  const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5);

  useEffect(() => {
    async function getQuestion() {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=5&type=multiple"
      );
      const data = await res.json();
      let q = [];
      data.results.forEach((question) => {
        q.push({
          id: nanoid(),
          answers: shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer,
          ]),
          question: question.question,
          correct: question.correct_answer,
          selected: null,
          checked: false,
        });
      });
      setQuestions(q);
    }
    getQuestion();
  }, [count]);

  function handleChooseAnswer(id, answer) {
    setQuestions((prevQuestion) =>
      prevQuestion.map((question) =>
        question.id === id ? { ...question, selected: answer } : question
      )
    );
  }

  function handleCheck() {
    let selected = true;
    questions.forEach((question) => {
      if (question.selected === null) {
        selected = false;
        return;
      }
    });

    if (!selected) {
      return;
    }

    setQuestions((prevQuestions) =>
      prevQuestions.map((question) => {
        return { ...question, checked: true };
      })
    );

    setChecked(true);
    let count = 0;

    questions.forEach((question) => {
      if (question.correct === question.selected) {
        count += 1;
      }
    });

    setCorrect(count);
  }

  function playAgain() {
    setCount((count) => count + 1);
    setChecked(false);
  }

  const questionElement = questions.map((question) => {
    return (
      <Question
        key={question.id}
        id={question.id}
        question={question}
        handleClickAnswer={handleChooseAnswer}
      />
    );
  });

  return (
    <div>
      <svg
        width="155"
        height="124"
        viewBox="0 0 155 124"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="bottom-blob"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M1.0123 5.02641C42.5256 1.89543 88.8067 -9.60103 118.87 19.2298C152.145 51.1407 161.846 102.824 149.266 147.202C137.332 189.3 100.309 220.213 58.385 232.597C23.0923 243.022 -8.86904 218.725 -42.5365 203.858C-78.7733 187.857 -127.077 183.114 -139.176 145.359C-151.794 105.989 -125.705 64.7085 -96.5 35.4733C-71.1686 10.1159 -34.7085 7.72051 1.0123 5.02641Z"
          fill="#DEEBF8"
        />
      </svg>

      <svg
        width="158"
        height="141"
        viewBox="0 0 158 141"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="top-blob"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M63.4095 81.3947C35.1213 50.8508 -2.68211 21.7816 1.17274 -19.6933C5.43941 -65.599 39.854 -105.359 82.4191 -123.133C122.797 -139.994 170.035 -130.256 205.822 -105.149C235.947 -84.0141 236.823 -43.8756 246.141 -8.27104C256.17 30.0508 282.521 70.8106 260.501 103.779C237.538 138.159 188.991 143.432 147.931 138.768C112.318 134.723 87.7505 107.677 63.4095 81.3947Z"
          fill="#FFFAD1"
        />
      </svg>

      {!initiate ? (
        <Start handleClick={start} />
      ) : (
        <div className="content">
          {questionElement}
          <div className="content-bottom">
            {checked && (
              <div className="score">You scored {correct}/ 5 right answers</div>
            )}
            <button
              className="main-button"
              onClick={checked ? playAgain : handleCheck}
            >
              {checked ? "Play Again" : "Check Answers"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
