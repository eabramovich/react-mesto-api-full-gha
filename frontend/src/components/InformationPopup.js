import React from "react";
import Popup from "./Popup";

function InformationPopup({ message, isOpen, onClose, isErrorMessage }) {
  return (
    <Popup type="information" isOpen={isOpen} onClose={onClose}>
      <div className={`popup__icon ${isErrorMessage ? "popup__icon_error" : "popup__icon_success"}`} />
      <p className="popup__message">{message}</p>
    </Popup>
  );
}

export default InformationPopup;