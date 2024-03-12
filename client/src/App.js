import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import { AuthContext } from "./helpers/AuthContext";
import { useState } from "react";
import Profile from "./pages/Profile";

function App() {
  const [auth, setAuth] = useState({
    username: "",
    id: 0,
    logged: false,
  });

  return (
    <div className="App">
      <AuthContext.Provider value={{ auth, setAuth }}>
        <Router>
          <Sidebar />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/register" exact element={<Registration />} />
            <Route
              path="/user"
              exact
              element={auth.logged ? <Profile /> : <Login />}
            />
            <Route path="/profile" exact element={<Profile />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
