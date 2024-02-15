import React from "react";
import Activitestable from "./Activitiestable";

const Activitestableinfo = (props) => {
  return (
    <div>
      <div className="container-fluid bg-primary py-3 bg-header d-none d-sm-block d-md-block">
        <div className="row py-5"></div>
      </div>
      <div className="container-fluid mt-3">
        <h1 className="h3 mb-2 text-gray-800">Tables</h1>

        {/* <!-- DataTales Example --> */}
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">News Table</h6>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                id="dataTable"
                width="100%"
                cellSpacing="0"
              >
                <thead>
                  <tr>
                    <th>Activity Title</th>
                    <th>Activity Description</th>
                    <th>Activity Date</th>
                    <th>Activity Image/Video</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {props.items.map((activities) => (
                    <Activitestable 
                      key={activities.id}
                      id={activities.id}
                      img={activities.img}
                      vid={activities.vid}
                      date={activities.date}
                      title={activities.title}
                      detail={activities.detail}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {props.items.length === 0 && (
        <div style={{ textAlign: "center" }}>
          <h1>No data found</h1>
        </div>
      )}
    </div>
  );
};

export default Activitestableinfo;
