import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Postcard from "../components/Postcard";
import "./Home.css";
import { AuthContext } from "../helpers/AuthContext";

function Home() {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const { auth, setAuth } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:8080/posts/getAll", {
        headers: {
          token: sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response);
        } else {
          setPosts(response.data.posts);
          setLikedPosts(
            response.data.likedPosts.map((likedPost) => {
              return likedPost.PostId;
            })
          );
        }
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

  const likePost = (postId) => {
    axios
      .post(
        "http://localhost:8080/likes/interact",
        { PostId: postId },
        {
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        setPosts(
          posts.map((post) => {
            if (post.id === postId) {
              if (response.data.newLike) {
                return { ...post, Likes: [...post.Likes, 1] };
              } else {
                const likes = post.Likes;
                likes.pop();
                return { ...post, Likes: likes };
              }
            } else {
              return post;
            }
          })
        );

        // Re-render like button when interacted with
        if (!likedPosts.includes(postId)) {
          setLikedPosts([...likedPosts, postId]);
        } else {
          setLikedPosts(likedPosts.filter((id) => id !== postId));
        }
      });
  };

  return (
    <div className="home">
      {!auth.logged ? (
        <>
          <h1>Not logged in!</h1>
          <h2>
            <a href="http://localhost:3000/user">Log in</a> to see posts and
            interact.
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
              onLike={() => {
                likePost(post.id);
              }}
              btnClass={likedPosts.includes(post.id) ? "liked" : "none"}
              numLikes={post.Likes.length}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Home;
