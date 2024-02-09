import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import "../components/Form.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Profile() {
  const { auth } = useContext(AuthContext);

  const [userDob, setUserDob] = useState("");
  const [userPosts, setUserPosts] = useState([]);

  const userId = auth.id;
  const username = auth.username;

  useEffect(() => {
    axios.get(`http://localhost:8080/users/get/${userId}`).then((response) => {
      setUserDob(response.data.bod);
    });

    axios
      .get(`http://localhost:8080/posts/user/${username}`)
      .then((response) => {
        setUserPosts(response.data);
      });
  }, []);

  return (
    <div style={{ marginTop: "10vh" }}>
      <h2>PROFILE</h2>
      <div className="container">
        <AccountCircleIcon />
        <ul>
          <li>
            <label>Username: {username}</label>
          </li>
          <li>
            <label>Date of birth: {userDob}</label>
          </li>
        </ul>
      </div>
      <h3>Your posts:</h3>
      <div className="post-list">
        {userPosts.length < 1 ? (
          <p>You haven't made a post yet...</p>
        ) : (
          userPosts.map((post, index) => {
            return (
              <div
                className="container"
                style={{ justifyContent: "space-between" }}
              >
                <div className="post-info">
                  <h3>{post.title}</h3>
                  {post.postText.length > 23 ? (
                    <p>{post.postText.slice(0, 23) + "..."}</p>
                  ) : (
                    <p>{post.postText}</p>
                  )}
                </div>
                <div className="post-btns">
                  <button style={{ marginRight: "10px" }}>Edit</button>
                  <button>Remove</button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Profile;
