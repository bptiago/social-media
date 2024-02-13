import React from "react";
import "../components/Form.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";

function Registration() {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    bod: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(4).max(15).required(),
    bod: Yup.string().required(),
    password: Yup.string().min(4).max(15).required(),
  });

  const validate = (data) => {
    axios.post("http://localhost:8080/users", data).then((response) => {
      if (response.data.registered) {
        alert("Username already registered. Choose another.");
      } else {
        alert("User registered. Welcome!");
        navigate("/user");
      }
    });
  };

  return (
    <div style={{ marginTop: "30vh" }}>
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
              <ErrorMessage name="bod" component="span" className="error-msg" />
              <Field type="date" placeholder="" name="bod" className="input" />
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
    </div>
  );
}

export default Registration;
