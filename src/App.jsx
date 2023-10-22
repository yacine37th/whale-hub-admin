import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./home/Home";
import NormalPackUsers from "./home/NormalPackUsers";
import GoldenPackUsers from "./home/GoldenPackUsers";
import DiamandPackUsers from "./home/DiamandPackUsers";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/normalPackUsers" element={<NormalPackUsers />} />
        <Route path="/goldenPackUsers" element={<GoldenPackUsers />} />
        <Route path="/diamandPackUsers" element={<DiamandPackUsers />} />
      </Routes>
    </>
  );
}

export default App;
