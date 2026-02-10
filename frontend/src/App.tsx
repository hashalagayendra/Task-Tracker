import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* <Route path="/about" element={<About />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
