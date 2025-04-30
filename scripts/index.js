const initialCards = [
  {
    name: "Golden gate",
    link: "./images/golden-gate.jpg",
  },
  {
    name: "Waterfall off mountain",
    link: "./images/waterfall2.jpg",
  },
  {
    name: "City lights",
    link: "./images/city.jpg",
  },
  {
    name: "Algea on the rocks",
    link: "./images/algea.jpg",
  },
  {
    name: "Waterfall in the mountains",
    link: "./images/waterfall.jpg",
  },
  {
    name: "Misty days",
    link: "./images/mist.jpg",
  },
  {
    name: "Sunset over snowy beach",
    link: "./images/sunset.jpg",
  },
];

const cardsList = document.querySelector(".cards__list");

const profileEditButton = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const newPostButton = document.querySelector(".profile__add-btn");

const profileEditModal = document.querySelector("#profile-edit-modal");
const newCardModal = document.querySelector("#new-card-modal");

const profileModalCloseButton =
  profileEditModal.querySelector(".modal__close-btn");
const newCardModalCloseButton = newCardModal.querySelector(".modal__close-btn");
const profileFormElement = profileEditModal.querySelector("#edit-profile");
const newPostFormElement = newCardModal.querySelector("#new-post");
const editModalNameInput = profileFormElement.querySelector(
  "#profile-name-input"
);
const editModalDescriptionInput = profileFormElement.querySelector(
  "#profile-description-input"
);

const cardImageInput = newCardModal.querySelector("#card-image-input");
const cardImageCaptionInput = newCardModal.querySelector(
  "#image-caption-input"
);

const pictureModal = document.querySelector("#picture-modal");
const modalContainer = picuteModal.querySelector(".modal__container_image");
const modalImage = pictureModal.querySelector(".modal__image");
const modalLabel = pictureModal.querySelector(".modal__caption");
const imageModalCloseButton = pictureModal.querySelector(
  ".modal__close-btn_image"
);

const cardTemplate = document.querySelector("#card");

function getCardElement(data) {
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__btn");
  const cardDeleteButton = cardElement.querySelector(".card__btn-delete");

  cardLikeButton.addEventListener("click", () => {
    cardLikeButton.classList.toggle("card__btn_active");
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
  });

  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  closeModal(profileEditModal);
  evt.target.reset();
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
}

profileEditButton.addEventListener("click", function (item) {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
profileModalCloseButton.addEventListener("click", function (evt) {
  closeModal(profileEditModal);
});
newPostButton.addEventListener("click", function (evt) {
  openModal(newCardModal);
});
newCardModalCloseButton.addEventListener("click", function (evt) {
  closeModal(newCardModal);
});

imageModalCloseButton.addEventListener("click", function (evt) {
  closeModal(pictureModal);
});

profileFormElement.addEventListener("submit", handleProfileFormSubmit);
newPostFormElement.addEventListener("submit", handleNewPostFormSubmit);

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.prepend(cardElement);
});
