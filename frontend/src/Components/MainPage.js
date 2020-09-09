import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Page.css";
import MainPageHeader from "./MainPageHeader";
import SelectedQs from "./SelectedQs";
import Loader from "./Loader";
import Pagination from "react-js-pagination";

const MainPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQsPage, setCurrentQsPage] = useState(1);
  const [questionsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  const [specificModule, setSpecificModule] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [noAnswer, setNoAnswer] = useState("");
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://status200.herokuapp.com/questions")
      .then((response) => {
        setQuestions(response.data.questions);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const indexOfLastQs = currentQsPage * questionsPerPage;
  const indexOfFirstQs = indexOfLastQs - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQs, indexOfLastQs);

  const paginate = (pageNumber) => {
    setCurrentQsPage(pageNumber);
  };

  return (
    <div>
      <MainPageHeader
        value={searchValue}
        handleSearchValue={(newSearchValue) => setSearchValue(newSearchValue)}
        setNoAnswer={setNoAnswer}
        setSpecificModule={setSpecificModule}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container">
          <div
            className="container text  my-auto"
            style={{ color: "rgb(150, 158, 231)" }}
          >
            {questions.length} Questions
          </div>

          <SelectedQs
            specificModule={specificModule}
            searchValue={searchValue}
            noAnswer={noAnswer}
            currentQuestions={currentQuestions}
          />

          <div className="pagination">
            <Pagination
              prevPageText="prev"
              nextPageText="next"
              activePage={currentQsPage}
              itemsCountPerPage={questionsPerPage}
              totalItemsCount={questions.length}
              pageRangeDisplayed={3}
              onChange={paginate}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;
