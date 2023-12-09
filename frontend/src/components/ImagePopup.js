import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <section className={`popup popup_type_image ${card ? "popup_opened" : ""}`}>
      <div className="popup__container_type_image">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <img
          className="popup__image"
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
        />
        <p className="popup__caption">{card ? card.name : ""}</p>
      </div>
    </section>
  );
}

export default ImagePopup;
