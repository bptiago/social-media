import React from "react";
import "./Postcard.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";

function Postcard(props) {
  return (
    <div className="postcard">
      <h2>{props.username}</h2>
      <div className="body">
        <h3>{props.title}</h3>
        <p>{props.postText}</p>
      </div>
      <div className="footer">
        <div className="likes">
          <FavoriteBorderIcon
            onClick={props.onLike}
            className={props.btnClass}
          />
          <p>{props.numLikes}</p>
        </div>
        <div className="likes">
          <ChatBubbleOutlineIcon onClick={props.clickComment} />
          <p>Comments</p>
        </div>
      </div>
    </div>
  );
}

export default Postcard;
