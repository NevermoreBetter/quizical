import React from "react";

function Start(props) {
  return (
    <div>
      <h2 className="name">Quizzical</h2>
      <p className="description">Test your erudition</p>
      <button className="start-btn" onClick={props.handleClick}>
        Start quiz
      </button>
    </div>
  );
}
export default Start;
