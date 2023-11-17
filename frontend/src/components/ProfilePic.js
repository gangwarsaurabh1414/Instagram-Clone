import React, { useState, useEffect, useRef } from "react";

export default function ProfilePic({ changeprofile }) {
  const hiddenFileInput = useRef(null);
  const [image, setimage] = useState("");
  const [url, seturl] = useState("");

  // posting image to cloudinary
  const postDetails = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "insta-clone");
    data.append("cloud_name", "gangwarsaurabh");
    fetch("https://api.cloudinary.com/v1_1/gangwarsaurabh/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => seturl(data.url))
      .catch((err) => console.log(err));
    console.log(url);
  };

  const postPic = () => {
    // saving post to mongodb
    fetch("/uploadProfilePic", {
      method: "put",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("jwt"),
      },
      body: JSON.stringify({
        pic: url
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        
        changeprofile();
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handelClick = () => {
    hiddenFileInput.current.click();
  };

  useEffect(() => {
    if (image) postDetails();
  }, [image])
  
  useEffect(() => {
    if (url) {
      postPic();
    }
  }, [url]);

  return (
    <div className="profilePic darkBg ">
      <div className="changePic centered">
        <div>
          <h2>Change Profile Photo</h2>
        </div>
        <div>
          <button
            className="upload-btn"
            style={{ color: "#1EA1F7" }}
            onClick={handelClick}
          >
            Upload Photo
          </button>
          <input
            type="file"
            ref={hiddenFileInput}
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              setimage(e.target.files[0]);
            }}
          />
        </div>
        <div>
          <button className="upload-btn" onClick={() => {
            seturl(null)
            postPic();
          }} style={{ color: "#ED4956" }}>
            {" "}
            Remove current Photo
          </button>
        </div>
        <div>
          <button
            style={{
              background: "none ",
              border: "none",
              cursor: "pointer",
              fontSize: "15px",
            }}
            onClick={changeprofile}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
