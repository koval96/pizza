import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Footer from "./components/structure/Footer";

import Navbar from "./components/structure/Navbar";
import ScrollToTop from "./utils/ScrollToTop";
import ProtectedRoute from "./utils/ProtectedRoute";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Profile from "./components/pages/Profile";
import Register from "./components/pages/Register";
import Cart from "./components/pages/Cart";
import EditPizza from "./components/pages/EditPizza";
import OrderTicket from "./components/delivery/OrderTicket";

import "./static/css/structure.css";

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
              <Route path="/cart">
                <Cart />
              </Route>
              <Route path="/edit/:id">
                <EditPizza />
              </Route>
              <ProtectedRoute path="/profile">
                <Profile />
              </ProtectedRoute>
              <ProtectedRoute path="/admin/order/:id">
                <OrderTicket />
              </ProtectedRoute>
            </Switch>
          </div>
          <Footer />
        </main>
      </GlobalContext.Provider>
    </Router>
  );
}

export default App;
