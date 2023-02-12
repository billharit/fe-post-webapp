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
import Error from "./Pages/Error";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error)
          setAuthState({
            ...authState,
            status: false,
          });
        else
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            status: true,
          });
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({
      username: "",
      id: 0,
      status: false,
    });
  };
  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="shadow-sm border-b">
            <div className="py-2 layout flex flex-row items-center justify-between gap-8 ">
              <div className="flex gap-4">
                <Link to="/">Home</Link>
                <Link to="/createposts">Create A Post</Link>
              </div>
              <div className="flex gap-4">
                {!authState.status ? (
                  <>
                    <Link
                      className="rounded-lg bg-blue-800 text-white py-2 px-4 "
                      to="/login"
                    >
                      Login
                    </Link>
                    <Link
                      className="rounded-lg bg-yellow-800 text-white py-2 px-4 "
                      to="/registration"
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <button
                    className="rounded-lg bg-red-800 text-white py-2 px-4"
                    onClick={logout}
                  >
                    Logout
                  </button>
                )}
                {authState.username && (
                  <div className="border cursor-pointer rounded-full py-2 px-4 flex items-center justify-center border-blue-800">
                    <span className="text-lg font-bold text-blue-600">
                      {authState.username[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/registration" element={<Registration />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/createposts" element={<CreatePosts />} />
            <Route exact path="/post/:id" element={<Posts />} />
            <Route path="*" exact element={<Error />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
