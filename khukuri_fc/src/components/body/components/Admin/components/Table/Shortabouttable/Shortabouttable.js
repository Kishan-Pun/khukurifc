import React from "react";

import ErrorModal from "../../../../../UIElements/ErrorModal";
import LoadingSpinner from "../../../../../UIElements/LoadingSpinner";

import { useHttpClient } from "../../../../../hooks/http-hook";

const Shortabouttable = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const deleteHandler = async () => {
    console.log("Deleting");

    try {
      const token = localStorage.getItem("token");
      // Define the data to be sent in the request body
      const data = {
        _id: props.id, // The ID of the data you want to delete
      };
      // Send a DELETE request with the data in the request body
      const responseData = await sendRequest(
        process.env.REACT_APP_BACKEND_URL + "/admin/shortabouttable",
        "DELETE",
        JSON.stringify(data), // Convert data to JSON string
        // null,
        {
          "Content-Type": "application/json", // Set the content type
          Authorization: `Bearer ${token}`,
        }
      );
      // console.log(props.id);
      console.log(responseData);
      if (responseData.token) {
        // If the response contains a token, store it for future requests
        localStorage.setItem("token", responseData.token); // Store the token in localStorage or your preferred storage mechanism
      }

      // After successfully deleting the data, you can update the UI or perform any other actions as required.
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
      {isLoading && <LoadingSpinner className="center" />}
      <tr>
        <td>{props.shorttitle}</td>
        <td>{props.shortabout}</td>
        <td style={{ textAlign: "center" }}>
          <img
            src={`${process.env.REACT_APP_IMAGES_URL}/${props.aboutimg}`}
            alt="aboutimg"
            style={{ height: "auto", width: "80px" }}
          />
        </td>
        <td>
          <button
            type="button"
            className="btn btn-danger"
            onClick={deleteHandler}
          >
            Delete
          </button>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default Shortabouttable;
