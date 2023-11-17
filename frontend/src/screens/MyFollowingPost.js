import React, { useEffect, useState } from "react";
import profilePic from "../images/profilePic.jpg";
// import cardImage1 from "../images/cardImage1.jpg";
// import cardImage2 from "../images/cardImage2.jpg";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoodIcon from "@mui/icons-material/Mood";
import "../css/Home.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


export default function MyFollowingPost() {
    const navigate = useNavigate();
    const [data, setdata] = useState([]);
    const [comment, setComment] = useState("");
    const [show, setShow] = useState(false);
    const [item, setItem] = useState([]);

    //Toast Function
    const notifyA = (msg) => toast.error(msg);
    const notifyB = (msg) => toast.success(msg);

    useEffect(() => {
        const token = localStorage.getItem("jwt");

        if (!token) {
            //navigate the user to the signIn page
            navigate("/signUp");
        }

        //Fetching all posts
        fetch("/myfollowingpost", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
        })
            .then((res) => res.json())
            .then((result) => {
                // console.log(result);
                setdata(result);
            })
            .catch((err) => console.log(err));
    }, []);

    // to show and hide comments
    const toggleComment = (posts) => {
        if (show) {
            setShow(false);
        } else {
            setShow(true);
            setItem(posts);
            // console.log(item);
        }
    };

    const likePost = (id) => {
        fetch("/like", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                postId: id,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                const newData = data.map((posts) => {
                    if (posts._id === result._id) {
                        return result;
                    } else {
                        return posts;
                    }
                });
                setdata(newData);
                // console.log("Likepost --> ", result);
            });
    };
    const unlikePost = (id) => {
        fetch("/unlike", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                postId: id,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                const newData = data.map((posts) => {
                    if (posts._id === result._id) {
                        return result;
                    } else {
                        return posts;
                    }
                });
                setdata(newData);
                // console.log(result);
            });
    };

    // function to make comment
    const makeComment = (text, id) => {
        fetch("/comment", {
            method: "put",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
            body: JSON.stringify({
                text: text,
                postId: id,
            }),
        })
            .then((res) => res.json())
            .then((result) => {
                const newData = data.map((posts) => {
                    if (posts._id === result._id) {
                        return result;
                    } else {
                        return posts;
                    }
                });
                setdata(newData);
                setComment("");
                notifyB("Comment Posted Successfully")
                // console.log("Comments --> ", result);
            });
    };

    return (
        <div className="home">
            {/* Card */}

            {data.map((posts) => {
                // console.log(posts);

                return (
                    <div className="card">
                        {/* Card Header */}
                        <div className="card-header">
                            <div className="card-pic">
                                <img src={profilePic} alt="user profile" />
                            </div>
                            <h5>
                                <Link to={`/profile/${posts.postedBy._id}`}>
                                    {posts.postedBy.name}
                                </Link>
                            </h5>

                        </div>

                        {/* card Image */}
                        <div className="card-image">
                            <img src={posts.photo} alt="post" />
                        </div>

                        {/* card content */}
                        <div className="card-content">
                            {posts.likes.includes(
                                JSON.parse(localStorage.getItem("user"))._id
                            ) ? (
                                <button
                                    onClick={() => {
                                        unlikePost(posts._id);
                                    }}
                                >
                                    <FavoriteIcon className="favoriteIcon liked" />
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        likePost(posts._id);
                                    }}
                                >
                                    <FavoriteBorderIcon className="favoriteIcon" />
                                </button>
                            )}
                            {/* LIke   */}
                            {/* UnLike */}

                            <p>{`${posts.likes.length} Likes`}</p>
                            <p>{posts.body}</p>
                            <p
                                style={{ fontWeight: "bold", cursor: "pointer" }}
                                onClick={() => {
                                    toggleComment(posts);
                                }}
                            >
                                View all comments
                            </p>
                        </div>

                        {/* add comment */}
                        <div className="add-comment">
                            <MoodIcon />
                            <input
                                type="text"
                                placeholder="Add a comment"
                                value={comment}
                                onChange={(e) => {
                                    setComment(e.target.value);
                                }}
                            />
                            <button
                                className="comment"
                                onClick={() => {
                                    makeComment(comment, posts._id);
                                }}
                            >
                                Post
                            </button>
                        </div>
                    </div>
                );
            })}

            {/* Show Comments */}

            {show && (
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
                            </div>
                            {/* Commment Section */}
                            <div
                                className="comment-section"
                                style={{ borderBottom: "1px solid #00000029" }}
                            >
                                {item.comments.map((comment) => {
                                    return (
                                        <p className="comm">
                                            <span
                                                className="commenter"
                                                style={{ fontWeight: "bolder" }}
                                            >
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
                                    value={comment}
                                    onChange={(e) => {
                                        setComment(e.target.value);
                                    }}
                                />
                                <button
                                    className="comment"
                                    onClick={() => {
                                        makeComment(comment, item._id);
                                        toggleComment();
                                    }}
                                >
                                    Post
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="close-comment">
                        <CloseIcon
                            onClick={() => {
                                toggleComment();
                            }}
                            className="close-icon"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
