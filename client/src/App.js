import Navbar from "./components/structure/Navbar";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import ScrollToTop from "./utils/ScrollToTop";
import ProtectedRoute from "./utils/ProtectedRoute";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import Register from "./components/pages/Register";
import Loader from "./utils/Loader"

import "./static/css/structure.css";

function App() {
  return (
    <Router>
      <Toaster
        toastOptions={{
          className: "customToast",
        }}
      />
      <main>
        <Navbar />
        <ScrollToTop />
        <div className="main__content">
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <ProtectedRoute path="/profile">
              <Profile />
            </ProtectedRoute>
          </Switch>
        </div>
      </main>
    </Router>
  );
}

export default App;
