const addressBarContent = new URLSearchParams(location.search);
const name_artist = addressBarContent.get("query");

console.log(name_artist);

const getArtist = function (query) {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nella response");
      }
    })
    .then((data) => {
      console.log(data);


      const contentRow = document.getElementById("h1_titolo");
      contentRow.innerHTML = "";
      const h1Element = document.createElement("h1");
      h1Element.textContent = data.data[0].artist.name;
      contentRow.appendChild(h1Element);

      const songDetails = document.getElementById("appendi_song");
      songDetails.innerHTML = "";
      const songDetailsHTML = `
        <div class="row mb-3 d-flex justify-content-between align-items-center">
          <div class="col-1 text-center">1</div>
          <div class="col-1 text-center">
            <img class="me-1" src="${data.data[0].album.cover}" width="30px">
          </div>
          <div class="col-6">
            <p class="m-0">${data.data[0].title}</p>
          </div>
          <div class="col-2 ps-3">${data.data[0].rank}</div>
          <div class="col-2 ps-4 d-none d-md-block">${data.data[0].duration}</div>
        </div>
        <div class="row mb-3 d-flex justify-content-between align-items-center">
          <div class="col-1 text-center">2</div>
          <div class="col-1 text-center">
            <img class="me-1" src="${data.data[1].album.cover}" width="30px">
          </div>
          <div class="col-6">
            <p class="m-0">${data.data[1].title}</p>
          </div>
          <div class="col-2 ps-3">${data.data[1].rank}</div>
          <div class="col-2 ps-4 d-none d-md-block">${data.data[1].duration}</div>
        </div>
        <div class="row mb-3 d-flex justify-content-between align-items-center">
          <div class="col-1 text-center">3</div>
          <div class="col-1 text-center">
            <img class="me-1" src="${data.data[2].album.cover}" width="30px">
          </div>
          <div class="col-6">
            <p class="m-0">${data.data[2].title}</p>
          </div>
          <div class="col-2 ps-3">${data.data[2].rank}</div>
          <div class="col-2 ps-4 d-none d-md-block">${data.data[2].duration}</div>
        </div>
        <div class="row mb-3 d-flex justify-content-between align-items-center">
          <div class="col-1 text-center">4</div>
          <div class="col-1 text-center">
            <img class="me-1" src="${data.data[3].album.cover}" width="30px">
          </div>
          <div class="col-6">
            <p class="m-0">${data.data[3].title}</p>
          </div>
          <div class="col-2 ps-3">${data.data[3].rank}</div>
          <div class="col-2 ps-4 d-none d-md-block ">${data.data[3].duration}</div>
        </div>
        <div class="row mb-3 d-flex justify-content-between align-items-center">
          <div class="col-1 text-center">5</div>
          <div class="col-1 text-center">
            <img class="me-1" src="${data.data[4].album.cover}" width="30px">
          </div>
          <div class="col-6">
            <p class="m-0">${data.data[4].title}</p>
          </div>
          <div class="col-2 ps-3">${data.data[4].rank}</div>
          <div class="col-2 ps-4 d-none d-md-block">${data.data[4].duration}</div>
        </div>
        `;
      songDetails.innerHTML = songDetailsHTML;
      const wallpaperImg = document.getElementById("wallpaper-img");
      wallpaperImg.style.backgroundImage = `url('${data.data[0].artist.picture_xl}')`;

      // aggiiungere albumalla row
      // da sistemare card per album
      // chiedere a stefano se serve unaltra fatch con  https://striveschool-api.herokuapp.com/api/deezer/album/75621062

      const newRow = document.getElementById("appAlbum");
      newRow.innerHTML = "";
      const newRowHTML = `
      <div class="col-xs-6 col-md-4 m-3 m-md-0" >
      <a href="album.html?query=${data.data[0].album.id}" class="text-decoration-none" >
        <div class="card bg-dark  text-white h-100 " id="cardalbum1">
        <div class="card-body">
          <img src="${data.data[0].album.cover_medium}" max-width="200px"  alt="..." class="img-fluid" />
            <h5 class="card-title mt-3">${data.data[0].album.title}</h5>
                 </div>
        </div>
        </a>
  </div>
  
  <div class="col-xs-6 col-md-4 m-3 m-md-0" >
  <a href="album.html?query=${data.data[1].album.id}" class="text-decoration-none" >
    <div class="card bg-dark  text-white h-100 " id="cardalbum2">
    <div class="card-body">
      <img src="${data.data[1].album.cover_medium}" max-width="200px"  alt="..." class="img-fluid"/>
        <h5 class="card-title mt-3">${data.data[1].album.title}</h5>
             </div>
    </div>
    </a>
  </div>
  <div class="col-xs-6 col-md-4 m-3 m-md-0" >
  <a href="album.html?query=${data.data[2].album.id}" class="text-decoration-none" >
    <div class="card bg-dark  text-white h-100 " id="cardalbum3">
    <div class="card-body">
      <img src="${data.data[2].album.cover_medium}" max-width="200px"  alt="..." class="img-fluid"/>
        <h5 class="card-title mt-3">${data.data[2].album.title}</h5>
             </div>
    </div>
    </a>
  </div>
 
`;

      newRow.innerHTML = newRowHTML;
      const divAudio = document.getElementById("appendi_qui");
      const newDiv = document.createElement("div");
      newDiv.innerHTML = `
  <audio controls>
<source src="https://commondatastorage.googleapis.com/codeskulptor-assets/Evillaugh.ogg" type="audio/mpeg">
</audio>
  `;
      divAudio.appendChild(newDiv);

      // CREAZIONE DINAMICA DEI BRANI CHE MI PIACCIONO
      const artistName = data.data[0].artist.name
      const artistPicture = data.data[0].artist.picture_small
      const numberOfLike = Math.ceil(Math.random() * 15)
      const iLike = document.getElementById("brani-piacciono-desktop")
      iLike.innerHTML = `<div class="me-2">
        <img src="${artistPicture}" alt="" class="rounded-circle" width="60px">
        </div>
        <div>
        <p class="fw-medium mb-0 text-nowrap fs-6">Hai messo mi piace a ${numberOfLike} brani</p>
        <p class="text-secondary fw-light my-0 py-0">Di ${artistName}</p>
        </div>
        `
      const iLikeMobile = document.getElementById("brani-piacciono-mobile")
      iLikeMobile.innerHTML = `<div class="d-flex align-items-center mt-2 ms-2">
        <div class="me-2">
        <img src="${artistPicture}" alt="" class="rounded-circle" width="60px">
        </div>
        <div>
        <p class="fw-medium mb-0 text-nowrap fs-6">Brani che ti piacciono</p>
        <p class="text-secondary fw-light my-0 py-0">${numberOfLike} brani di ${artistName}</p>
        </div>
        </div>
        `


    })
    .catch((error) => {
      console.error("Si è verificato un errore:", error);
    });
};

getArtist(name_artist);

// funzione per il bottone segui
const button = document.getElementById("toggleButton2");

button.addEventListener("click", function () {
  if (button.textContent.trim() === "Segui") {
    button.textContent = "Seguito";
    button.classList.remove("btn-outline-light");
    button.classList.add("btn-light");
  } else {
    button.textContent = "Segui";
    button.classList.remove("btn-light");
    button.classList.add("btn-outline-light");
  }
});

// funzione cerca copiata della home.js
const toggleButton = document.getElementById("toggleButton");
const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");

toggleButton.addEventListener("click", () => {
  searchBar.classList.toggle("hidden");
});

searchButton.addEventListener("click", () => {
  const query = searchBar.querySelector("input").value;
  if (query) {
    getImages(query);
  }
});

const getImages = function (query) {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nella response");
      }
    })
    .then((data) => {
      window.location.href = `artist.html?query=${query}`;
    })
    .catch((error) => {
      console.error("Si è verificato un errore:", error);
    });
};

//  FUNZIONE PER INSERIRE GLI ALBUM NELLA BARRA LATERALE SINISTRA

const playlistMenu = document.getElementById("playlist");
const getAlbum = function (query) {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${query}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nella response");
      }
    })
    .then((data) => {
      const app = document.getElementById("albumlevate");
      const card = document.createElement("div");
      card.innerHTML = `<a class="text-decoration-none text-white" href="album.html?query=${data.id}"><div class="d-flex align-items-center mt-2"><img src="${data.cover_medium}" width="30px" height="30px" /><p>${data.title}<p></div><a>`;
      app.appendChild(card);
      console.log(data);
    })
    .catch((error) => {
      console.error("Si è verificato un errore:", error);
    });
};

// FUNZIONE BOTTONE ALBUM
const albumbtn = document.getElementById("azz");
albumbtn.addEventListener("click", () => {
  const via = document.getElementById("levate");
  via.classList.add("d-none");
  const numeriArrey = [
    6415260, 12207660, 455130, 454043, 1262014, 464515625, 95829922,
  ];
  invocagetalbum(numeriArrey);
  const fakeVia = document.getElementById("albumlevate");
  fakeVia.classList.remove("d-none");
});
function invocagetalbum(numeriArrey) {
  for (const id of numeriArrey) getAlbum(id);
}

// funzione aside amici display e non
const btnx = document.getElementById("x");

const asidegruppo = document.getElementById("aside-right");

btnx.addEventListener("click", () => {
  asidegruppo.classList.toggle("col-2");
  asidegruppo.classList.toggle("m-0");
  asidegruppo.classList.add("d-none");
  asidegruppo.classList.toggle("d-lg-block");
});

// FUNZIONE BOTTONE PLAYLIST
const playlistbtn = document.getElementById("azz2");
playlistbtn.addEventListener("click", () => {
  const via = document.getElementById("albumlevate");
  via.classList.add("d-none");
  const realVia = document.getElementById("levate");
  realVia.classList.remove("d-none");
});

//CLICK BUTTON MUSIC AND EVENT

const butE = document.getElementById("butEvent");
const butM = document.getElementById("butMusic");
butM.addEventListener("click", () => {
  // butE.classList.remove('btn-outline-success')
  // butE.classList.add("btn-outline-dark")
  // butM.classList.toggle("btn-outline-dark");
  // butM.classList.toggle("btn-outline-success");
  butM.classList.add('text-white', 'border-bottom', 'border-3', 'border-success')
  butE.classList.remove('text-white', 'border-bottom', 'border-3', 'border-success')
});

butE.addEventListener("click", () => {
  // butM.classList.remove('btn-outline-success')
  // butM.classList.add("btn-outline-dark")
  // butE.classList.toggle("btn-outline-dark");
  // butE.classList.toggle("btn-outline-success");
  butE.classList.add('text-white', 'border-bottom', 'border-3', 'border-success')
  butM.classList.remove('text-white', 'border-bottom', 'border-3', 'border-success')
});

// SELEZIONA IL NOME E L'IMMAGINE PROFILO

const profileImageNavbar = document.querySelector(".dropdown img");
const profileNameNavbar = document.querySelector(".dropdown .fw-bold");

// NOME UTENTE E IMMAGINE PROFILO IN BASE AL LOCAL STORAGE
const usernameStorage = localStorage.getItem("username");
profileNameNavbar.innerText = usernameStorage ? usernameStorage : "Nome utente";

const profileImageLocalStorage = localStorage.getItem("profileImage");
profileImageNavbar.src = profileImageLocalStorage
  ? profileImageLocalStorage
  : "http://placekitten.com/30/30";
profileImageNavbar.style.width = "30px";
profileImageNavbar.style.heigth = "30px";

//button shuffle
const butShuffle = document.getElementById("shuffle")
butShuffle.addEventListener("click", function () {
  butShuffle.classList.toggle("text-secondary")
  butShuffle.classList.toggle("text-success")
})

