import React, { useState , useEffect} from "react";
import "../css/Createpost.css";
import profilePic from "../images/profilePic.jpg";
import ImageIcon from "../images/ImageIcon.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function Createpost() {
  const [body, setbody] = useState("");
  const [image, setimage] = useState("");
  const [url, seturl] = useState("");
  const navigate = useNavigate();

  // Toast Functions
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);

  useEffect(() => {
    if (url) {
      fetch("/createPost", {
        method: "post",
        headers: {
          "Content-type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("jwt")
        },
        body: JSON.stringify({
          body,
          pic: url
        })
      }).then(res => res.json())
        .then(data => {
          if (data.error) {
            notifyA(data.error);
          } else {
            notifyB("Successfully Posted");
            navigate("/")
          }
        })
        .catch(err => console.log(err))
    }
  },[url]);


  //posting image to cloudinary
  const postDetails = () => {
    console.log(body, image);
    const data = new FormData()
    data.append("file", image)
    data.append("upload_preset", "insta-clone")
    data.append("cloud_name", "gangwarsaurabh")
    fetch("https://api.cloudinary.com/v1_1/gangwarsaurabh/image/upload", {
      method: "post",
      body:data
    }).then(res => res.json())
      .then(data => seturl(data.url))
      .catch(err => console.log(err))
    
    //Saving post to mongodb
    
  };

  const loadfile = (event) => {
    var output = document.getElementById("output");
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function () {
      URL.revokeObjectURL(output.src); // free memory
    };
  };

  return (
    <div className="createPost">
      {/* Header  */}
      <div className="post-header">
        <h4>Create new Post</h4>
        <button
          onClick={() => {
            postDetails();
          }}
          id="post-btn"
        >
          Share
        </button>
      </div>

      {/* Image Preview */}
      <div className="main-div">
        <img id="output" src={ImageIcon} />

        <input
          type="file"
          accept="image/*"
          onChange={(event) => {
            loadfile(event);
            setimage(event.target.files[0]);
          }}
        />
      </div>

      {/* Details   */}
      <div className="details">
        <div className="card-header">
          <div className="card-pic">
            <img src={profilePic} alt="" srcset="" />
          </div>
          <h5>Saurabh</h5>
        </div>
        <textarea
          value={body}
          onChange={(e) => {
            setbody(e.target.value);
          }}
          type="text"
          placeholder="Write a caption...."
        ></textarea>
      </div>
    </div>
  );
}
