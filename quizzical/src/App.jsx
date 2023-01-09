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
  //------------------------------------III-------------------------------
  function handleChooseAnswer(id, answer) {
    setQuestions((oldQuestion) =>
      oldQuestion.map((question) => {
        if (question.id === id) {
          return { ...question, selected: answer };
        } else {
          question;
        }
      })
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
              {checked ? "Play Again" : "Try Again"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
// ----------------------------------NEIII-----------------------------------
//   function handleClickAnswer(id, answer) {
//     setQuestions((prevQuestions) =>
//       prevQuestions.map((question) =>
//         question.id === id ? { ...question, selected: answer } : question
//       )
//     );
//   }

//   function handleCheck() {
//     let selected = true;
//     questions.forEach((question) => {
//       if (question.selected === null) {
//         selected = false;
//         return;
//       }
//     });
//     if (!selected) {
//       return;
//     }
//     setQuestions((prevQuestions) =>
//       prevQuestions.map((question) => {
//         return { ...question, checked: true };
//       })
//     );
//     setChecked(true);
//     let correct = 0;
//     questions.forEach((question) => {
//       if (question.correct === question.selected) {
//         correct += 1;
//       }
//     });
//     setCorrect(correct);
//   }

//   function handlePlayAgain() {
//     setCount((count) => count + 1);
//     setChecked(false);
//   }

//   const questionElement = questions.map((question) => {
//     return (
//       <Question
//         key={question.id}
//         question={question}
//         handleClickAnswer={handleClickAnswer}
//         id={question.id}
//       />
//     );
//   });

//   return (
//     <div>
//       {!initiate ? (
//         <Start handleClick={start} />
//       ) : (
//         <div className="content">
//           {questionElement}
//           <div className="bottom-content">
//             {checked && (
//               <span className="score">
//                 You scored {correct}/ 5 correct answers
//               </span>
//             )}
//             <button
//               className="check"
//               onClick={checked ? handlePlayAgain : handleCheck}
//             >
//               {checked ? "Play again" : "Check again"}
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

export default App;
