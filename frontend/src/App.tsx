import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Main from "./pages/Main";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Main />
              </RequireAuth>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
