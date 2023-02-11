import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./Pages/Home";
import CreatePosts from "./Pages/CreatePosts";
import Posts from "./Pages/Post";
import Login from "./Pages/Login";
import Registration from "./Pages/Registration";
import { AuthContext } from "./Helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) setAuthState(false);
        else setAuthState(true);
      });
  }, []);
  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="shadow-sm border-b">
            <div className="py-4 layout flex flex-row gap-8 ">
              <Link to="/">Home</Link>
              <Link to="/createposts">Create A Post</Link>
              {!authState && (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/registration">Register</Link>
                </>
              )}
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
      </AuthContext.Provider>
    </div>
  );
}

export default App;
