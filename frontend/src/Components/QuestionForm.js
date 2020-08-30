import React, { useState } from "react";
import SubmitButton from "./SubmitButton";
import "bootstrap/dist/css/bootstrap.css";
import axios from "axios";
import ReactQuill, { Quill } from 'react-quill';
import "react-quill/dist/quill.snow.css";



const QuestionForm = () => {
  const [newQuestion, setNewQuestion] = useState({
    userEmail: "",
    title: "",
    question: "",
    category: "",
  });

 const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'code-block'],
      ['clean']
    ],
  }

 const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'code-block'
  ]

  

  const addNewQuestion = (event) => {
    event.preventDefault();
    event.target.reset();
    axios
      .post("https://queueanda.herokuapp.com/questions/ask", newQuestion)
      .then((response) => {
        console.log(response);
      });
    window.location.assign("/");
  };

  const handleUserEmail = (event) => {
    setNewQuestion({ ...newQuestion, userEmail: event.target.value });
  };
  const handleTitle = (event) => {
    setNewQuestion({ ...newQuestion, title: event.target.value });
  };

  // const handleQuestion = (event) => {
  //   setNewQuestion({ ...newQuestion, question: event.target.value });
    
  // };
  const handleCategory = (event) => {
    setNewQuestion({ ...newQuestion, category: event.target.value });
    
  };

  const handleChange = (content, delta, source, editor) => {
    console.log(editor.getHTML()); // HTML/rich text
    let range = editor.getContents(); // plain text
    console.log(editor.getSelection());
     
     
    setNewQuestion({ ...newQuestion, question: editor.getHTML() });
  }

  console.log(newQuestion);
  

  
  return (
    <div>
      <div className="container form_style">
        <form className="m-5" onSubmit={addNewQuestion}>
          <div className="form-group">
            <label htmlFor="Email" className="h4 mt-1 p-2">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="Email"
              placeholder="name@example.com"
              onChange={(event) => handleUserEmail(event)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category" className="h4 p-2">
              Category
            </label>
            <select
              className="form-control"
              id="category"
              onChange={(event) => handleCategory(event)}
            >
              <option value={"Html"}>Html</option>
              <option value={"Css"}>Css</option>
              <option value={"Javascript"}>Javascript</option>
              <option value={"React"}>React</option>
              <option value={"Node"}>Node</option>
              <option value={"Express"}>Express</option>
              <option value={"MongoDB"}>MongoDB</option>
              <option value={"other"}>other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="Name" className="h4 p-2">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="Name"
              onChange={(event) => handleTitle(event)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="textArea" className="h4 p-2">
              Question
            </label>
            {/* <textarea
              className="form-control"
              id="TextArea"
              rows="3"
              onChange={(event) => handleQuestion(event)}>
              </textarea> */}
          </div>
          <ReactQuill theme="snow"
                    modules={modules}
                    formats={formats}
                    placeholder={"Start Asking Something"}
                    onChange={handleChange}
                    value={newQuestion.question}
                    
                   / >
        
          <div className="pb-3">
          
            <SubmitButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;
