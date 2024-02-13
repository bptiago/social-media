import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Postcard from "../components/Postcard";
import "./Home.css";
import { AuthContext } from "../helpers/AuthContext";
import Popup from "../components/Popup";
import Close from "@mui/icons-material/Close";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function Home() {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);

  const [popup, setPopup] = useState(false);

  const [commentPopup, setCommentPopup] = useState(false);
  const [newCommentPopup, setNewCommentPopup] = useState(false);

  const [openedPost, setOpenedPost] = useState({});
  const [openedPostComments, setOpenedPostComments] = useState([]);
  const [commentsCounter, setCommentsCounter] = useState(0);

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

  const showComments = (post) => {
    setCommentPopup(true);
    setOpenedPost({ ...post });
    axios
      .get(`http://localhost:8080/comments/getAll/${post.id}`)
      .then((response) => {
        setOpenedPostComments(response.data);
      })
      .catch((error) => console.log(error));
  };

  const commentValidation = Yup.object().shape({
    text: Yup.string().min(1).max(180).required(),
  });

  const createComment = (data) => {
    const commentData = {
      ...data,
      username: auth.username,
      PostId: openedPost.id,
    };
    axios
      .post("http://localhost:8080/comments/", commentData)
      .then(() => {
        setNewCommentPopup(false);
        setOpenedPostComments([...openedPostComments, commentData]);
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
      <div className="posts">
        {posts.length > 0 ? (
          posts.map((post) => {
            return (
              <Postcard
                username={post.username}
                title={post.title}
                postText={post.postText}
                key={post.id}
                onLike={() => {
                  likePost(post.id);
                }}
                clickComment={() => {
                  showComments(post);
                }}
                btnClass={likedPosts.includes(post.id) ? "liked" : "none"}
                numLikes={post.Likes.length}
              />
            );
          })
        ) : (
          <h2>There are currently no posts...</h2>
        )}
      </div>
      <Popup trigger={commentPopup}>
        <Close
          className="close"
          onClick={() => {
            setCommentPopup(false);
            setCommentsCounter(0);
          }}
        />
        <div className="comments-card">
          <div className="comments-left">
            <h4>{openedPost.title}</h4>
            <p>{openedPost.postText}</p>
            <h5>Posted by: {openedPost.username}</h5>
          </div>
          <div className="comments-right">
            {openedPostComments.length < 1 ? (
              <h4>No comments...</h4>
            ) : (
              openedPostComments.map((comment, index) => {
                if (index >= commentsCounter && index <= commentsCounter + 2) {
                  return (
                    <div className="comment" key={comment.id}>
                      <h4>{comment.username}</h4>
                      <p>{comment.text}</p>
                    </div>
                  );
                }
              })
            )}
            <div className="comments-update">
              {openedPostComments.length > 0 ? (
                <>
                  <ArrowBackIosNewIcon
                    style={{ fontSize: "17px" }}
                    className="update-btn"
                    onClick={() => {
                      if (commentsCounter <= 2) {
                        return "";
                      } else {
                        setCommentsCounter(commentsCounter - 3);
                      }
                    }}
                  />
                  <ArrowForwardIosIcon
                    style={{ fontSize: "17px" }}
                    className="update-btn"
                    onClick={() => {
                      if (commentsCounter >= openedPostComments.length - 3) {
                        return "";
                      } else {
                        setCommentsCounter(commentsCounter + 3);
                      }
                    }}
                  />
                </>
              ) : (
                ""
              )}
              <button
                style={{ fontSize: "10px" }}
                className="submit-btn"
                onClick={() => {
                  setNewCommentPopup(true);
                }}
              >
                New comment
              </button>
              <Popup trigger={newCommentPopup}>
                <h4>New comment</h4>
                <Close
                  className="close"
                  onClick={() => {
                    setNewCommentPopup(false);
                  }}
                />
                <Formik
                  initialValues={{ text: "" }}
                  validationSchema={commentValidation}
                  onSubmit={createComment}
                >
                  <Form className="popup-form">
                    <div>
                      <ErrorMessage
                        name="text"
                        component="span"
                        className="error-msg"
                      />
                      <Field
                        type="text"
                        placeholder="Comment here..."
                        name="text"
                      />
                    </div>
                    <button type="submit" className="submit-btn">
                      Submit
                    </button>
                  </Form>
                </Formik>
              </Popup>
            </div>
          </div>
        </div>
      </Popup>
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
    </div>
  );
}

export default Home;
