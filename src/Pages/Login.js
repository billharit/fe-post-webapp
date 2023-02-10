import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = () => {
    axios
      .post("http://localhost:3001/auth/login", {
        username: username,
        password: password,
      })
      .then((Response) => {
        console.log(Response.data);
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
