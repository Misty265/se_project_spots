const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn-disabled",
  inputErrorClass: "modal__input-error",
  errorClass: "modal__error",
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElementID = inputElement.id + "-error";
  const errorElement = formElement.querySelector("#" + errorElementID);
  errorElement.textContent = errorMessage;
  inputElement.classList.add(config.inputErrorClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElementID = inputElement.id + "-error";
  const errorElement = formElement.querySelector("#" + errorElementID);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const hasInvalidInput = (formInputList) => {
  return formInputList.some((input) => !input.validity.valid);
};

const disableButton = (buttonElement, config) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(config.inactiveButtonClass);
};

const resetValidation = (formElement, formInputList, config) => {
  formInputList.forEach((input) => {
    hideInputError(formElement, input, config);
  });
};

const toggleButtonState = (formInputList, buttonElement, config) => {
  if (hasInvalidInput(formInputList)) {
    disableButton(buttonElement, config);
  } else {
    buttonElement.classList.remove(config.inactiveButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement, config) => {
  const formInputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  toggleButtonState(formInputList, buttonElement, config);
  formInputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, config);
      toggleButtonState(formInputList, buttonElement, config);
    });
    inputElement.addEventListener("keydown", (evt) => {
      if (evt.key === "Enter") {
        openModal(modal);
      }
      if (evt.key === "Escape") {
        closeModal(modal);
      }
      if (evt.target === newPostFormElement || formInputList) {
        openModal(modal);
      }
    });
  });
};

const enableValidation = (config) => {
  const formList = document.querySelectorAll(config.formSelector);
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

enableValidation(settings);
