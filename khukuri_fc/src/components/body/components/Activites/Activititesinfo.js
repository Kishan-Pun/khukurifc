import React from "react";
import Activities from "./Activities";

const Activitiesinfo = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No Activities Yet</h2>
      </div>
    );
  }

  return (
    <div>
      <div
        className="container-fluid bg-primary py-5 bg-header"
        style={{ marginBottom: "90px" }}
      >
        <div className="row py-5">
          <div className="col-12 pt-lg-5 mt-lg-5 text-center">
            <h1 className="display-4 text-white animated zoomIn">
              Activites Of The Club
            </h1>
          </div>
        </div>
      </div>
      <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container py-5">
          <div
            className="section-title text-center position-relative pb-3 mb-5 mx-auto"
            style={{ maxWidth: "600px" }}
          >
            <h5 className="fw-bold text-primary text-uppercase">
              Activities From Our Club
            </h5>
            <h1 className="mb-0">Read The Activities done by Our Club</h1>
          </div>
          <div className="row g-5">
            {props.items.map((activities) => (
              <Activities
                key={activities.id}
                img={activities.img}
                vid={activities.vid}
                date={activities.date}
                title={activities.title}
                newsdetail={activities.detail}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activitiesinfo;
