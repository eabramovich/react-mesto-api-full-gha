import React from "react";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card.js";

function Main({
  cards,
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <div className="profile">
        <div className="profile__avatar-container">
          <img
            src={currentUser.avatar ? currentUser.avatar : ""}
            alt="Аватарка"
            className="profile__avatar"
          />
          <div className="profile__avatar-overlay" onClick={onEditAvatar} />
        </div>
        <div className="profile__info">
          <div className="profile__info-container">
            <h1 className="profile__info-name">
              {currentUser.name ? currentUser.name : ""}
            </h1>
            <button
              onClick={onEditProfile}
              className="profile__edit-button"
              type="button"
              aria-label="Редактировать"
            ></button>
          </div>
          <p className="profile__info-profession">
            {currentUser.about ? currentUser.about : ""}
          </p>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-button"
          type="button"
          aria-label="Добавить"
        ></button>
      </div>
      <section className="places">
        <ul className="places__container">
          {cards.map((card, i) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
