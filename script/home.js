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
<source src="https://commondatastorage.googleapis.com/codeskulptor-assets/Evillaugh.ogg" type="audio/mpeg">
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
      console.log(data.tracks.data[0].album.cover);
      // cambio le immagini della st
      const getDivImg = document.getElementById("current-song-image");
      getDivImg.innerHTML = ``;
      const NewImgAlbum = document.createElement("div");
      NewImgAlbum.innerHTML = `<img
      src="assets/imgs/main/image-11.jpg"
      alt="song photo"
      width="60px"
      />`;
      // HO USATO QUELL'IMAGINE PERCHè E'LA FUNZIONE ESCLISIVAMENTE PER L'ALBUM IN HOME
      getDivImg.appendChild(NewImgAlbum);

      // cambio h5 e h6 const
      const getDivText = document.getElementById("current-song-info");
      getDivText.innerHTML = ``;
      const newDivText = document.createElement("div");
      newDivText.innerHTML = `<h5>${data.tracks.data[0].title}</h5>
      <h6>Mercury</h6>`;
      getDivText.appendChild(newDivText);

      // parte centrale
      const divAudio = document.getElementById("appendi_qui");
      const newDiv = document.createElement("div");
      console.log(data.tracks.data[0].preview);
      divAudio.innerHTML = ``;
      newDiv.innerHTML = `
        <audio controls autoplay>
  <source src="${data.tracks.data[0].preview}" type="audio/mpeg">
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
  getBSong(302204417);
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
