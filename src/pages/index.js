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
  disableButton,
} from "../scripts/validation.js";
import Api from "../utils/api.js";
import { renderLoading, handleSubmit } from "../utils/api.js";

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c0a8b740-b594-48a5-b81f-a1a1d584e322",
    "Content-Type": "application/json",
  },
});

// const initialCards = [
//   {
//     name: "Golden gate",
//     link: goldenGate,
//   },
//   {
//     name: "Waterfall off mountain",
//     link: waterfall2,
//   },
//   {
//     name: "City lights",
//     link: city,
//   },
//   {
//     name: "Algea on the rocks",
//     link: algea,
//   },
//   {
//     name: "Waterfall in the mountains",
//     link: waterfall,
//   },
//   {
//     name: "Misty days",
//     link: mist,
//   },
//   {
//     name: "Sunset over snowy beach",
//     link: sunset,
//   },
// ];

const cardsList = document.querySelector(".cards__list");

const profileImage = document.querySelector(".profile__image");
const profileEditButton = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const newPostButton = document.querySelector(".profile__add-btn");

api
  .getAppInfo()
  .then(([cards, { name, about, avatar }]) => {
    profileName.textContent = name;
    profileDescription.textContent = about;
    profileImage.src = avatar;
    profileImage.alt = name;
    cards.forEach((card) => {
      const cardElement = getCardElement(card);
      cardsList.append(cardElement);
    });
  })
  .catch(console.error);

const profileEditModal = document.querySelector("#profile-edit-modal");
const newCardModal = document.querySelector("#new-card-modal");

const closeButtons = document.querySelectorAll(".modal__close-btn");

const profileFormElement = profileEditModal.querySelector("#edit-profile");
const newPostFormElement = newCardModal.querySelector("#new-post");
const newPostImageInput = newPostFormElement.querySelector("#card-image-input");
const newPostDescriptionInput = newPostFormElement.querySelector(
  "#image-caption-input",
);
const editModalNameInput = profileFormElement.querySelector(
  "#profile-name-input",
);

const editModalDescriptionInput = profileFormElement.querySelector(
  "#profile-description-input",
);

const deleteModal = document.querySelector("#delete-confirmation-modal");
const pictureModal = document.querySelector("#picture-modal");
const avatarEditButton = document.querySelector(".profile__image-edit-btn");
const avatarEditModal = document.querySelector("#edit-avatar-modal");
const avatarEditModalFormElement =
  avatarEditModal.querySelector(".modal__form");
const avatarImageInput = avatarEditModal.querySelector("#avatar-image-input");
const avatarSubmitButton = avatarEditModal.querySelector(
  ".modal__submit-btn-avatar",
);
const deleteBtn = deleteModal.querySelector(".modal__submit-btn_type_confirm");
const modalContainerImage = document.querySelector(".modal__container--image");
const modalImage = pictureModal.querySelector(".modal__image");
const modalLabel = pictureModal.querySelector(".modal__caption");
const modalContainers = document.querySelectorAll(".modal__container");
const profileSubmitButton =
  profileEditModal.querySelector(".modal__submit-btn");
const newPostSubmitButton = newCardModal.querySelector(".modal__submit-btn");

const cardTemplate = document.querySelector("#card");
const formInputList = document.querySelectorAll(".modal__input");
const formSubmitButtons = document.querySelectorAll(".modal__submit-btn");
const deleteModalSubmitButton = deleteModal.querySelector(
  ".modal__submit-btn_type_confirm",
);
let selectedCard;
const cancelBtn = deleteModal.querySelector(".modal__cancel-btn");
const modals = document.querySelectorAll(".modal");
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__btn");
  const cardDeleteButton = cardElement.querySelector(".card__btn-delete");

  cardDeleteButton.addEventListener("click", (evt) => {
    openModal(deleteModal);
    selectedCard = { cardElement, data };
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

  if (data.isLiked) {
    cardLikeButton.classList.add("card__btn_active");
  } else {
    cardLikeButton.classList.remove("card__btn_active");
  }

  cardLikeButton.addEventListener("click", () => {
    if (!data.isLiked) {
      api
        .likeCard({ card: data })
        .then((res) => {
          cardLikeButton.classList.add("card__btn_active");
          data.isLiked = true;
          return res.isLiked;
        })
        .catch(console.error);
    } else {
      api
        .dislikeCard({ card: data })
        .then((res) => {
          cardLikeButton.classList.remove("card__btn_active");
          data.isLiked = false;
          return res.isLiked;
        })
        .catch(console.error);
    }
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
  function makeRequest() {
    return api
      .updateProfile({
        name: editModalNameInput.value,
        about: editModalDescriptionInput.value,
      })
      .then((userData) => {
        profileName.textContent = userData.name;
        profileDescription.textContent = userData.about;
      })
      .finally(() => closeModal(profileEditModal));
  }
  handleSubmit(makeRequest, evt);
}

function handleNewPostSubmit(evt) {
  function makeRequest() {
    return api
      .addCard({
        name: newPostDescriptionInput.value,
        link: newPostImageInput.value,
        _isLiked: false,
      })
      .then((res) => {
        const card = getCardElement(res);
        cardsList.prepend(card);
        return card;
      })
      .finally(() => {
        closeModal(newCardModal);
      });
  }
  handleSubmit(makeRequest, evt);
}

function handleAvatarFormSubmit(evt) {
  function makeRequest() {
    return api
      .updateAvatar({
        avatar: avatarImageInput.value,
      })
      .then((data) => {
        profileImage.src = data.avatar;
        profileImage.alt = data.name;
      })
      .finally(() => {
        closeModal(avatarEditModal);
      });
  }
  handleSubmit(makeRequest, evt);
}

profileEditButton.addEventListener("click", function (evt) {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

newPostButton.addEventListener("click", function (evt) {
  openModal(newCardModal);
});

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

profileFormElement.addEventListener("submit", (evt) => {
  handleProfileFormSubmit(evt);
});

avatarEditModal.addEventListener("submit", (evt) => {
  handleAvatarFormSubmit(evt);
});

newPostFormElement.addEventListener("submit", (evt) => {
  handleNewPostSubmit(evt);
});

avatarEditButton.addEventListener("click", () => {
  openModal(avatarEditModal);
});

function handleConfirmDelete(evt) {
  function makeRequest() {
    return api
      .deleteCard({ card: selectedCard.data })
      .then((res) => {
        selectedCard.cardElement.remove();
      })
      .finally(() => {
        closeModal(deleteModal);
      });
  }
  handleSubmit(makeRequest, evt);
}
deleteModalSubmitButton.addEventListener("click", (evt) => {
  handleConfirmDelete(evt);
});
cancelBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  closeModal(deleteModal);
});

enableValidation(settings);
