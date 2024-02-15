import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
// import axios from "axios";

import ErrorModal from "../../../../UIElements/ErrorModal";
import LoadingSpinner from "../../../../UIElements/LoadingSpinner";

import { useHttpClient } from "../../../../hooks/http-hook";

const Activitesvideoform = () => {
  const navigate = useNavigate();

  const [enteredActivitiesTitle, setEnteredActivitiesTitle] = useState("");
  const [enteredDate, setEnteredDate] = useState("");
  const [enteredActivitiesDescp, setEnteredActivitiesDescp] = useState("");
  const [enteredActivitiesVideo, setEnteredActivitiesVideo] = useState([]);

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

  const activitiesvideochangehandler = (event) => {
    const selectedVideo = event.target.files;
    setEnteredActivitiesVideo(selectedVideo);
  };

  const activitieschangehandler = async (event) => {
    event.preventDefault();

    // const newsforminfo = {
    //     video: enteredActivitiesVideo,
    //     title: enteredActivitiesTitle,
    //     detail: enteredActivitiesDescp,
    //     date: enteredDate,
    // }

    // // navigate("/admin/activitiestable");
    // console.log(newsforminfo);

    // try {
    //   const token = localStorage.getItem("token");
    //   let formData = new FormData();
    //   for (let key in enteredActivitiesVideo) {
    //     formData.append("video", enteredActivitiesVideo[key]);
    //   }
    //   formData.append("title", enteredActivitiesTitle);
    //   formData.append("detail", enteredActivitiesDescp);
    //   formData.append("date", enteredDate);
    // //   formData.append("video", enteredActivitiesVideo);

    //   await sendRequest(
    //     process.env.REACT_APP_BACKEND_URL + "/admin/activitiesvideoform",
    //     "POST",
    //     formData,
    //     {
    //       Authorization: `Bearer ${token}`,
    //     }
    //   );

    //   if (formData.token) {
    //     localStorage.setItem("token", formData.token);
    //   }

    //   navigate("/admin/activitiestable");
    //   setEnteredActivitiesTitle("");
    //   setEnteredActivitiesDescp("");
    //   setEnteredDate("");
    //   setEnteredActivitiesVideo("");
    // } catch (err) {
    //   console.log(err);
    // }

    const token = localStorage.getItem("token");
    const submitForm = async (
        enteredActivitiesVideo,
        enteredActivitiesTitle,
        enteredActivitiesDescp,
        enteredDate
      ) => {
        const formData = new FormData();
        formData.append("title", enteredActivitiesTitle);
        formData.append("detail", enteredActivitiesDescp);
        formData.append("date", enteredDate);
        formData.append("video", enteredActivitiesVideo[0]);

    
      try {
        const response = await await sendRequest(
            `${process.env.REACT_APP_BACKEND_URL}/admin/activitiesvideoform`,
                "POST",
                formData,
                {
                  Authorization: `Bearer ${token}`,
                }
              );
          

        
        if (!response.ok) {
            throw new Error("Failed to upload video");
        }
        
        // Handle successful submission as needed
        console.log("Video uploaded successfully!");
    
        // Clear form fields after successful submission
        // setEnteredActivitiesTitle("");
        // setEnteredActivitiesDescp("");
        // setEnteredDate("");
        // setEnteredActivitiesVideo(null); // Reset the video input
    
        // Redirect or perform any other action upon successful submission
        // navigate("/admin/activitiestable");
      } catch (error) {
        // Handle error
        console.error("Error uploading video:", error);
      }
    };
    
    // Usage example:
    // Assuming you have values for enteredActivitiesVideo, enteredActivitiesTitle, enteredActivitiesDescp, enteredDate
    submitForm(enteredActivitiesVideo, enteredActivitiesTitle, enteredActivitiesDescp, enteredDate);
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
            <form
              onSubmit={activitieschangehandler}
              encType="multipart/form-data"
            >
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
                <label htmlFor="formVideo" className="form-label">
                  Video for the Activities
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formVideo"
                  accept=".mp4,.avi,.mov,.mpeg,.mkv"
                  onChange={activitiesvideochangehandler}
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

export default Activitesvideoform;
