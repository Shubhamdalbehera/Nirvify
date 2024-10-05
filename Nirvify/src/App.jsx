import React, { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Sidebar from "./component/Sidebar";
import Home from "./component/Home";
import Admin from "./component/admin-component/Admin";

const App = () => {
  const location = useLocation();

  // State for handling login status
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  // Check if the current page is for authentication or admin
  const isAuthenticationPage =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/signup") ||
    location.pathname.startsWith("/admin");

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signup"
          element={<Signup setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/admin/*" element={<Admin />} />

        {!isAuthenticationPage && (
          <Route
            path="*"
            element={
              <div className="h-screen bg-black flex ">
                <Sidebar isLoggedIn={isLoggedIn} />
                <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              </div>
            }
          />
        )}
      </Routes>
    </>
  );
};

export default App;
