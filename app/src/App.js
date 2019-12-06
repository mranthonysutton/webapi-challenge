import React from "react";
import { Route } from "react-router-dom";
import "./App.css";
import RenderProjects from "./components/RenderProjects";
import RenderActions from "./components/RenderActions";
import RenderProjectDetails from "./components/RenderProjectDetails";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Route exact path="/" component={RenderProjects} />
      <Route exact path="/actions" component={RenderActions} />
      <Route path="/:id/actions" component={RenderProjectDetails} />
    </div>
  );
}

export default App;
