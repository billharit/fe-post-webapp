import React from "react";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Helpers/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AiFillLike } from "react-icons/ai";

const Profile = () => {
  const { authState } = useContext(AuthContext);
  let navigate = useNavigate();
  let { id } = useParams();
  const [username, setUsername] = useState();
  const [listOfPosts, setListOfPosts] = useState([]);
  useEffect(() => {
    // if (!authState.status && !localStorage.getItem("accessToken")) {
    //   navigate("/login");
    // }

    axios.get(`http://localhost:3001/auth/profiles/${id}`).then((response) => {
      setUsername(response.data.username);
    });
    axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
      console.log(response.data);
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div className="layout">
      <h1 className="text-center mt-4">{username}'s List of Post</h1>

      <div className="py-4  grid layout gap-8 md:grid-cols-2 grid-cols-1 md:px-0">
        {listOfPosts.map((value, key) => {
          return (
            <div key={key} className="cursor-pointer">
              <div className="border hover:shadow-lg shadow-md mx-auto">
                <div className="py-4 px-8 text-center bg-blue-800 text-white rounded-t-lg">
                  {value.title}
                </div>
                <div
                  onClick={() => {
                    navigate(`/post/${value.id}`);
                  }}
                  className="py-4 text-center min-h-[300px]"
                >
                  {value.postText}
                </div>
                <div className="py-4 px-8 bg-blue-800 flex items-center justify-between text-white rounded-b-lg">
                  <span>{value.username}</span>
                  <div className="flex gap-2 items-center">
                    <AiFillLike size={20} color={"#D3D3D3"} />
                    <span>{value.Likes.length}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
