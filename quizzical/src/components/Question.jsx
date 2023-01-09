import React from "react";

import { nanoid } from "nanoid";

function Question(props) {
  console.log(props);
  let answers = props.question.answers;
  function handleClick(answer) {
    if (props.question.checked) {
      return;
    }
    props.handleClickAnswer(props.id, answer);
  }

  const answerElement = answers.map((answer) => {
    let id = null;
    if (props.question.checked) {
      if (props.question.correct === answer) {
        id = "correct";
      } else if (props.question.selected === answer) {
        id = "incorrect";
      } else {
        id = "not-selected";
      }
    }

    return (
      <button
        key={nanoid()}
        className={
          answer === props.question.selected ? "answer-selected" : "answer"
        }
        id={id}
        onClick={() => handleClick(answer)}
      >
        {answer}
      </button>
    );
  });

  return (
    <div>
      <div className="question">{props.question.question}</div>
      {answerElement}
    </div>
  );
}
export default Question;
