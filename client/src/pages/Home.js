import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Postcard from "../components/Postcard";
import "./Home.css";
import { AuthContext } from "../helpers/AuthContext";
import Popup from "../components/Popup";
import CloseIcon from "@mui/icons-material/Close";
import Close from "@mui/icons-material/Close";

function Home() {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [popup, setPopup] = useState(false);
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

  const validationSchema = Yup.object().shape({
    title: Yup.string().min(1).max(180).required(),
    postText: Yup.string().min(1).max(180).required(),
  });

  const createPost = (data) => {
    const postData = { ...data, username: auth.username };
    axios
      .post("http://localhost:8080/posts/", postData)
      .then(() => {
        setPopup(false);
        alert("Post created");
        window.location.reload();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="home">
      {!auth.logged ? (
        <>
          <h1>Not logged in!</h1>
          <h2>
            <a href="http://localhost:3000/user">Login</a> to see posts and
            interact.
          </h2>
        </>
      ) : (
        <>
          <h1>Hello, {auth.username}</h1>
          <button className="post-btn" onClick={() => setPopup(true)}>
            Create post
          </button>
        </>
      )}
      <Popup trigger={popup}>
        <Close className="close" onClick={() => setPopup(false)} />
        <h3>Write a post!</h3>
        <Formik
          initialValues={{ title: "", postText: "" }}
          validationSchema={validationSchema}
          onSubmit={createPost}
        >
          <Form className="popup-form">
            <div>
              <ErrorMessage
                name="title"
                component="span"
                className="error-msg"
              />
              <Field type="text" placeholder="Post title" name="title" />
            </div>
            <div>
              <ErrorMessage
                name="postText"
                component="span"
                className="error-msg"
              />
              <Field
                type="text"
                placeholder="Type something here..."
                name="postText"
              />
            </div>

            <button type="submit" className="submit-btn">
              Submit
            </button>
          </Form>
        </Formik>
      </Popup>
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
