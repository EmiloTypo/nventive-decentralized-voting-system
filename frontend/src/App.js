import "./App.css";
import { Route, Routes } from "react-router-dom";
import Candidates from "./components/Candidates";
import Login from "./components/Login";
import Results from "./components/Results";
import Voted from "./components/Voted";
import Admin from "./components/Admin";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/candidates" element={<Candidates />} />
        <Route exact path="/results" element={<Results />} />
        <Route exact path="/voted" element={<Voted />} />
        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </>
  );
}

export default App;
