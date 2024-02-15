import React, {useState, useEffect} from 'react';
import Activitestableinfo from '../../components/Table/Activitiestable/Activitiestableinfo';

// import img from "../../../../../../imgdemo/charity game held for ajay shrestha.jpg";
// import demovideo from "../../../../../../imgdemo/DJI_0059.MP4";

import LoadingSpinner from "../../../../UIElements/LoadingSpinner";
import ErrorModal from "../../../../UIElements/ErrorModal";

import { useHttpClient } from "../../../../hooks/http-hook";

// const Activites = [
//     {
//       aid: "n1",
//       img: img,
//       title: "charity game held for ajay shrestha",
//       detail: "charity game held for ajay shrestha",
//       date: "01-01-2001",
//     },
//     {
//       aid: "n2",
//       vid: demovideo,
//       title: "just for fun",
//       detail: "just for fun",
//       date: "01 Jan, 2046",
//     },
//   ];



const Newstable = () => {
  const [loadedActivities, setLoadedActivities] = useState();

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL +  "/admin/activitiestable"
        );

        setLoadedActivities(responseData.activities);
        // setLoadedNews(responseData.news);
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
        {/* {!isLoading && loadedNews && (
          <Newstableinfo items={loadedNews} />
        )} */}
        {!isLoading && loadedActivities && (
          <Activitestableinfo items={loadedActivities} />
        )}
        
        </div>
        </React.Fragment>
    )
};

export default Newstable;