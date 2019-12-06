import React, { useState, useEffect } from "react";
import AxiosWithAuth from "../utils/axiosWithAuth";

const RenderActions = props => {
  const [projectDetails, setProjectDetails] = useState([]);

  useEffect(() => {
    AxiosWithAuth()
      .get(`/api/projects/${props.match.params.id}/actions`)
      .then(response => {
        console.log(response.data);
        setProjectDetails(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="projectContainer">
      {projectDetails.map(details => (
        <div className="project" key={details.id}>
          <h3>{details.description}</h3>
          <p>{details.notes}</p>
        </div>
      ))}
    </div>
  );
};

export default RenderActions;
