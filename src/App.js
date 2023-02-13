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
import Profile from "./Pages/Profile";
import ChangePassword from "./Pages/ChangePassword";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  const [navbar, setNavbar] = useState(false);

  const toggleNavbar = () => {
    setNavbar(!navbar);
  };

  useEffect(() => {
    setNavbar(false);
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
                {!authState.status && (
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
                )}

                {authState.username && (
                  <div className="flex items-center">
                    <button
                      onClick={toggleNavbar}
                      className="border-blue-800 border  py-2 px-4 cursor-pointer flex items-center justify-center rounded-full text-gray-400 hover:text-white "
                    >
                      <span className="text-lg  font-bold text-blue-600 hover:text-blue-500">
                        {authState.username[0].toUpperCase()}
                      </span>
                    </button>
                    {navbar && (
                      <div className=" relative">
                        <div>
                          <button
                            type="button"
                            className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                            id="user-menu-button"
                            aria-expanded="false"
                            aria-haspopup="true"
                          >
                            <span className="sr-only">Open user menu</span>
                          </button>
                        </div>

                        <div
                          className="origin-top-right absolute right-0 mt-6 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="user-menu-button"
                        >
                          <Link to={`/profile/${authState.id}`}>
                            <span
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700"
                              role="menuitem"
                              id="user-menu-item-0"
                            >
                              Your Profile
                            </span>
                          </Link>
                          <Link to={`/changepassword`}>
                            <span
                              href="#"
                              className="block px-4 py-2 text-sm text-gray-700"
                              role="menuitem"
                              id="user-menu-item-1"
                            >
                              Change Password
                            </span>
                          </Link>
                          <span
                            onClick={logout}
                            href="#"
                            className="block cursor-pointer px-4 py-2 text-sm text-gray-700"
                            role="menuitem"
                            id="user-menu-item-2"
                          >
                            Sign out
                          </span>
                        </div>
                      </div>
                    )}
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
            <Route exact path="/profile/:id" element={<Profile />} />
            <Route exact path="/profile/:id" element={<Profile />} />
            <Route exact path="/changepassword" element={<ChangePassword />} />

            <Route path="*" exact element={<Error />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
