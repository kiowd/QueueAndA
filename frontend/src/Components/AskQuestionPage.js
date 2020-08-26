import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import QuestionForm from "./QuestionForm";

const AskQuestionPage = () => {
  return (
    <div>
      <div className="mt-2">
        <div>
          <button type="button" className="ml-3 button ">
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              Back
            </Link>
          </button>
        </div>
        <label className="title_question">
          <i className="fas fa-question-circle"></i>
          Ask a Question
        </label>
        <QuestionForm />
      </div>
    </div>
  );
};

export default AskQuestionPage;
