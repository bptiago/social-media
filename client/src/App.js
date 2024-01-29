import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import LikedPosts from "./pages/LikedPosts";

function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/likedPosts" exact element={<LikedPosts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
