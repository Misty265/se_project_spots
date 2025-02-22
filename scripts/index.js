const initialCards = [
  {
    name: "Winter Whiteout",
    link: "https://unsplash.com/photos/a-black-and-white-photo-of-a-snowy-park-hqKEIg8SdLY",
  },
  {
    name: "Flower in the stars",
    link: "https://unsplash.com/photos/the-night-sky-is-filled-with-stars-and-a-yellow-flower-KEINy-0eDuk",
  },
  {
    name: "Algea on the rocks",
    link: "https://unsplash.com/photos/a-rocky-beach-with-green-algae-growing-in-the-water-QRVY1g2URDA",
  },
  {
    name: "Waterfall in the mountains",
    link: "https://unsplash.com/photos/a-large-waterfall-is-in-the-middle-of-a-mountain-AhM0yBuW1_I",
  },
  {
    name: "Misty days",
    link: "https://unsplash.com/photos/a-village-in-the-mountains-covered-in-snow-k-uOL1vBUxM",
  },
  {
    name: "A sky full of stars",
    link: "https://unsplash.com/photos/a-night-sky-with-stars-and-a-silhouette-of-a-person-HofZ13d2H94",
  },
];

const profileEditButton = document.querySelector(".profile__edit-btn");
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const profileEditModal = document.querySelector("#edit-modal");
const modalCloseButton = profileEditModal.querySelector(".modal__close-btn");
const editModalNameInput = profileEditModal.querySelector(
  "#profile-name-input"
);
const editModalDescriptionInput = profileEditModal.querySelector(
  "#profile-description-input"
);

function openModal() {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal__opened");
}

function closeModal() {
  profileEditModal.classList.remove("modal__opened");
}

profileEditButton.addEventListener("click", openModal);
modalCloseButton.addEventListener("click", closeModal);
