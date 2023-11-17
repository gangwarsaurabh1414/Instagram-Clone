import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import "../css/Modal.css";
import { useNavigate } from "react-router-dom";

export default function Modal({ setmodalOpen }) {
  const navigate = useNavigate();

  return (
    <div
      className="darkBg"
      onClick={() => {
        setmodalOpen(false);
      }}
    >
      <div className="centered">
        <div className="modal">
          {/* Modal Header */}
          <div className="modalHeader">
            <div className="heading">Confirm</div>
            <button
              className="closeBtn"
              onClick={() => {
                setmodalOpen(false);
              }}
            >
              <CloseIcon />
            </button>
          </div>

          {/* Modal Content */}
          <div className="modalContent">Are you really want to log out ?</div>

          {/* Modal Action */}
          <div className="modalActions">
            <div className="actionContainer">
              <button
                className="logOutBtn"
                onClick={() => {
                  setmodalOpen(false);
                  localStorage.clear();
                  navigate("/signUp");
                }}
              >
                LogOut
              </button>
              <button
                className="cancelBtn"
                onClick={() => {
                  setmodalOpen(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
