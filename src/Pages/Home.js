import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      // console.log(response)
      setListOfPosts(response.data);
    });
  }, []);
  return (
    <div className="py-4  grid layout gap-8 md:grid-cols-2 grid-cols-1 md:px-0">
      {listOfPosts.map((value, key) => {
        return (
          <div
            key={key}
            className="cursor-pointer"
            onClick={() => {
              navigate(`/post/${value.id}`);
            }}
          >
            <div className="border hover:shadow-lg shadow-md mx-auto">
              <div className="py-4 px-8 text-center bg-blue-800 text-white rounded-t-lg">
                {value.title}
              </div>
              <div className="py-4 text-center min-h-[300px]">
                {value.postText}
              </div>
              <div className="py-4 px-8 bg-blue-800 text-white rounded-b-lg">
                {value.username}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
