import React, { useState, useEffect } from "react";
import AxiosWithAuth from "../utils/axiosWithAuth";

const RenderActions = () => {
  const [actionData, setActionData] = useState([]);

  useEffect(() => {
    AxiosWithAuth()
      .get("/api/actions/")
      .then(response => {
        console.log(response);
        setActionData(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="projectContainer">
      {actionData.map(action => (
        <div className="project" key={action.id}>
          <h3>{action.description}</h3>
          <p>{action.notes}</p>
        </div>
      ))}
    </div>
  );
};

export default RenderActions;
