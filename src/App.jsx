import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/landing-page/LandingPage";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import Products from "./pages/products/Products";
import Dashboard from "./pages/dashboard-admin/Dashboard";
import ProductsTable from "./pages/dashboard-admin/ProductsTable";
import DetailProducts from "./pages/products/DetailProducts";

const App = () => {
  return (
    <div className="w-full h-screen overflow-x-hidden ">
      <BrowserRouter>
        <Routes>
          <Route element={<LandingPage />} path="/" />
          <Route element={<Products/>} path="/products" />
          <Route element={<SignIn />} path="/sign-in" />
          <Route element={<SignUp />} path="/sign-up" />
          <Route element={<Dashboard />} path="/dashboard-admin" />
          <Route element={<ProductsTable />} path="/products-table" />
          <Route element={<DetailProducts />} path="/details/:id" />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
