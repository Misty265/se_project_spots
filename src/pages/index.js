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

api
  .getAppInfo()
  .then(([cards, { name, about, avatar }]) => {
    cards.forEach((card) => {
      const cardElement = getCardElement(card);
      cardsList.prepend(cardElement);
    });
    profileName.textContent = name;
    profileDescription.textContent = about;
    profileImage.src = avatar;
    profileImage.alt = name;
    return;
  })
  .catch(console.error);

const cardsList = document.querySelector(".cards__list");

const profileImage = document.querySelector(".profile__image");
const profileEditButton = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const newPostButton = document.querySelector(".profile__add-btn");

const profileEditModal = document.querySelector("#profile-edit-modal");
const newCardModal = document.querySelector("#new-card-modal");

const closeButtons = document.querySelectorAll(".modal__close-btn");

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

const avatarEditButton = document.querySelector(".profile__image-edit-btn");
const avatarEditModal = document.querySelector("#edit-avatar-modal");
const avatarImageInput = avatarEditModal.querySelector("#avatar-image-input");
const avatarSubmitButton = avatarEditModal.querySelector(
  ".modal__submit-btn-avatar",
);

const modalContainerImage = document.querySelector(".modal__container--image");
const modalImage = pictureModal.querySelector(".modal__image");
const modalLabel = pictureModal.querySelector(".modal__caption");
const modalContainers = document.querySelectorAll(".modal__container");
const profileSubmitButton =
  profileEditModal.querySelector(".modal__submit-btn");
const newPostSubmitButton = newCardModal.querySelector(".modal__submit-btn");
const deleteModal = document.querySelector("#delete-confirmation-modal");
const cardTemplate = document.querySelector("#card");
const formInputList = document.querySelectorAll(".modal__input");
const formSubmitButtons = document.querySelectorAll(".modal__submit-btn");
const deleteModalSubmitButton = deleteModal.querySelector(
  ".modal__submit-btn_type_confirm",
);
const modals = document.querySelectorAll(".modal");
function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__btn");
  const cardDeleteButton = cardElement.querySelector(".card__btn-delete");
  const deleteBtn = deleteModal.querySelector(
    ".modal__submit-btn_type_confirm",
  );
  const cancelBtn = deleteModal.querySelector(".modal__cancel-btn");

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__btn_active");
    if (cardLikeButton.classList.contains("card__btn_active")) {
      api.likeCard({ card: data }).then((res) => {
        if (card._checkRes(res)) {
          card._isLiked = true;
          card._likes++;
          return;
        } else {
          console.error(res.error);
        }
      });
    } else {
      api.dislikeCard({ card: data }).then((res) => {
        if (card._checkRes(res) && card._isLiked && card._likes > 0) {
          card._isLiked = false;
          card._likes--;
          return;
        } else {
          console.error(res.error);
        }
      });
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

  cardDeleteButton.addEventListener("click", (evt) => {
    if (evt === deleteBtn) {
      openModal(deleteModal);
      evt.preventDefault();
    }

    deleteModal.addEventListener("click", (evt) => {
      if (evt.target === deleteModalSubmitButton) {
        api
          .deleteCard({ card: data })
          .then((res) => {
            if (card._checkRes(res)) {
              cardDeleteButton.closest(".card").remove();
            }
          })
          .catch(console.error);
        if (evt.target === cancelBtn) {
          closeModal(deleteModal);
        } else {
          closeModal(deleteModal);
        }
      }
    });

    return cardElement;
  });
}

function renderLoading(isLoading) {
  formSubmitButtons.forEach((button) => {
    if (isLoading) {
      if (button.contains("modal__submit-btn_type_confirm")) {
        button.textContent = "Deleting...";
      } else {
        button.textContent = "Saving...";
      }
    } else {
      {
        if (button.contains(!"modal__submit-btn")) {
          button.textContent = "Delete";
        } else {
          button.textContent = "Save";
        }
      }
    }
  });
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
  api
    .updateProfile({
      name: editModalNameInput.value,
      about: editModalDescriptionInput.value,
    })
    .then((data) => {
      return [
        (profileName.textContent = data.name),
        (profileDescription.textContent = data.about),
      ];
    });
  closeModal(profileEditModal);
  disableButton(profileSubmitButton, settings);
}

formSubmitButtons.forEach((button) => {
  button.addEventListener("click", () => {
    renderLoading(true);
  });
});

function handleNewPostFormSubmit(evt) {
  evt.preventDefault();
  const cardElement = api
    .addCard({
      name: cardImageCaptionInput.value,
      link: cardImageInput.value,
    })
    .then((res) => {
      if (card._checkRes(res)) {
        cardsList.prepend(cardElement);
        closeModal(newCardModal);
        disableButton(newPostSubmitButton, settings);
      }
    });
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  api
    .updateAvatar({
      avatar: avatarImageInput.value,
    })
    .then((data) => {
      profileImage.src = data.avatar;
      profileImage.alt = data.name;
    });
  closeModal(avatarEditModal);
  disableButton(avatarSubmitButton, settings);
}

avatarSubmitButton.addEventListener("click", handleAvatarFormSubmit);

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

avatarEditButton.addEventListener("click", () => {
  openModal(avatarEditModal);
  disableButton(avatarSubmitButton, settings);
});
renderLoading(false);
pictureModal.addEventListener("keydown", handleEscape);
deleteModal.addEventListener("keydown", handleEscape);
enableValidation(settings);
