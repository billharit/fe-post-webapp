import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePosts = () => {
  const initialValues = {
    title: "",
    postText: "",
    username: "",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required(),
    postText: Yup.string().max(256).required(),
    username: Yup.string().min(3).max(15).required(),
  });
  const navigate = useNavigate();
  const onSubmit = (data) => {
    // console.log(data);
    axios.post("http://localhost:3001/posts", data).then((response) => {
      navigate("/");
    });
  };
  return (
    <div className="mt-4">
      {/* initialValues={} onSubmit={} validationSchema={} */}
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        className="px-8"
      >
        <Form className="flex space-y-4 p-4 border-4 border-blue-800 rounded-lg flex-col mx-auto max-w-[600px]">
          <div className="flex flex-col space-y-2">
            <label htmlFor="">Title:</label>
            <ErrorMessage
              className="text-red-700"
              name="title"
              component="span"
            />
            <Field
              className="px-4 py-2 border border-gray-600"
              name="title"
              id="title"
              type="text"
              placeholder="( Ex. Title Asd... )"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="">Post:</label>
            <ErrorMessage
              className="text-red-700"
              name="postText"
              component="span"
            />
            <Field
              className="px-4 py-2 border border-gray-600"
              name="postText"
              id="postText"
              type="text"
              placeholder="( Ex. PostText Asd... )"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="">Username:</label>
            <ErrorMessage
              className="text-red-700"
              name="username"
              component="span"
            />
            <Field
              className="px-4 py-2 border border-gray-600"
              name="username"
              id="username"
              type="text"
              placeholder="( Ex. username Asd... )"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 p-4 text-gray-200 hover:text-white text-center rounded-sm"
          >
            Create Post
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default CreatePosts;
