import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import "../components/Form.css";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import Popup from "../components/Popup";

function Profile() {
  const { auth } = useContext(AuthContext);

  const [userDob, setUserDob] = useState("");
  const [userPosts, setUserPosts] = useState([]);
  const [popup, setPopup] = useState({ show: false, postId: 0 });

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

  const removePost = (postId) => {
    axios
      .delete(`http://localhost:8080/posts/delete/${postId}`)
      .then(() => {
        const updatedPostList = userPosts.filter((post) => post.id !== postId);
        setUserPosts(updatedPostList);
        console.log("removed");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
                key={post.id}
              >
                <div className="post-info">
                  <h3>{post.title}</h3>
                  {post.postText.length > 30 ? (
                    <p>{post.postText.slice(0, 30) + "..."}</p>
                  ) : (
                    <p>{post.postText}</p>
                  )}
                </div>
                <div style={{ paddingRight: "30px" }}>
                  <button
                    className="profile-post-btn"
                    onClick={() => {
                      setPopup({ show: true, postId: post.id });
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      <Popup trigger={popup.show}>
        <h4>Are you sure you wish to delete this post?</h4>
        <button
          className="yes-btn"
          onClick={() => {
            removePost(popup.postId);
            setPopup({ show: false, postId: 0 });
          }}
        >
          YES
        </button>
        <button
          className="no-btn"
          onClick={() => {
            setPopup({ show: false, postId: 0 });
          }}
        >
          NO
        </button>
      </Popup>
    </div>
  );
}

export default Profile;
