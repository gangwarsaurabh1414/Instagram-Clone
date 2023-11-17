import React from "react";
import "../css/Navbar.css";
import instaLogo from "../images/instaLogo.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";

export default function Navbar(props) {

  const { setmodalOpen } = useContext(LoginContext);
  const navigate = useNavigate();
  const loginStatus =() => {
    const token = localStorage.getItem("jwt");
    // console.log(token);

    if (props.userLogin || token) {
      return [
        <>
    
          <Link to="/profile">
            <li>Profile</li>
          </Link>
          <Link to="/createPost">
            <li>CreatePost</li>
          </Link>
          <Link to="followingpost" >
            <li>My Following </li>
          </Link>
          <Link to={""}>
            <button onClick={()=>{setmodalOpen(true)}} className="primaryBtn">LogOut</button>
          </Link>
        </>
      ]
    } else {
      return [
        <>
          <Link to="/signUp">
            <li>SignUp</li>
          </Link>
          <Link to="/signIn">
            <li>SignIn</li>
          </Link> 
        </>
      ]
    }

  }
  loginStatus();

  return (
    <div className="navbar">
      <img src={instaLogo} onClick={() => {
        navigate('/')
      }} alt="insta log" />
      <ul className="nav-menu">
         {loginStatus()}
      </ul>
    </div>
  );
}
