import React, { useEffect, useState } from "react";
import profilePic from "../images/profilePic.jpg";
import cardImage1 from "../images/cardImage1.jpg";
import cardImage2 from "../images/cardImage2.jpg";
import "../css/Profile.css";
import "../css/UserProfile.css";
import PostDetail from "./PostDetail";
import { useParams } from "react-router-dom";

export default function UserProfile() {

  var picLink = "https://cdn-icons-png.flaticon.com/128/1144/1144760.png"

  const { userid } = useParams();
  const [isFollow, setisFollow] = useState(false);
  const [user, setUser] = useState("");
  const [posts, setPosts] = useState([]);

  //  to follow users
  const followUser = (userId) => {
    console.log(userId);
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setisFollow(true)
      })
  };

  //  to unfollow User
  const unfollowUser = (userId) => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        followId: userId,
      }),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log(data)
        setisFollow(false)
      })
  };

  // console.log(:-> "userid ",userid);
  // const [pic, setPic] = useState([]);
  // const [show, setShow] = useState(false);
  // const [posts, setPosts] = useState([]);

  // const toggleDetails = (posts) => {
  //     if (show) {
  //         setShow(false);
  //     } else {
  //         setShow(true);
  //         setPosts(posts);
  //         console.log(posts);
  //     }
  // };

  useEffect(() => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        // console.log(result.user);
        // console.log(result.post);
        setUser(result.user);
        setPosts(result.post);
        if (
          result.user.followers.includes(
            JSON.parse(localStorage.getItem("user"))._id
          )
        ) {
          setisFollow(true);
        }
        // setPic(result);
        // console.log("result -->",result[0].postedBy.name);
        // console.log( "pics = " , pic);
      });
  }, [isFollow]);

  return (
    <div className="profile">
      {/* Profile Frame */}

      <div className="profile-frame">
        {/* profile pic`` */}
        <div className="profile-pic">
          <img src={user.Photo ? user.Photo : picLink} alt="profile-pic" />
        </div>
        {/* Profile data */}

        <div className="profile-data">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h1>{user.name}</h1>
            <button
              className="folowBtn"
              onClick={() => {
                if (isFollow) {
                  unfollowUser(user._id);
                } else {
                  followUser(user._id);
                }
              }}
            >
              {isFollow ? "Unfollow" : "Follow"}
            </button>
            {/* <button className="folowBtn">UnFollow</button> */}
          </div>
          <div className="profile-info">
            <p>{posts.length} post</p>
            <p>{user.followers ? user.followers.length : "0"} followers</p>
            <p>{user.following ? user.following.length : "0"} following</p>
          </div>
        </div>
      </div>
      <hr
        style={{
          width: "90%",
          opacity: "0.8",
          margin: "25px auto",
        }}
      />
      {/* Gallery */}
      <div className="gallery">
        {posts.map((pics) => {
          return (
            <img
              onClick={() => {
                // toggleDetails(pics);
              }}
              key={pics._id}
              src={pics.photo}
              alt="posts"
              className="item"
            />
          );
        })}

        {/* <img src={cardImage1} alt="post" />
        <img src={cardImage2} alt="post" />
        <img src={cardImage1} alt="post" />
        <img src={cardImage2} alt="post" />
        <img src={cardImage1} alt="post" />
        <img src={cardImage2} alt="post" />
        <img src={cardImage1} alt="post" />
        <img src={cardImage2} alt="post" />
        <img src={cardImage1} alt="post" />
        <img src={cardImage2} alt="post" />
        <img src={cardImage1} alt="post" />
        <img src={cardImage2} alt="post" />
        <img src={cardImage1} alt="post" />
        <img src={cardImage2} alt="post" />
        <img src={cardImage1} alt="post" />
        <img src={cardImage2} alt="post" />
        <img src={cardImage1} alt="post" />
        <img src={cardImage2} alt="post" /> */}
      </div>

      {/* {show &&
                <PostDetail item={posts} toggleDetails={toggleDetails} />
            } */}
  </div>
  );
}
