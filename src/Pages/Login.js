import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Helpers/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let navigate = useNavigate();

  const login = () => {
    axios
      .post("http://localhost:3001/auth/login", {
        username: username,
        password: password,
      })
      .then((Response) => {
        if (Response.data.error) alert(Response.data.error);
        else {
          localStorage.setItem("accessToken", Response.data.token);
          setAuthState({
            username: Response.data.username,
            id: Response.data.id,
            status: true,
          });
          navigate("/");
        }
      });
  };
  return (
    <div className="layout mt-4">
      <div className="flex space-y-4 p-4 border-4 border-blue-800 rounded-lg flex-col mx-auto max-w-[600px]">
        <label htmlFor="username">Username:</label>
        <input
          className="px-4 py-2 border border-gray-600"
          type="text"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label htmlFor="password">Password:</label>
        <input
          className="px-4 py-2 border border-gray-600"
          type="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button
          onClick={login}
          className="bg-blue-600 hover:bg-blue-700 p-4 text-gray-200 hover:text-white text-center rounded-sm"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
