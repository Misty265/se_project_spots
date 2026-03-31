import algea from "../images/algea.jpg";
import city from "../images/city.jpg";
import goldenGate from "../images/golden-gate.jpg";
import mist from "../images/mist.jpg";
import sunset from "../images/sunset.jpg";
import waterfall from "../images/waterfall.jpg";
import waterfall2 from "../images/waterfall2.jpg";
import "./index.css";
import {
  enableValidation,
  settings,
  resetValidation,
} from "../scripts/validation";
import Api from "../scripts/api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    autorization: "178d7092-01b1-48ac-9393-f9f11339a93a",
    "Content-Type": "application/json",
  },
});

api.getUser({ profileName, profileDescription });

const initialCards = [
  {
    name: "Golden gate",
    link: goldenGate,
  },
  {
    name: "Waterfall off mountain",
    link: waterfall2,
  },
  {
    name: "City lights",
    link: city,
  },
  {
    name: "Algea on the rocks",
    link: algea,
  },
  {
    name: "Waterfall in the mountains",
    link: waterfall,
  },
  {
    name: "Misty days",
    link: mist,
  },
  {
    name: "Sunset over snowy beach",
    link: sunset,
  },
];

api.getCards().then((cards) => {
  console.log(cards).json();
  cards.forEach((card) => {
    const cardElement = getCardElement(card);
    cardsList.prepend(cardElement);
  });
});

const cardsList = document.querySelector(".cards__list");

const profileEditButton = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const newPostButton = document.querySelector(".profile__add-btn");

const profileEditModal = document.querySelector("#profile-edit-modal");
const newCardModal = document.querySelector("#new-card-modal");

const closeButtons = document.querySelectorAll(".modal__close-btn");
const modalCloseButtonImage = document.querySelector(
  ".modal__close-btn--image",
);

const profileFormElement = profileEditModal.querySelector("#edit-profile");
const newPostFormElement = newCardModal.querySelector("#new-post");
const editModalNameInput = profileFormElement.querySelector(
  "#profile-name-input",
);
const editModalDescriptionInput = profileFormElement.querySelector(
  "#profile-description-input",
);

const cardImageInput = newCardModal.querySelector("#card-image-input");
const cardImageCaptionInput = newCardModal.querySelector(
  "#image-caption-input",
);

const pictureModal = document.querySelector("#picture-modal");

const modalContainerImage = document.querySelector(".modal__container--image");
const modalImage = pictureModal.querySelector(".modal__image");
const modalLabel = pictureModal.querySelector(".modal__caption");
const modalContainers = document.querySelectorAll(".modal__container");
const profileSubmitButton =
  profileEditModal.querySelector(".modal__submit-btn");
const newPostSubmitButton = newCardModal.querySelector(".modal__submit-btn");

const cardTemplate = document.querySelector("#card");
const formInputList = document.querySelectorAll(".modal__input");

const modals = document.querySelectorAll(".modal");
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__btn");
  const cardDeleteButton = cardElement.querySelector(".card__btn-delete");

  cardLikeButton.addEventListener("click", () => {
    if (cardLikeButton) {
      cardLikeButton.classList.add("card__btn_active");
      api.likeCard();
    } else {
      cardLikeButton.classList.remove("card__btn_active");
      api.dislikeCard();
    }
  });

  cardImage.addEventListener("click", () => {
    modalImage.src = data.link;
    modalImage.alt = data.name;
    modalLabel.textContent = data.name;
    openModal(pictureModal);
  });

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  cardDeleteButton.addEventListener("click", () => {
    cardDeleteButton.closest(".card").remove();
    api.deleteCard();
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", handleEscape);
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    modals.forEach(closeModal);
  }
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(profileEditModal);
  disableButton(profileSubmitButton, settings);
  evt.target.reset();
  api.getUser({ profileName, profileDescription });
}

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();
  const cardElement = getCardElement({
    name: cardImageCaptionInput.value,
    link: cardImageInput.value,
  });
  cardsList.prepend(cardElement);
  closeModal(newCardModal);
  evt.target.reset();
  disableButton(newPostSubmitButton, settings);
}

profileEditButton.addEventListener("click", function (evt) {
  resetValidation(
    profileFormElement,
    [editModalNameInput, editModalDescriptionInput],
    settings,
  );
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

newPostButton.addEventListener("click", function (evt) {
  openModal(newCardModal);
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
newPostFormElement.addEventListener("submit", handleNewPostFormSubmit);

closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

modals.forEach((modalItem) => {
  modalItem.addEventListener("click", (evt) => {
    if (evt.target === modalItem) {
      closeModal(modalItem);
    }
  });
});

pictureModal.addEventListener("click", (evt) => {
  const modal = evt.target.closest(".modal");
  if (evt.target === modal) {
    closeModal(modal);
  }
});

pictureModal.addEventListener("keydown", handleEscape);
enableValidation(settings);
