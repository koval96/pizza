import Navbar from "./components/structure/Navbar";
import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import ScrollToTop from "./utils/ScrollToTop";
import Home from "./components/pages/Home";

import "./static/css/structure.css";

function App() {
  return (
    <Router>
      <main>
        <Navbar />
        <ScrollToTop />
        <div className="main__content">
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
          </Switch>
        </div>
      </main>
    </Router>
  );
}

export default App;
