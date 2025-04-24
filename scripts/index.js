const initialCards = [
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
const profileFormELement = profileEditModal.querySelector("#edit-profile");
const newPostFormElement = newCardModal.querySelector("#new-post");
const editModalNameInput = profileFormELement.querySelector(
  "#profile-name-input"
);
const editModalDescriptionInput = profileFormELement.querySelector(
  "#profile-description-input"
);

const cardImageInput = newPostFormElement.querySelector("#card-image-input");
const cardImageCaptionInput = newPostFormElement.querySelector(
  "#image-caption-input"
);

initialCards.forEach(function (item) {
  console.log(item.name);
  console.log(item.link);
});

const cardTemplate = document.querySelector("#card");

function getCardElement(data) {
  console.log(data);
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  return cardElement;
}

function openModal(modal) {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
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
}

function hendleNewPostFormSubmit(evt) {
  evt.preventDefault();
}

profileEditButton.addEventListener("click", function (item) {
  openModal(profileEditModal);
});
profileModalCloseButton.addEventListener("click", function (item) {
  closeModal(profileEditModal);
});
newCardModalCloseButton.addEventListener("click", function (item) {
  closeModal(newCardModal);
});
profileFormELement.addEventListener("submit", handleProfileFormSubmit);
newPostButton.addEventListener("click", function (item) {
  openModal(newCardModal);
});
for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  cardsList.prepend(cardElement);
}
