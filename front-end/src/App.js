// import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/homepage";
import Dashboard from "./components/Dashboard";
import Login from "./components/login";
import Signup from "./components/signup";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
