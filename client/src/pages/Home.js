import React, { useEffect, useState } from "react";
import axios from "axios";
import Postcard from "../components/Postcard";
import "./Home.css";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/posts/getAll").then((response) => {
      setPosts(response.data);
    });
  }, []);

  return (
    <div className="home">
      <button className="post-btn">Create post</button>
      <div className="posts">
        {posts.map((post, index) => {
          return (
            <Postcard
              username={post.username}
              title={post.title}
              postText={post.postText}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
