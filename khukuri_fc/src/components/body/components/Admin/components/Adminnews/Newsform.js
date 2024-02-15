import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import ErrorModal from "../../../../UIElements/ErrorModal";
import LoadingSpinner from "../../../../UIElements/LoadingSpinner";

import { useHttpClient } from "../../../../hooks/http-hook";

const Newsform = () => {
  const navigate = useNavigate();

  const [enteredNewsTitle, setEnteredNewsTitle] = useState("");
  const [enteredPublisher, setEnteredPublisher] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredNewsDescp, setEnteredNewsDescp] = useState("");
  const [enteredNewsImg, setEnteredNewsImg] = useState("");

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const newstitlechangehandler = (event) => {
    setEnteredNewsTitle(event.target.value);
  };

  const publisherchangehandler = (event) => {
    setEnteredPublisher(event.target.value);
  };

  const datechangehandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const newsdescpchangehandler = (event) => {
    setEnteredNewsDescp(event.target.value);
  };

  const newsimagechangehandler = (event) => {
    // setEnteredNewsImg(event.target.value);
    const selectedFile = event.target.files[0];
    setEnteredNewsImg(selectedFile);
  };

  const newschangehandler = async (event) => {
    event.preventDefault();

    // const newsforminfo = {
    //     img: enteredNewsImg,
    //     title: enteredNewsTitle,
    //     newsdetail: enteredNewsDescp,
    //     publisher: enteredPublisher,
    //     date: enteredDate
    // }

    // console.log(newsforminfo);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("img", enteredNewsImg);
      formData.append("title", enteredNewsTitle);
      formData.append("newsdetail", enteredNewsDescp);
      formData.append("publisher", enteredPublisher);
      formData.append("date", enteredDate);
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/admin/newsform",
        "POST",
        formData,
        {
          Authorization: `Bearer ${token}`
        }
      );

      if (formData.token) {
        // If the response contains a token, store it for future requests
        localStorage.setItem("token", formData.token); // Store the token in localStorage or your preferred storage mechanism
      }
      
      navigate("/admin/newstable");
    } catch (err) {
      console.log(err);
    }


    setEnteredNewsTitle("");
    setEnteredNewsDescp("");
    setEnteredDate("");
    setEnteredPublisher("");
    setEnteredNewsImg("");
  };

  return (
    <React.Fragment>
      <ErrorModal
        error={error}
        onClear={clearError}
        style={{ height: "200px" }}
      />
      <div>
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            {isLoading && <LoadingSpinner asOverlay />}
            <h6 className="m-0 font-weight-bold text-primary">
              News Form For Latest News
            </h6>
          </div>
          <div className="card-body">
            <form onSubmit={newschangehandler} encType="multipart/form-data">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Title of The News
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="shortabout"
                  aria-describedby="emailHelp"
                  value={enteredNewsTitle}
                  onChange={newstitlechangehandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Published By
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="shortabout"
                  aria-describedby="emailHelp"
                  value={enteredPublisher}
                  onChange={publisherchangehandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Event Happened on Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="shortabout"
                  aria-describedby="emailHelp"
                  value={enteredDate}
                  onChange={datechangehandler}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Short Description of News (2 line)
                </label>
                <textarea
                  className="form-control"
                  id="shortdescp"
                  rows="2"
                  value={enteredNewsDescp}
                  onChange={newsdescpchangehandler}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Image for the News
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  accept=".jpg,.png,.jpeg"
                  // value={enteredNewsImg}
                  onChange={newsimagechangehandler}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Newsform;
