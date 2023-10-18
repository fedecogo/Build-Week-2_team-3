const pencilIcon = document.getElementById("pencil");
const personIcon = document.getElementById("person");
const iconsContainer = document.getElementById("icons-container");
const threeDots = document.getElementsByClassName("bi-three-dots")[0];
const userName = document.getElementById("username");
const div = document.getElementById("form-container");
const form = document.getElementsByTagName("form")[0];
const main = document.getElementsByTagName("main")[0];
const footer = document.getElementsByTagName("footer")[0];
const profileNameNavbar = document.querySelector(".dropdown .fw-bold");
const profileImageNavbar = document.querySelector(".dropdown img");
const cancelButton = document.getElementById("cancel-button");

// HOVER ICONE - IMMAGINE PROFILO
personIcon.addEventListener("mouseover", () => {
  if (iconsContainer.style.backgroundImage !== "none") {
    pencilIcon.classList.remove("d-none");
    personIcon.classList.add("d-none");
  }
});

pencilIcon.addEventListener("mouseleave", () => {
  if (iconsContainer.style.backgroundImage !== "none") {
    pencilIcon.classList.add("d-none");
    personIcon.classList.remove("d-none");
  }
});

// FUNZIONE PER INSERIRE L'IMMAGINE PROFILO

const openImageUploader = function openImageUploader() {
  const imageUpload = document.getElementById("image-upload");
  imageUpload.click();
  pencilIcon.click();
};

let profileImageDataURL;

const displaySelectedImage = function () {
  const imageUpload = document.getElementById("image-upload");
  const selectedImage = imageUpload.files[0];

  if (selectedImage) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const dataURL = event.target.result;
      profileImageDataURL = dataURL; // Store the profile image data URL
      const styleContainer = iconsContainer.style;
      styleContainer.backgroundImage = `url('${profileImageDataURL}')`;
      styleContainer.backgroundSize = "cover";
      styleContainer.backgroundRepeat = "no-repeat";
      styleContainer.backgroundPosition = "center center";
      profileImageNavbar.src = profileImageDataURL;
      profileImageNavbar.style.width = "30px";
      profileImageNavbar.style.heigth = "30px";
      localStorage.setItem("profileImage", profileImageDataURL);
    };
    reader.readAsDataURL(selectedImage);
  }
  if (iconsContainer.style.backgroundImage !== "none") {
    console.log("The div has a background image.");
    personIcon.classList.add("d-none");
    personIcon.classList.remove("bi");
    personIcon.classList.remove("bi-person");
    iconsContainer.addEventListener("mouseover", () => {
      pencilIcon.classList.remove("d-none");
    });
    iconsContainer.addEventListener("mouseleave", () => {
      pencilIcon.classList.add("d-none");
    });
  } else {
    console.log("The div does not have a background image.");
  }
};

// FUNZIONE PER CAMBIARE NOME UTENTE
const makeDivAppear = () => {
  div.classList.remove("d-none");
  main.style.opacity = 0.2;
  footer.style.opacity = 0.2;
  div.style.opacity = 1;
};

userName.addEventListener("click", () => {
  makeDivAppear();
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const userNameInput = document.getElementById("username-input");
  userName.innerHTML = userNameInput.value;
  div.classList.add("d-none");
  main.style.opacity = 1;
  footer.style.opacity = 1;
  localStorage.setItem("username", userNameInput.value);
  profileNameNavbar.innerText = localStorage.getItem("username");
});

// BOTTONE PER ANNULLARE MODIFICA NOME PROFILO

cancelButton.addEventListener("click", () => {
  div.classList.add("d-none");
  main.style.opacity = 1;
  footer.style.opacity = 1;
});

// NOME PROFILO, se non c'è il local storage metterà "nome utente"
const usernameStorage = localStorage.getItem("username");
userName.innerHTML = usernameStorage ? usernameStorage : "Nome utente";

profileNameNavbar.innerText = usernameStorage ? usernameStorage : "Nome utente";

// IMMAGINE PROFILO, se non c'è il local storage metterà "http://placekitten.com/30/30"
const profileImageLocalStorage = localStorage.getItem("profileImage");
profileImageNavbar.src = profileImageLocalStorage
  ? profileImageLocalStorage
  : "http://placekitten.com/30/30";
profileImageNavbar.style.width = "30px";
profileImageNavbar.style.heigth = "30px";
const styleContainer = iconsContainer.style;

styleContainer.backgroundImage = `url('${profileImageLocalStorage}')`;
styleContainer.backgroundSize = "cover";
styleContainer.backgroundRepeat = "no-repeat";
styleContainer.backgroundPosition = "center center";

if (iconsContainer.style.backgroundImage !== "none") {
  console.log("The div has a background image.");
  personIcon.classList.add("d-none");
  personIcon.classList.remove("bi");
  personIcon.classList.remove("bi-person");
  iconsContainer.addEventListener("mouseover", () => {
    pencilIcon.classList.remove("d-none");
  });
  iconsContainer.addEventListener("mouseleave", () => {
    pencilIcon.classList.add("d-none");
  });
}

// PRENDO LA PRIMA OPZIONE DEL MENU A TENDINA
const editProfile = document.getElementById("edit-profile");
editProfile.addEventListener("click", () => {
  makeDivAppear();
  openImageUploader();
});
