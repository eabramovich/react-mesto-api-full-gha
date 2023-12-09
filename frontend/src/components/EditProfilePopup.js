import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import { validationConfig } from "../utils/constant";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, submitButtonText }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange, resetForm } =
    useFormAndValidation();

  React.useEffect(() => {
    if (currentUser.name && currentUser.about) {
      resetForm(
        { username: currentUser.name, profession: currentUser.about },
        { username: "", profession: "" },
        true
      );
    }
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: values.username,
      about: values.profession,
    });
  }

  return (
    <PopupWithForm
      name="edit-form"
      title="Редактировать профиль"
      buttonText={submitButtonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        id="username"
        type="text"
        value={values.username ? values.username : ""}
        onChange={handleChange}
        className={`popup__item popup__name ${
          errors.username ? validationConfig.inputErrorClass : ""
        }`}
        name="username"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
      />
      <span
        className={`username-item-error popup__item-error ${
          errors.username ? validationConfig.errorClass : ""
        }`}
      >
        {errors.username}
      </span>
      <input
        id="profession"
        type="text"
        value={values.profession ? values.profession : ""}
        onChange={handleChange}
        className={`popup__item popup__profession ${
          errors.profession ? validationConfig.inputErrorClass : ""
        }`}
        name="profession"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
      />
      <span
        className={`profession-item-error popup__item-error ${
          errors.profession ? validationConfig.errorClass : ""
        }`}
      >
        {errors.profession}
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
