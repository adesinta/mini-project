import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { DarkModeProvider } from "./features/Darkmode";

import LandingPage from "./pages/landing-page/LandingPage";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import Products from "./pages/products/Products";
import Dashboard from "./pages/dashboard-admin/Dashboard";
import ProductsTable from "./pages/dashboard-admin/ProductsTable";
import DetailProducts from "./pages/products/DetailProducts";
import Cart from "./pages/products/Cart";

const App = () => {
  return (
    <div className="w-full h-screen overflow-x-hidden">
        <DarkModeProvider>
        <BrowserRouter>
            <Routes>
              <Route element={<LandingPage />} path="/" />
              <Route element={<Products />} path="/products" />
              <Route element={<SignIn />} path="/sign-in" />
              <Route element={<SignUp />} path="/sign-up" />
              <Route element={<Dashboard />} path="/dashboard-admin" />
              <Route element={<ProductsTable />} path="/products-table" />
              <Route element={<DetailProducts />} path="/details/:id" />
              <Route element={<Cart />} path="/cart" />
            </Routes>
        </BrowserRouter>
    </DarkModeProvider>
      </div>
  );
};

export default App;
