import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import ErrorModal from "../../../../UIElements/ErrorModal";
import LoadingSpinner from "../../../../UIElements/LoadingSpinner";

import { useHttpClient } from "../../../../hooks/http-hook";

const Longteamaboutform = () => {
  const navigate = useNavigate();

  const [enteredLongteamTitle, setEnteredLongteamTitle] = useState("");
  const [enteredLongteamDescp, setEnteredLongteamDescp] = useState("");
  const [enteredLongteamImage, setEnteredLongteamImage] = useState("");

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const longteamtitilechangehandler = (event) => {
    setEnteredLongteamTitle(event.target.value);
  };

  const longteamdescpchangehandler = (event) => {
    setEnteredLongteamDescp(event.target.value);
  };

  const longteamimagechangehandler = (event) => {
    // setEnteredLongteamImage(event.target.value);
    const selectedFile = event.target.files[0];
    setEnteredLongteamImage(selectedFile);
  };

  const longteamchangehandler = async (event) => {
    event.preventDefault();

    // const longteamaboutinfo = {
    //     aboutteamlongtitle: enteredLongteamTitle,
    //     aboutteamlong: enteredLongteamDescp,
    //     aboutteamlongimg: enteredLongteamImage
    // }

    // console.log(longteamaboutinfo);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("aboutteamlongtitle", enteredLongteamTitle);
      formData.append("aboutteamlong", enteredLongteamDescp);
      formData.append("aboutteamlongimg", enteredLongteamImage);
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/admin/longteamaboutform",
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
      navigate("/admin/longteamabouttable");
    } catch (err) {
      console.log(err);
      // setError(err.message || "Something went wrong, please try again!");
    }


    setEnteredLongteamTitle("");
    setEnteredLongteamDescp("");
    setEnteredLongteamImage("");
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
              About Team Section in About Page
            </h6>
          </div>
          <div className="card-body">
            <form onSubmit={longteamchangehandler} encType="multipart/form-data">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Title For The About Team
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="shortabout"
                  aria-describedby="emailHelp"
                  value={enteredLongteamTitle}
                  onChange={longteamtitilechangehandler}
                />
              </div>
              <div className="mb-3">
                <label
                  htmlFor="exampleFormControlTextarea1"
                  className="form-label"
                >
                  Long Description For Team
                </label>
                <textarea
                  className="form-control"
                  id="shortdescp"
                  rows="2"
                  value={enteredLongteamDescp}
                  onChange={longteamdescpchangehandler}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Image for the Team
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  accept=".jpg,.png,.jpeg"
                  // value={enteredLongteamImage}
                  onChange={longteamimagechangehandler}
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

export default Longteamaboutform;
