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
const homeButton = document.getElementById("home-button");
const addPlaylistButton = document.getElementsByClassName("bi-plus-lg")[0];
const playlistContainer = document.getElementById("playlist-container");
const sidebarCol = document.getElementById("sidebarCol");
const saveButton = document.getElementById("save-button");

playlistContainer.innerHTML = localStorage.getItem("playlistHTML");

// ADD PLAYLIST

addPlaylistButton.addEventListener("click", () => {
  playlistContainer.innerHTML = localStorage.getItem("playlistHTML");
  const playlistNumber = localStorage.getItem("playlistCounter");
  let playlistCounter = playlistNumber || 1;
  playlistCounter++;

  const newDiv = document.createElement("div");

  newDiv.classList.add(
    "playlist-item",
    "d-flex",
    "gap-2",
    "mb-1",
    "pb-0",
    "pointer",
    "pt-2"
  );
  newDiv.innerHTML = `
  <div  class="div-item d-flex justify-content-center rounded align-items-center " style="width:45px; height:45px">
  
    <i class="bi bi-music-note-beamed fs-3 text-white"></i>
  </div>
  <div class="d-flex flex-column text-white-50">
   <p class="playlist-title text-white fw-bold mb-0">La mia playlist n.${
     playlistNumber || "1"
   }</p>
    <small>
      <p>Playlist &#8226; ${usernameStorage || "Nome utente"}</p>
   </small>
  </div>
  <div class="item-menu text-white d-flex flex-column flex-start d-none">
          <p onclick="deletePlaylist(event)">Elimina playlist</p>
          <p onclick="modifyTitle(event)">Modifica</p>
          <p>Condividi</p>
          <p>Crea Playlist</p>
  </div>`;

  newDiv.addEventListener("contextmenu", function (e) {
    e.preventDefault();
    openItemMenu(e);
  });

  playlistContainer.appendChild(newDiv);
  localStorage.setItem("playlistCounter", playlistCounter);
  localStorage.setItem("playlistHTML", playlistContainer.innerHTML);
  const playlists = Array.from(
    document.getElementsByClassName("playlist-item")
  );
  for (const playlist of playlists) {
    playlist.addEventListener("contextmenu", function () {
      openItemMenu();
    });
  }
  location.reload();
});

// APRE IL MENU NEL SINGOLO ELEMENTO PLAYLIST

const openItemMenu = function (e) {
  e.preventDefault();
  const myDiv = e.target.closest(".playlist-item");
  const itemMenu = myDiv.querySelector(".item-menu");
  itemMenu.classList.remove("d-none");
  itemMenu.style.top = `${e.clientY}px`;
  itemMenu.style.left = `${e.clientX}px`;
};

// ELIMINA LA SINGOLA PLAYLIST

const deletePlaylist = function (e) {
  const myDiv = e.target.closest(".playlist-item");
  myDiv.remove();
  localStorage.setItem("playlistHTML", playlistContainer.innerHTML);
  const playlists = Array.from(
    document.getElementsByClassName("playlist-item")
  );

  playlists.forEach((playlist) => {
    playlist.addEventListener("contextmenu", (e) => {
      openItemMenu(e);
    });
  });
};

// MODIFICA LA SINGOLA PLAYLIST

const modifyTitle = (e) => {
  const myDiv = e.target.closest(".playlist-item");
  const playlistTitle = myDiv.querySelector(".playlist-title");
  const inputElement = document.createElement("input");

  inputElement.classList.add(
    "input-element",
    "form-control-sm",
    "form-control"
  );
  inputElement.value = playlistTitle.innerText;
  playlistTitle.replaceWith(inputElement);
  inputElement.focus();
  inputElement.select();

  inputElement.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const newTitle = document.createElement("p");
      newTitle.innerText = inputElement.value;
      newTitle.classList.add("text-white", "fw-bold", "mb-0", "playlist-title");
      const itemMenu = myDiv.querySelector(".item-menu");

      itemMenu.classList.add("d-none");
      inputElement.replaceWith(newTitle);
      localStorage.setItem("playlistHTML", playlistContainer.innerHTML);
      renderPlaylist();
    }
  });
};

// HOME BUTTON

homeButton.addEventListener("click", () => {
  location.href = "home.html";
});

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
  sidebarCol.style.opacity = 0.2;
  div.style.opacity = 1;
};

userName.addEventListener("click", () => {
  makeDivAppear();
});

// FUNZIONE CHE SALVA IL CONTENUTO DEL FORM E LO METTE COME NOME PROFILO
const saveForm = function (e) {
  e.preventDefault();
  const userNameInput = document.getElementById("username-input");
  userName.innerHTML = userNameInput.value;
  div.classList.add("d-none");
  main.style.opacity = 1;
  footer.style.opacity = 1;
  sidebarCol.style.opacity = 1;
  localStorage.setItem("username", userNameInput.value);
  profileNameNavbar.innerText = localStorage.getItem("username");
  location.reload();
};

form.addEventListener("submit", function (e) {
  saveForm(e);
});

saveButton.addEventListener("click", function (e) {
  saveForm(e);
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

// PLAYLISTS
const playlists = Array.from(document.getElementsByClassName("playlist-item"));

playlists.forEach((playlist) => {
  playlist.addEventListener("contextmenu", (e) => {
    openItemMenu(e);
  });
});

const renderPlaylist = () => {
  playlistContainer.innerHTML = localStorage.getItem("playlistHTML");
  const playlistsToRender = Array.from(
    playlistContainer.querySelectorAll(".item-menu")
  );
  location.reload();
};
