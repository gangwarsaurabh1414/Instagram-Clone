import React from 'react';
import "../css/PostDetail.css";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import profilePic from "../images/profilePic.jpg";
import MoodIcon from "@mui/icons-material/Mood";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";


export default function PostDetail({ item, toggleDetails }) {

  const navigate = useNavigate();
  //Toast Function
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  const removePost = (postId) => {
    // console.log(postId);

    if (window.confirm("Do you really Want to Delete this Post ? ")) {
      fetch(`http://localhost:5000/deletePost/${postId}`, {
        method: "delete",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          notifyB(result.message);
          toggleDetails();
            navigate("/");
        });
    }
  };

  return (
    <div className="showComment">
      <div className="container">
        <div className="postPic">
          <img height={""} src={item.photo} alt="" srcset="" />
        </div>
        <div className="details">
          {/* Card Header */}
          <div
            className="card-header"
            style={{ borderBottom: "1px solid #00000029" }}
          >
            <div className="card-pic">
              <img src={profilePic} alt="user profile" />
            </div>
            <h5>{item.postedBy.name}</h5>
            <div className="deletePost">
              <DeleteForeverIcon
                onClick={() => {
                  removePost(item._id);
                }}
              />
            </div>
          </div>
          {/* Commment Section */}
          <div
            className="comment-section"
            style={{ borderBottom: "1px solid #00000029" }}
          >
            {item.comments.map((comment) => {
              return (
                <p className="comm">
                  <span className="commenter" style={{ fontWeight: "bolder" }}>
                    {comment.postedBy.name}{" "}
                  </span>
                  <span className="commentText">{comment.comment}</span>
                </p>
              );
            })}
          </div>

          {/* card content */}
          <div className="card-content">
            <p>{item.likes.length} Likes</p>
            <p>{item.body}</p>
          </div>

          {/* add comment */}
          <div className="add-comment">
            <MoodIcon />
            <input
              type="text"
              placeholder="Add a comment"
              // value={comment}
              // onChange={(e) => {
              //     setComment(e.target.value);
              // }}
            />
            <button
              className="comment"
              // onClick={() => {
              //     makeComment(comment, item._id);
              //     toggleComment();
              // }}
            >
              Post
            </button>
          </div>
        </div>
      </div>
      <div className="close-comment">
        <CloseIcon
          onClick={() => {
            toggleDetails();
          }}
          className="close-icon"
        />
      </div>
    </div>
  );
}
