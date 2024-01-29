import React from "react";
import "../components/Form.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Registration() {
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(4).max(15).required(),
    email: Yup.string().email().required(),
    password: Yup.string().min(4).max(15).required(),
  });

  const validate = () => {
    console.log("sent");
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={validate}
      >
        <Form>
          <div>
            <ErrorMessage
              name="username"
              component="span"
              className="error-msg"
            />
            <Field
              type="text"
              placeholder="Username"
              name="username"
              className="input"
            />
          </div>
          <div>
            <ErrorMessage name="email" component="span" className="error-msg" />
            <Field
              type="text"
              placeholder="E-mail"
              name="email"
              className="input"
            />
          </div>
          <div>
            <ErrorMessage
              name="password"
              component="span"
              className="error-msg"
            />
            <Field
              type="password"
              placeholder="Password"
              name="password"
              className="input"
            />
          </div>

          <button type="submit">SIGN UP</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;
