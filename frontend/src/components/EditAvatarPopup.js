import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import { validationConfig } from "../utils/constant";

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  submitButtonText,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  const imgRef = React.useRef();
  const {
    values,
    errors,
    isValid,
    setValues,
    setIsValid,
    handleChange,
    resetForm,
  } = useFormAndValidation();

  React.useEffect(() => {
    imgRef.current.value = "";
    resetForm();
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: imgRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name="update-avatar-form"
      title="Обновить аватар"
      buttonText={submitButtonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        id="avatarlink"
        ref={imgRef}
        onChange={handleChange}
        type="url"
        className={`popup__item popup__avatar-link ${
          errors.avatar ? validationConfig.inputErrorClass : ""
        }`}
        name="avatar"
        placeholder="Ссылка на вашу фотографию"
        required
      />
      <span
        className={`avatarlink-item-error popup__item-error ${
          errors.avatar ? validationConfig.errorClass : ""
        }`}
      >
        {errors.avatar}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
