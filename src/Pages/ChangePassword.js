import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  let navigate = useNavigate();
  const changepass = () => {
    axios
      .put(
        "http://localhost:3001/auth/changepassword",
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        if (response.data.error) alert(response.data.error);
        else navigate("/");
      });
  };
  return (
    <div className="layout mt-4">
      <h1 className="text-center">Change Password</h1>
      <div className="mt-4">
        <div className="flex space-y-4 p-4 border-4 border-blue-800 rounded-lg flex-col mx-auto max-w-[600px]">
          <label htmlFor="password">Old Password:</label>
          <input
            onChange={(event) => {
              setOldPassword(event.target.value);
            }}
            className="px-4 py-2 border border-gray-600"
            type="password"
          />
          <label htmlFor="password">New Password:</label>
          <input
            onChange={(event) => {
              setNewPassword(event.target.value);
            }}
            className="px-4 py-2 border border-gray-600"
            type="password"
          />
          <button
            onClick={changepass}
            className="bg-blue-600 hover:bg-blue-700 p-4 text-gray-200 hover:text-white text-center rounded-sm"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
