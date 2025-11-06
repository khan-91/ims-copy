import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import Root from "./utils/Root";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Dashboard from "./pages/Dashboard";
import Inventories from "./components/Inventories";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Root />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoutes requireRole={["ADMIN"]}>
              <Dashboard />
            </ProtectedRoutes>
          }
        >
          <Route 
            index 
            element={<h1>Summary of dashboard</h1>}  
          />
          <Route 
            path="inventories"
            element={<Inventories />}
          />
          <Route 
            path="users"
            element={<h1>Users</h1>}
          />
          <Route 
            path="profile"
            element={<h1>Profile</h1>}
          />
          </Route>
          
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoutes requireRole={["USER"]}>
              <h1>User Dashboard</h1>
            </ProtectedRoutes>
          }
        />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/unauthorized" element={<p>Unauthorized</p>} />
      </Routes>
    </Router>
  );
}

export default App;
