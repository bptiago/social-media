import React, { useContext } from "react";
import "../components/Form.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

function Login() {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(4).max(15).required(),
    password: Yup.string().min(4).max(15).required(),
  });

  const validate = (data) => {
    axios.post("http://localhost:8080/users/login", data).then((response) => {
      if (response.data.error) {
        return alert(response.data.error);
      } else {
        // Logs in
        const token = response.data.token;
        sessionStorage.setItem("token", token);

        setAuth({
          username: response.data.username,
          id: response.data.id,
          logged: true,
        });

        alert("Logged in!");

        navigate("/");
      }
    });
  };

  return (
    <div style={{ marginTop: "30vh" }}>
      <div className="form-container">
        <h2>Login</h2>
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

            <button type="submit">Login</button>
          </Form>
        </Formik>
      </div>
      <div className="form-container">
        <p>
          Don't have an account?{" "}
          <a href="http://localhost:3000/register">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
