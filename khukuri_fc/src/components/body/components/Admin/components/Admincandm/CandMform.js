import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import ErrorModal from "../../../../UIElements/ErrorModal";
import LoadingSpinner from "../../../../UIElements/LoadingSpinner";

import { useHttpClient } from "../../../../hooks/http-hook";

const CandMform = () => {
  const navigate = useNavigate();

  const [enteredName, setEnteredName] = useState("");
  const [enteredPosition, setEnteredPosition] = useState("");
  const [enteredFblink, setEnteredFblink] = useState("");
  const [enteredInstalink, setEnteredInstalink] = useState("");
  const [enteredPersonImg, setEnteredPersonImg] = useState("");

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const namechangehandler = (event) => {
    setEnteredName(event.target.value);
  };

  const positionchangehandler = (event) => {
    setEnteredPosition(event.target.value);
  };

  const fblinkchangehandler = (event) => {
    setEnteredFblink(event.target.value);
  };

  const instalinkchangehandler = (event) => {
    setEnteredInstalink(event.target.value);
  };

  const personimgchangehandler = (event) => {
    // setEnteredPersonImg(event.target.value);
    const selectedFile = event.target.files[0];
    setEnteredPersonImg(selectedFile);
  };

  const personformhandler = async (event) => {
    event.preventDefault();

    // const personforminfo = {
    //   CandMname: enteredName,
    //   CandMposition: enteredPosition,
    //   CandMfblink: enteredFblink,
    //   CandMinstalink: enteredInstalink,
    //   CandMimg: enteredPersonImg,
    // };

    // console.log(personforminfo);

    try {
      const token = localStorage.getItem("token");
  
      const formData = new FormData();
      formData.append("CandMname", enteredName);
      formData.append("CandMposition", enteredPosition);
      formData.append("CandMfblink", enteredFblink);
      formData.append("CandMinstalink", enteredInstalink);
      formData.append("CandMimg", enteredPersonImg);
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/admin/candmform",
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


      navigate("/admin/candmtable");
    } catch (err) {
      console.log(err);
    }

    setEnteredName("");
    setEnteredPosition("");
    setEnteredFblink("");
    setEnteredInstalink("");
    setEnteredPersonImg("");
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
              Add Coach/Manager
            </h6>
          </div>
          <div className="card-body">
            <form onSubmit={personformhandler} encType="multipart/form-data">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Person Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="personname"
                  aria-describedby="emailHelp"
                  value={enteredName}
                  onChange={namechangehandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Person Position (Coach or Manger or etc)
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="personpostion"
                  aria-describedby="emailHelp"
                  value={enteredPosition}
                  onChange={positionchangehandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Person Facebook Link
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="personfb"
                  aria-describedby="emailHelp"
                  value={enteredFblink}
                  onChange={fblinkchangehandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Person Insta Link
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="personinsta"
                  aria-describedby="emailHelp"
                  value={enteredInstalink}
                  onChange={instalinkchangehandler}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Image Of The Person
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  accept=".jpg,.png,.jpeg"
                  // value={enteredPersonImg}
                  onChange={personimgchangehandler}
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

export default CandMform;
