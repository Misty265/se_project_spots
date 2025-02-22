const initialCards = [
  {
    name: "Winter Whiteout",
    link: "../images/winter-whiteout.jpg",
  },
  {
    name: "Flower in the stars",
    link: "../images/flower-in-the-stars.jpg",
  },
  {
    name: "Algea on the rocks",
    link: "../images/algea.jpg",
  },
  {
    name: "Waterfall in the mountains",
    link: "../images/waterfall.jpg",
  },
  {
    name: "Misty days",
    link: "../images/misty-days.jpg",
  },
  {
    name: "A sky full of stars",
    link: "../images/a-sky-full-of-stars.jpg",
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

const cardTemplate = document.querySelector("#card");

function getCardElement(data) {
  console.log(data);
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = data.link;
  cardTitle.textContent = data.name;

  return cardElement;
}

function openModal() {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal__opened");
}

function closeModal() {
  profileEditModal.classList.remove("modal__opened");
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  profileEditModal.classList.remove("modal__opened");
}

profileEditButton.addEventListener("click", openModal);
modalCloseButton.addEventListener("click", closeModal);
editFormELement.addEventListener("submit", handleProfileFormSubmit);

for (let i = 0; i < initialCards.length; i++) {
  const cardElement = getCardElement(initialCards[i]);
  cardsList.append(cardElement);
}
