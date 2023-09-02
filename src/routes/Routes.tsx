import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login.tsx";
import Dashboard from "../pages/Dashboard/Dashboard.tsx";

function HtmlRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login></Login>} />
        <Route path="/dashboard" element={<Dashboard></Dashboard>} />
      </Routes>
    </Router>
  );
}

export default HtmlRoutes;
