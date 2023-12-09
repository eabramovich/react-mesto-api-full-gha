import React from "react";
import Main from "./Main.js";
import api from "../utils/Api.js";
import EditProfilePopup from "./EditProfilePopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import ImagePopup from "./ImagePopup.js";
import ConfirmationPopup from "./ConfirmationPopup.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import Footer from "./Footer.js";

function UserPage({ setCurrentUser, cards, setCards }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmationPopupOpen, setConfirmationPopupOpen] =
    React.useState(false);
 
  const [addPlaceSubmitButtonText, setAddPlaceSubmitButtonText] =
    React.useState("Создать");
  const [editProfileSubmitButtonText, setEditProfileSubmitButtonText] =
    React.useState("Сохранить");
  const [editAvatarSubmitButtonText, setEditAvatarSubmitButtonText] =
    React.useState("Сохранить");
  const [ConfirmationPopupButtonText, setConfirmationPopupButtonText] =
    React.useState("Да");

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [deletedCard, setDeletedCard] = React.useState(null);

  function handleUpdateUser({ name, about }) {
    setEditProfileSubmitButtonText("Сохранение...");
    const token = localStorage.getItem("token");
    api
      .updateUserInfo(name, about, token)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(function () {
        setEditProfileSubmitButtonText("Сохранить");
      });
  }

  function handleAddPlace(card) {
    setAddPlaceSubmitButtonText("Cохранение...");
    const token = localStorage.getItem("token");
    api
      .addNewCard(card, token)
      .then((res) => {
        setCards((cards) => [res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(function () {
        setAddPlaceSubmitButtonText("Создать");
      });
  }

  function handleUpdateAvatar({ avatar }) {
    setEditAvatarSubmitButtonText("Сохранение...");
    const token = localStorage.getItem("token");
    api
      .updateUserAvatar(avatar, token)
      .then((res) => {
        setCurrentUser({
          ...currentUser,
          avatar: avatar,
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(function () {
        setEditAvatarSubmitButtonText("Сохранить");
      });
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setConfirmationPopupOpen(false);
    setSelectedCard(null);
    setDeletedCard(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => {
      return like._id === currentUser._id;
    });
    const token = localStorage.getItem("token");
    api
      .changeLikeCardStatus(card._id, !isLiked, token)
      .then((res) => {
        setCards((cards) => cards.map((c) => (c._id === card._id ? res : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleConfirmCardDelete(card) {
    setConfirmationPopupOpen(true);
    setDeletedCard(card);
  }
  
  function handleCardDelete() {
    const token = localStorage.getItem("token");
    api
      .removeCard(deletedCard._id, token)
      .then((res) => {
        setCards((cards) => cards.filter((c) => c._id != deletedCard._id));
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Main
        cards={cards}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={setSelectedCard}
        onCardLike={handleCardLike}
        onCardDelete={handleConfirmCardDelete}
      />
      <Footer />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
        submitButtonText={editProfileSubmitButtonText}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlace}
        submitButtonText={addPlaceSubmitButtonText}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
        submitButtonText={editAvatarSubmitButtonText}
      />
      <ConfirmationPopup
        isOpen={isConfirmationPopupOpen}
        onClose={closeAllPopups}
        onConfirmAction={handleCardDelete}
        submitButtonText={ConfirmationPopupButtonText}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </>
  );
}

export default UserPage;
