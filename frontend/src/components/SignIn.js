import React, { useState } from "react";
import "../css/SignIn.css";
import instaLogo from "../images/instaLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useContext } from "react";
import { LoginContext } from "../context/LoginContext";


export default function SignIn() {
  const {setUserLogin } = useContext(LoginContext);
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");

  //Toast Function
  const notifyA = (msg) => toast.error(msg);
  const notifyB = (msg) => toast.success(msg);


  // Email regex for email validation
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const postData = () => {
    //checking email
    if (!emailRegex.test(email)) {
      notifyA("Invalid Email");
      return;
    }

    // Sending data to server
    fetch("/signIn", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          notifyA(data.error);
        } else {
          notifyB("Signed In Successfully");
          console.log("token is : ",data);
          localStorage.setItem("jwt", data.token)
          localStorage.setItem("user", JSON.stringify(data.user))
          setUserLogin(true);
          navigate("/");
        }

        console.log(data);
      });
  };
  return (
    <div className="signIn">
      <div>
        <div className="loginForm">
          <div className="loginform">
            <img className="signInlogo" src={instaLogo} alt="instagram Logo" />
            <div>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <input
              type="submit"
              value="Sign In"
              id="login-btn"
              onClick={() => {
                postData();
              }}
            />
          </div>
          <div className="loginform2">
            Don't have an account ?
            <Link to="/signUp">
              <span>Sign Up</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
