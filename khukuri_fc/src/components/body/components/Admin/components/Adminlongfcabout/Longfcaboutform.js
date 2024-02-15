import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import ErrorModal from "../../../../UIElements/ErrorModal";
import LoadingSpinner from "../../../../UIElements/LoadingSpinner";

import { useHttpClient } from "../../../../hooks/http-hook";

const Longfcaboutform = () => {
  const navigate = useNavigate();

  const [enteredLongfcTitle, setEnteredLongfcTitle] = useState("");
  const [enteredLongfcDescp, setEnteredLongfcDescp] = useState("");
  const [enteredLongfcImage, setEnteredLongfcImage] = useState("");

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const longfctitlechangehandler = (event) => {
    setEnteredLongfcTitle(event.target.value);
  };

  const longfcdescpchangehandler = (event) => {
    setEnteredLongfcDescp(event.target.value);
  };

  const longfcimagechangehandler = (event) => {
    // setEnteredLongfcImage(event.target.value);
    const selectedFile = event.target.files[0];
    setEnteredLongfcImage(selectedFile);
  };

  const longfcformhandler = async (event) => {
    event.preventDefault();

    // const longfcaboutinfo = {
    //     aboutfclongtitle: enteredLongfcTitle,
    //     aboutfclong: enteredLongfcDescp,
    //     aboutfclongimg: enteredLongfcImage
    // };

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("aboutfclongtitle", enteredLongfcTitle);
      formData.append("aboutfclong", enteredLongfcDescp);
      formData.append("aboutfclongimg", enteredLongfcImage);
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/admin/longfcaboutform",
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
      
      // console.log(responseData);
      navigate("/admin/longfcabouttable");
    } catch (err) {
      console.log(err);
      // setError(err.message || "Something went wrong, please try again!");
    }

    setEnteredLongfcTitle("");
    setEnteredLongfcDescp("");
    setEnteredLongfcImage("");
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
              About FC Section in About Page
            </h6>
          </div>
          <div className="card-body">
            <form onSubmit={longfcformhandler} encType="multipart/form-data">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Title For The About Khukuri FC
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="shortabout"
                  aria-describedby="emailHelp"
                  value={enteredLongfcTitle}
                  onChange={longfctitlechangehandler}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Long Description
                </label>
                <textarea
                  className="form-control"
                  id="shortdescp"
                  rows="2"
                  value={enteredLongfcDescp}
                  onChange={longfcdescpchangehandler}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Image for the Khukuri FC
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  accept=".jpg,.png,.jpeg"
                  // value={enteredLongfcImage}
                  onChange={longfcimagechangehandler}
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

export default Longfcaboutform;
