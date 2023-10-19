const toggleButton = document.getElementById("toggleButton");
const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");

//
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

const btn = document.getElementById("elimina_pubbl");
btn.addEventListener("click", function () {
  console.log("Pulsante cliccato");
  let cardElement = document.getElementById("cardIn");
  if (cardElement) {
    cardElement.classList.add("delete");
  }
});

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

// FUNZIONE BOTTONE PLAYLIST
const playlistbtn = document.getElementById("azz2");
playlistbtn.addEventListener("click", () => {
  const via = document.getElementById("albumlevate");
  via.classList.add("d-none");
  const realVia = document.getElementById("levate");
  realVia.classList.remove("d-none");
});

// FUNZIONE TEMPORANE PER MUSICA
// DA SPOSTARE POI NELLA FATCH CON L'MP3
const divAudio = document.getElementById("appendi_qui");
const newDiv = document.createElement("div");
newDiv.innerHTML = `
  <audio controls>
<source src="" type="audio/mpeg">
</audio>
  `;
divAudio.appendChild(newDiv);

// play canzone in evidenzia
// FUNZIONE PER FAR SI CHE AL CLICK DELLE CANZONI PARTE LA MUSICA
const getBSong = function (query) {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${query}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Errore nella response");
      }
    })
    .then((data) => {
      console.log(data);
      console.log(data.tracks.data[6].album.cover);
      // cambio le immagini della st
      const getDivImg = document.getElementById("current-song-image");
      getDivImg.innerHTML = ``;
      const NewImgAlbum = document.createElement("div");
      NewImgAlbum.innerHTML = `<img
      src="${data.tracks.data[6].album.cover}"
      alt="song photo"
      width="60px"
      />`;
      // HO USATO QUELL'IMAGINE PERCHè E'LA FUNZIONE ESCLISIVAMENTE PER L'ALBUM IN HOME
      getDivImg.appendChild(NewImgAlbum);

      // cambio h5 e h6 const
      const getDivText = document.getElementById("current-song-info");
      getDivText.innerHTML = ``;
      const newDivText = document.createElement("div");
      newDivText.innerHTML = `<h5>${data.tracks.data[6].title}</h5>
      <h6>${data.tracks.data[6].artist.name}</h6>`;
      getDivText.appendChild(newDivText);

      // parte centrale
      const divAudio = document.getElementById("appendi_qui");
      const newDiv = document.createElement("div");
      console.log(data.tracks.data[0].preview);
      divAudio.innerHTML = ``;
      newDiv.innerHTML = `
        <audio controls autoplay>
  <source src="${data.tracks.data[6].preview}" type="audio/mpeg">
</audio>
        `;
      divAudio.appendChild(newDiv);
    })
    .catch((error) => {
      console.error("Si è verificato un errore:", error);
    });
};

// invoco la funzione al click di play
const bonesBtn = document.getElementById("playBones");
bonesBtn.addEventListener("click", () => {
  getBSong(75621062);
});

// funzione aside amici display e non
const btnx = document.getElementById("x");

const asidegruppo = document.getElementById("aside-right");

btnx.addEventListener("click", () => {
  asidegruppo.classList.toggle("col-2");
  asidegruppo.classList.toggle("m-0");
  asidegruppo.classList.add("d-none");
  asidegruppo.classList.toggle("d-lg-block");
});

const newHeart = document.getElementById("cuoricinoMio");
newHeart.addEventListener("click", () => {
  newHeart.classList.toggle("text-success");
  newHeart.classList.toggle("bi-heart");
  newHeart.classList.toggle("bi-heart-fill");
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

// FUNZIONE CARDS HOME LINKATE Parte con playlist Laterali

// const creaCardsHome = function (query) {
//   fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
//     .then((res) => {
//       if (res.ok) {
//         return res.json();
//       } else {
//         throw new Error("Errore nella response");
//       }
//     })
//     .then((data) => {
//       window.location.href = `artist.html?query=${query}`;
//     })

//     .catch((error) => {
//       console.error("Si è verificato un errore:", error);
//     });
// };

//LINK 10 CARDS
const firstcard = document.getElementById("card1");
firstcard.addEventListener("click", function () {
  creaCardsHome("Summer Playlist");
});
const secondcard = document.getElementById("card2");
secondcard.addEventListener("click", function () {
  creaCardsHome("Friday Playlist");
});
const thirdcard = document.getElementById("card3");
thirdcard.addEventListener("click", function () {
  creaCardsHome("Lavoro da casa");
});
const fourthcard = document.getElementById("card4");
fourthcard.addEventListener("click", function () {
  creaCardsHome("Home sweet Home");
});
const fifthcard = document.getElementById("card5");
fifthcard.addEventListener("click", function () {
  creaCardsHome("Summer Body Workout");
});
const sixthcard = document.getElementById("card6");
sixthcard.addEventListener("click", function () {
  creaCardsHome("Musica per Pulizie di Casa");
});
const seventhcard = document.getElementById("card7");
seventhcard.addEventListener("click", function () {
  creaCardsHome("Jazz Vibes Music");
});
const eightcard = document.getElementById("card8");
eightcard.addEventListener("click", function () {
  creaCardsHome("Imagine Dragons");
});
const ninthcard = document.getElementById("card9");
ninthcard.addEventListener("click", function () {
  creaCardsHome("musica per il buonumore");
});
const tenthcard = document.getElementById("card10");
tenthcard.addEventListener("click", function () {
  creaCardsHome("Musica nella Doccia");
});

// Card a scomparsa

const Wcard = document.getElementById("cardw");
Wcard.addEventListener("click", function () {
  creaCardsHome("Film Estivo");
});
const Xcard = document.getElementById("cardx");
Xcard.addEventListener("click", function () {
  creaCardsHome("Piano");
});
const Ycard = document.getElementById("cardy");
Ycard.addEventListener("click", function () {
  creaCardsHome("Young rap");
});
const Zcard = document.getElementById("cardz");
Zcard.addEventListener("click", function () {
  creaCardsHome("Street Music");
});

//CARD Iniziali

const Acard = document.getElementById("cardA");
Acard.addEventListener("click", function () {
  creaCardsHome("Rock Playlist");
});
const Bcard = document.getElementById("cardB");
Bcard.addEventListener("click", function () {
  creaCardsHome("Dance Music");
});
const Ccard = document.getElementById("cardC");
Ccard.addEventListener("click", function () {
  creaCardsHome("Canzoni per Bambini");
});
const Dcard = document.getElementById("cardD");
Dcard.addEventListener("click", function () {
  creaCardsHome("Sleeping Music");
});
const Ecard = document.getElementById("cardE");
Ecard.addEventListener("click", function () {
  creaCardsHome("Focus Lo-fi");
});
const Fcard = document.getElementById("cardF");
Fcard.addEventListener("click", function () {
  creaCardsHome("Guitar Music");
});



const goHomeMobile = document.getElementById("go-home-mobile");
goHomeMobile.addEventListener("click", () => {
  location.href = "./home.html";
});

const leftArrow = document.getElementsByClassName("bi-chevron-left")[0];
const rightArrow = document.getElementsByClassName("bi-chevron-right")[0];

leftArrow.addEventListener("click", () => {
  if (history.length > 1) {
    history.back();
  }
  CursorState();
});

rightArrow.addEventListener("click", () => {
  history.forward();
  CursorState();
});

const CursorState = () => {
  if (history.length <= 1) {
    leftArrow.classList.add("not-allowed");
  } else {
    leftArrow.classList.remove("not-allowed");
  }
};

CursorState();
