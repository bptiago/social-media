import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Registration from "./pages/Registration";

function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/likedPosts" exact element={<Registration />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
