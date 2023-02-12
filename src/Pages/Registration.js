import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Registration = () => {
  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {});
  };
  return (
    <div className="layout mt-4">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
        className="px-8"
      >
        <Form className="flex space-y-4 p-4 border-4 border-blue-800 rounded-lg flex-col mx-auto max-w-[600px]">
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
              placeholder="( Ex. username Asd... )"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="">Password:</label>
            <ErrorMessage
              className="text-red-700"
              name="password"
              component="span"
            />
            <Field
              className="px-4 py-2 border border-gray-600"
              name="password"
              type="password"
              id="password"
              placeholder="( Your Password... )"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 p-4 text-gray-200 hover:text-white text-center rounded-sm"
          >
            Register
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default Registration;
