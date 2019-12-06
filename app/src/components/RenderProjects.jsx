import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AxiosWithAuth from "../utils/axiosWithAuth";

const RenderProjects = () => {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    AxiosWithAuth()
      .get("/api/projects")
      .then(response => {
        setProjectData(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="projectContainer">
      {projectData.map(project => (
        <div className="project" key={project.id}>
          <h3>
            <Link to={`/${project.id}/actions`}>{project.name}</Link>
          </h3>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
};

export default RenderProjects;
