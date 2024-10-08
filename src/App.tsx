import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import WorkingHours from "./WorkingHours/WorkingHours";
import CatViewer from "./CatViewer/CatViewer";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
          }}
        >
          <ul>
            <li>
              <Link to="/cat-viewer">CatViewer</Link>
            </li>
            <li>
              <Link to="/working-hour">WorkingHours</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/cat-viewer">
            <CatViewer />
          </Route>
          <Route path="/working-hour">
            <WorkingHours />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
