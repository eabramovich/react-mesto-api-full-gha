import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useFormAndValidation } from "../hooks/useFormAndValidation";
import { validationConfig } from "../utils/constant";

function AddPlacePopup({ isOpen, onClose, onAddPlace, submitButtonText }) {

  const { values, errors, isValid, handleChange, resetForm } =
    useFormAndValidation();

  React.useEffect(() => {
    resetForm(
      { placename: "", placelink: "" },
      { placename: "", placelink: "" },
      false
    );
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      link: values.placelink,
      name: values.placename,
    });
  }

  return (
    <PopupWithForm
      name="add-form"
      title="Новое место"
      buttonText={submitButtonText}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        id="placename"
        type="text"
        value={values.placename ? values.placename : ""}
        onChange={handleChange}
        className={`popup__item popup__place-name ${
          errors.placename ? validationConfig.inputErrorClass : ""
        }`}
        name="placename"
        placeholder="Название"
        minLength="2"
        maxLength="30"
        required
      />
      <span
        className={`placename-item-error popup__item-error ${
          errors.placename ? validationConfig.errorClass : ""
        }`}
      >
        {errors.placename}
      </span>
      <input
        id="placelink"
        type="url"
        value={values.placelink ? values.placelink : ""}
        onChange={handleChange}
        className={`popup__item popup__place-link ${
          errors.placelink ? validationConfig.inputErrorClass : ""
        }`}
        name="placelink"
        placeholder="Ссылка на картинку"
        required
      />
      <span
        className={`placelink-item-error popup__item-error ${
          errors.placelink ? validationConfig.errorClass : ""
        }`}
      >
        {errors.placelink}
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
