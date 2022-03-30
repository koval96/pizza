import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/structure/Navbar";
import ScrollToTop from "./utils/ScrollToTop";
import ProtectedRoute from "./utils/ProtectedRoute";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import Register from "./components/pages/Register";
import Cart from "./components/pages/Cart";

import "./static/css/structure.css";
import AdminPanel from "./components/pages/AdminPanel";
import Order from "./components/pages/Order";

export const GlobalContext = React.createContext();

function App() {
  const [ordersCount, setOrdersCount] = useState(0);
  useEffect(() => {
    const checkOrders = () => {
      const orders = localStorage.getItem("cart");
      console.log(1);
    };

    window.addEventListener("storage", checkOrders);

    return () => {
      window.removeEventListener("storage", checkOrders);
    };
  }, []);
  return (
    <Router>
      <GlobalContext.Provider value={{ ordersCount, setOrdersCount }}>
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
              <Route path="/adminpan">
                <AdminPanel />
              </Route>
              <Route path="/order/:id">
                <Order />
              </Route>
              <Route path="/cart">
                <Cart />
              </Route>
              <ProtectedRoute path="/profile">
                <Profile />
              </ProtectedRoute>
            </Switch>
          </div>
        </main>
      </GlobalContext.Provider>
    </Router>
  );
}

export default App;
