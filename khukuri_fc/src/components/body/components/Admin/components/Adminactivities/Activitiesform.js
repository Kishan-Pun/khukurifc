import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import ErrorModal from "../../../../UIElements/ErrorModal";
import LoadingSpinner from "../../../../UIElements/LoadingSpinner";

import { useHttpClient } from "../../../../hooks/http-hook";

const Activitesform = () => {
  const navigate = useNavigate();

  const [enteredActivitiesTitle, setEnteredActivitiesTitle] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredActivitiesDescp, setEnteredActivitiesDescp] = useState("");
  const [enteredActivitiesImg, setEnteredActivitiesImg] = useState("");

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const activitiestitlechangehandler = (event) => {
    setEnteredActivitiesTitle(event.target.value);
  };

  const datechangehandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const activitiesdescpchangehandler = (event) => {
    setEnteredActivitiesDescp(event.target.value);
  };

  const acitvitesimagechangehandler = (event) => {
    const selectedFile = event.target.files[0];
    setEnteredActivitiesImg(selectedFile);
  };

  const activitieschangehandler = async (event) => {
    event.preventDefault();

    // const newsforminfo = {
    //     img: enteredActivitiesImg,
    //     title: enteredActivitiesTitle,
    //     detail: enteredActivitiesDescp,
    //     date: enteredDate,
    // }

    // navigate("/admin/activitiestable");
    // console.log(newsforminfo);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", enteredActivitiesTitle);
      formData.append("detail", enteredActivitiesDescp);
      formData.append("date", enteredDate);
      formData.append("img", enteredActivitiesImg);
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/admin/activitiesform",
        "POST",
        formData,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (formData.token) {
        localStorage.setItem("token", formData.token); 
      }

      navigate("/admin/activitiestable");
      setEnteredActivitiesTitle("");
      setEnteredActivitiesDescp("");
      setEnteredDate("");
      setEnteredActivitiesImg("");
    } catch (err) {
      console.log(err);
    }
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
              Activites Done
            </h6>
          </div>
          <div className="card-body">
            <form onSubmit={activitieschangehandler} encType="multipart/form-data">
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Title of The Activity
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="shortabout"
                  aria-describedby="emailHelp"
                  value={enteredActivitiesTitle}
                  onChange={activitiestitlechangehandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Activity Happened on Date
                </label>
                <input
                  type="text"
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
                  Short Description of the Activity (2 line)
                </label>
                <textarea
                  className="form-control"
                  id="shortdescp"
                  rows="2"
                  value={enteredActivitiesDescp}
                  onChange={activitiesdescpchangehandler}
                ></textarea>
              </div>

              <div className="mb-3">
                <label htmlFor="formFile" className="form-label">
                  Image for the Activites
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  accept=".jpg,.png,.jpeg"
                  // value={enteredNewsImg}
                  onChange={acitvitesimagechangehandler}
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

export default Activitesform;
