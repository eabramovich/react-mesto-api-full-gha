import React from "react";

function Popup({ type, isOpen, onClose, children }) {
  return (
    <section className={`popup popup_type_${type} ${isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__container popup__container_type_${type}`}>
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        {children}
      </div>
    </section>
  );
}

export default Popup;
