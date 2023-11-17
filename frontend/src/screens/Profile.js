import React, { useEffect, useState } from "react";
import "../css/Profile.css";
import PostDetail from "../components/PostDetail";
import ProfilePic from "../components/ProfilePic";

export default function Profile() {
  var picLink = "https://cdn-icons-png.flaticon.com/128/1144/1144760.png"
  const [pic, setPic] = useState([]);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  const [changePic, setchangePic] = useState(false);

  const toggleDetails = (posts) => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
      setPosts(posts);
      console.log(posts);
    }
  };

  const changeprofile = () => {
    if (changePic) {
      setchangePic(false);
    } else {
      setchangePic(true);
    }
  };

  useEffect(() => {
    fetch(
      `/user/${JSON.parse(localStorage.getItem("user"))._id
      }`,
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt"),
        },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        console.log(result.user);
        setPic(result.post);
        setUser(result.user);

        // console.log("result -->",result[0].postedBy.name);
        // console.log( "pics = " , pic);
      });
  }, []);

  return (
    <div className="profile">
      {/* Profile Frame */}

      <div className="profile-frame">
        {/* profile pic`` */}
        <div className="profile-pic">
          <img onClick={changeprofile} src={user.Photo ? user.Photo : picLink} alt="profile-pic" />
          {/* <img onClick={changeprofile} src={profilePic} alt="profile-pic" /> */}
        </div>
        {/* Profile data */}

        <div className="profile-data">
          <h1>{JSON.parse(localStorage.getItem("user")).name}</h1>
          <div className="profile-info">
            <p>{pic ? pic.length : 0} post</p>
            <p>{user.followers ? user.followers.length : 0} followers</p>
            <p>{user.following ? user.following.length : 0} following</p>
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
        {pic.map((pics) => {
          return (
            <img
              onClick={() => {
                toggleDetails(pics);
              }}
              key={pics._id}
              src={pics.photo}
              alt="posts"
              className="item"
            />
          );
        })}
      </div>

      {show && <PostDetail item={posts} toggleDetails={toggleDetails} />}

      {changePic && <ProfilePic changeprofile={changeprofile}></ProfilePic>}
    </div>
  );
}
