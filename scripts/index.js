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

const profileEditModal = document.querySelector("#edit-modal");
const modalCloseButton = profileEditModal.querySelector(".modal__close-btn");
const editFormELement = profileEditModal.querySelector(".modal__form");
const editModalNameInput = editFormELement.querySelector("#profile-name-input");
const editModalDescriptionInput = profileEditModal.querySelector(
  "#profile-description-input"
);

initialCards.forEach(function (item) {
  console.log(item.name);
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

profileEditButton.addEventListener("click", openModal(profileEditModal));
modalCloseButton.addEventListener("click", closeModal(profileEditModal));
editFormELement.addEventListener("submit", handleProfileFormSubmit);

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  cardsList.append(cardElement);
}
