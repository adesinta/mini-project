import { BrowserRouter, Route, Routes } from "react-router-dom";

import LandingPage from "./pages/landingpage/LandingPage";

const App = () => {
  return (
    <div className="w-full h-screen overflow-x-hidden ">
      <BrowserRouter>
        <Routes>
          <Route element={<LandingPage />} path="/" />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
