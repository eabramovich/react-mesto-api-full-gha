
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((elem) => {
    return elem._id === currentUser._id;
  });

  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card)
  }

  return (
    <li className="places__place">
      <div
        className="places__place-image"
        style={{ backgroundImage: `url(${card.link})` }}
        onClick={handleClick}
      />
      {isOwn && (
        <button
          className="places__place-trash-button"
          aria-label="Удалить"
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className="places__place-info">
        <h2 className="places__place-name">{card.name}</h2>
        <div className="places__like-container">
          <button
            className={`places__place-like-button ${
              isLiked ? "places__place-like-button_active" : ""
            }`}
            type="button"
            aria-label="Нравится"
            onClick={handleLikeClick}
          ></button>
          <span className="places__place-like-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
