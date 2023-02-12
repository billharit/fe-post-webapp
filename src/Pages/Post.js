import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AiFillLike } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { AuthContext } from "../Helpers/AuthContext";

const Post = () => {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((Response) => {
      setPostObject(Response.data);
    });

    axios.get(`http://localhost:3001/comments/${id}`).then((Response) => {
      setComments(Response.data);
    });
  }, []);

  const likeAPost = (id) => {
    if (authState.status) {
      axios
        .post(
          "http://localhost:3001/likes",
          { postId: id },
          { headers: { accessToken: localStorage.getItem("accessToken") } }
        )
        .then((response) => {
          if (response.data.liked) {
            setPostObject({ ...postObject, Likes: [...postObject.Likes, 0] });
          } else {
            const UnlikePost = postObject.Likes;
            UnlikePost.pop();
            setPostObject({ ...postObject, Likes: UnlikePost });
          }
        });
    }
  };
  const addComment = () => {
    axios
      .post(
        `http://localhost:3001/comments/`,
        {
          commentBody: newComment,
          PostId: id,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const commentToAdd = {
            commentBody: newComment,
            username: response.data.username,
          };
          setComments([...comments, commentToAdd]);
          setNewComment("");
        }
      });
  };

  const deleteComment = (id) => {
    axios
      .delete(`http://localhost:3001/comments/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(
        setComments(
          comments.filter((val) => {
            return val.id != id;
          })
        )
      );
  };
  return (
    <div className="layout mt-4 mb-20 min-h-main ">
      <div>
        <div className="border shadow-md transition-all duration-300 hover:shadow-xl">
          <h1 className="py-4 px-8 text-center bg-blue-800 text-white rounded-t-lg">
            {postObject.title}
          </h1>
          <div className="py-4 px-8 min-h-[300px] flex justify-center items-center">
            <p className="text-center">{postObject.postText}</p>
          </div>
          <div className="py-4 text-white px-8 bg-blue-800 flex items-center justify-between">
            <h4 className="  rounded-b-lg">{postObject.username}</h4>
            <div className="flex gap-2 items-center">
              <AiFillLike
                size={25}
                onClick={() => {
                  likeAPost(postObject.id);
                }}
              />
              <span>{postObject.Likes?.length}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <div className="flex justify-center">
          <input
            className="px-2 py-1 rounded-lg border"
            type="text"
            placeholder="Comment..."
            value={newComment}
            autoComplete="off"
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button
            onClick={addComment}
            className="ml-4 hover:bg-blue-800 rounded-lg bg-blue-700 text-gray-100 hover:text-white px-2 py-1"
          >
            Add Comment
          </button>
        </div>
        <div>
          <h2 className="text-center mt-12">List of Comments</h2>
          <div className="flex flex-col gap-4 mt-8">
            {comments.map((comment, key) => {
              return (
                <div
                  className="flex flex-col min-h-[150px]   border border-blue-400 rounded-lg"
                  key={key}
                >
                  <div className="bg-blue-800 rounded-t-lg px-4 flex justify-between py-4">
                    <label className="text-white  font-semibold">
                      <span className="font-medium">From:</span>{" "}
                      {comment.username}
                    </label>
                    {authState.username === comment.username && (
                      <button
                        onClick={() => {
                          deleteComment(comment.id);
                        }}
                        className="text-white px-2 py-2 font-semibold bg-red-600 rounded-lg hover:bg-red-500"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <div className="py-4">
                    <p className="px-4">{comment.commentBody}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
