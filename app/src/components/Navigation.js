import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div>
      <div className="navigation">
        <div>
          <Link to="/">Projects</Link>
        </div>
        <div>
          <Link to="/actions">Actions</Link>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
