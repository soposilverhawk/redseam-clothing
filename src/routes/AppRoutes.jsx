import React from "react";
import { Routes, Route } from "react-router-dom";
import ROUTES from "./Routes";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import ProductPage from "../pages/productPage/ProductPage";
import Checkout from "../pages/checkout/Checkout";

function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Home />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.REGISTER} element={<Register />} />
      <Route path={ROUTES.PRODUCTPAGE} element={<ProductPage />} />
      <Route path={ROUTES.CHECKOUT} element={<Checkout />} />
    </Routes>
  );
}

export default AppRoutes;
