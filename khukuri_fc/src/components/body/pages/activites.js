import React, { useState, useEffect } from "react";
// import Player from './components/Player/Player';
// import Playerinfo from "../components/Player/Playerinfo";
// import playerimg1 from "../../../imgdemo/kishan.jpg";
// import playerimg2 from "../../../imgdemo/dipesh.jpg";
// import playerimg3 from "../../../imgdemo/sujan.jpg";

// import img from "../../../imgdemo/charity game held for ajay shrestha.jpg";
// import demovideo from "../../../imgdemo/DJI_0059.MP4";

import LoadingSpinner from "../UIElements/LoadingSpinner";
import ErrorModal from "../UIElements/ErrorModal";
import Activitiesinfo from "../components/Activites/Activititesinfo";

import { useHttpClient } from "../hooks/http-hook";

// const Activites = [
//   {
//     aid: "n1",
//     img: img,
//     title: "charity game held for ajay shrestha",
//     detail: "charity game held for ajay shrestha",
//     date: "01-01-2001",
//   },
//   {
//     aid: "n2",
//     vid: demovideo,
//     title: "just for fun",
//     detail: "just for fun",
//     date: "01 Jan, 2046",
//   },
// ];

const Activities = () => {
  const [loadedActivities, setLoadedActivities] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/khukurifc/activities"
        );

        setLoadedActivities(responseData.activities);
      } catch (err) {}
    };
    fetchData();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal
        error={error}
        onClear={clearError}
        style={{ height: "200px" }}
      />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      <div>
        {/* {!isLoading && loadedPlayer && <Playerinfo items={loadedPlayer} />}
        {!isLoading && loadedCandM && <CandMinfo items={loadedCandM} />} */}
        {!isLoading && loadedActivities && <Activitiesinfo items={loadedActivities} />} 
        
      </div>
    </React.Fragment>
  );
};

export default Activities;
