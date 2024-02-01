import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Postcard from "../components/Postcard";
import "./Home.css";
import { AuthContext } from "../helpers/AuthContext";

function Home() {
  const [posts, setPosts] = useState([]);
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    axios.get("http://localhost:8080/posts/getAll").then((response) => {
      setPosts(response.data);
    });

    axios
      .get("http://localhost:8080/users/auth", {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuth({ ...auth, logged: false });
        } else {
          setAuth({
            username: response.data.username,
            id: response.data.id,
            logged: true,
          });
        }
      });
  }, []);

  return (
    <div className="home">
      {!auth.logged ? (
        <>
          <h1>Not logged in!</h1>
          <h2>
            <a href="http://localhost:3000/user">Log in</a> to interact.
          </h2>
        </>
      ) : (
        <>
          <h1>Hello, {auth.username}</h1>
          <button className="post-btn">Create post</button>
        </>
      )}
      <div className="posts">
        {posts.map((post, index) => {
          return (
            <Postcard
              username={post.username}
              title={post.title}
              postText={post.postText}
              key={post.id}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
