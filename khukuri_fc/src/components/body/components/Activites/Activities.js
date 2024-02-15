import React from "react";

import "./Activities.css";
const Activities = (props) => {
  const isImage = props.img && !props.vid;
  const isVideo = props.vid;
  return (
    <div className="col-lg-4 wow slideInUp" data-wow-delay="0.5s">
      <div
        className="blog-item bg-light rounded overflow-hidden"
        style={{ height: "550px" }}
      >
        <div
          className="blog-img position-relative px-4"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <img
            className="img-fluid"
            src={`${process.env.REACT_APP_IMAGES_URL}/${props.img}`}
            alt="newsimg"
            style={{ height: "250px", width: "200px" }}
          /> */}
          {isImage && (
            <img
              className="img-fluid"
              src={`${process.env.REACT_APP_IMAGES_URL}/${props.img}`}
            //   src={props.img}
              alt="newsimg"
              style={{ height: "250px", width: "200px" }}
            />
          )}
          {isVideo && (
            <video
              className="img-fluid"
              controls
              style={{ height: "300px", width: "250" }}
            >
              <source
                // src={props.vid}
                src={`${process.env.REACT_APP_VIDEOS_URL}/${props.vid}`}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
        <div className="p-4">
          <div className="d-flex mb-3">
            <small>
              <i className="far fa-calendar-alt text-primary me-2"></i>
              {props.date}
            </small>
          </div>
          <h4 className="mb-3">{props.title}</h4>
          <p>{props.detail}</p>
        </div>
      </div>
    </div>
  );
};

export default Activities;
