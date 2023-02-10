import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Pages/Home";
import CreatePosts from "./Pages/CreatePosts";
import Posts from "./Pages/Post";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
function App() {
  return (
    <div className="App">
      <Router>
        <div className="shadow-sm border-b">
          <div className="py-4 layout flex flex-row gap-8 ">
            <Link to="/">Home</Link>
            <Link to="/createposts">Create A Post</Link>
            <Link to="/login">Login</Link>
            <Link to="/registration">Register</Link>
          </div>
        </div>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/registration" element={<Registration />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/createposts" element={<CreatePosts />} />
          <Route exact path="/post/:id" element={<Posts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
