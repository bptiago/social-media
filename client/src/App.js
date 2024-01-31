import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/register" exact element={<Registration />} />
          {/* <Route path="/likedPosts" exact element={<Login />} /> */}
          <Route path="/user" exact element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
