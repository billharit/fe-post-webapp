import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";

const Home = () => {
  const [listOfPosts, setListOfPosts] = useState([]);
  let navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:3001/posts").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);
  const likeAPost = (postId) => {
    axios
      .post(
        "http://localhost:3001/likes",
        { postId: postId },
        { headers: { accessToken: localStorage.getItem("accessToken") } }
      )
      .then((response) => {
        setListOfPosts(
          listOfPosts.map((post) => {
            if (post.id === postId) {
              if (response.data.liked) {
                return { ...post, Likes: [...post.Likes, 0] };
              } else {
                const likeArray = post.Likes;
                likeArray.pop();
                return { ...post, Likes: likeArray };
              }
            } else {
              return post;
            }
          })
        );
      });
  };
  return (
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
                  <AiFillLike
                    size={20}
                    onClick={() => {
                      likeAPost(value.id);
                    }}
                  />
                  <span>{value.Likes.length}</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Home;
