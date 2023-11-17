import React,{useState} from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./screens/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Profile from "./screens/Profile";
import UserProfile from "./components/UserProfile";
import Createpost from "./screens/Createpost";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createContext } from "react";
import { LoginContext } from "./context/LoginContext";
import Modal from "./components/Modal";
import MyFollowingPost from "./screens/MyFollowingPost";


function App() {

  const [userLogin, setUserLogin] = useState(false);
  const [modalOpen, setmodalOpen] = useState(false);


  return (
    <BrowserRouter>
      <div className="App">
        <LoginContext.Provider value={{setUserLogin ,setmodalOpen}}>
          <Navbar login={userLogin} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route path="/createPost" element={<Createpost />} />
            <Route path="/profile/:userid" element={<UserProfile />} />
            <Route path="/followingpost" element={<MyFollowingPost />} />
          </Routes>
          <ToastContainer theme="dark" />
          {modalOpen && <Modal setmodalOpen={setmodalOpen}></Modal>}
        </LoginContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
