// funzione cerca copiata dalla home.js
const adressBar = new URLSearchParams(location.search);
const albumId = adressBar.get("query");
console.log(albumId);
const toggleButton = document.getElementById("toggleButton");
const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");

//Funzione che serve a far partire la canzone al click sul div
let currentSongIndex = 0;
const singThisSong = function (i) {
  currentSongIndex = i;
  getSong(albumId, currentSongIndex);
};

//funzione per riempire correttamente il div current song al caricamento della pagina
const currentSongDiv = document.getElementById("current-song");
const pageOnLoad = async (query) => {
  try {
    const res = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/album/${query}`
    );
    const data = await res.json();
    const onloadImg = data.tracks.data[0].album.cover;
    const onloadSongTitle = data.title;
    const onloadArtistName = data.tracks.data[0].artist.name;
    console.log(data.tracks.data[0]);

    currentSongDiv.innerHTML = `
<div id="current-song-image" class="p-2 d-flex align-items-center">
<img
  src="${onloadImg}"
  alt="song photo"
  width="65px"
/>
</div>
<div id="current-song-info">
<h5>${onloadSongTitle}</h5>
<h6>${onloadArtistName}</h6>
</div>
<div class="ms-3" id="cuoricino">
<i class="bi bi-heart" onclick=miPiace(event)></i>
</div>`;
  } catch (error) {
    console.log(error);
  }
};

const miPiace = function (e) {
  e.target.classList.toggle("bi-heart");
  e.target.classList.toggle("bi-heart-fill");
  e.target.classList.toggle("text-success");
};

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
      console.log(data);
      console.log(data.tracks);
      const tracksContainer = document.getElementById("album-tracks");
      const image = document.getElementById("image");
      const logoImage = document.getElementById("logo-image");
      image.innerHTML = ``;
      image.innerHTML = `<img
    class="ms-4 mt-4"
    src="${data.cover_big}"
    width="230px"
      alt="image"
    />`;
      logoImage.innerHTML = ``;
      logoImage.innerHTML = ` <img
      class="mt-4"
      src="${data.artist.picture}"
      width="25px"
      height="25px"
      style="border-radius: 50%"
      alt="image"
      />`;
      const titolo = document.getElementById("titolo-album");
      titolo.innerHTML = ``;
      titolo.innerHTML = `${data.title}`;

      const nomegruppo = document.getElementById("name-artist");
      const time = (data.duration / 60).toFixed(2);

      nomegruppo.innerHTML = ``;
      nomegruppo.innerHTML = ` <span class="fw-bold text-white"
      >${data.artist.name}</span
      >
      -${data.release_date} - ${data.nb_tracks} brani, ${time}min`;

      tracksContainer.innerHTML = "";
      data.tracks.data.forEach((song, i) => {
        const canzone = document.createElement("div");
        const time2 = (song.duration / 60).toFixed(2);
        canzone.innerHTML = `<div onclick=singThisSong(${i})
        class="row mb-3 d-flex justify-content-between align-items-center"
        >
        <div class="col-1 text-center">${i + 1}</div>
        <div class="col-6">
        <p class="m-0">${song.title}</p>
        <p class="m-0">${song.artist.name}</p>
        </div>
        <div class="col-3 ps-3">${song.rank}</div>
        <div class="col-2 ps-4">${time2} min</div>
        </div>`;
        tracksContainer.appendChild(canzone);
        generateImage();
      });
      //       // prova
      //       const divAudio = document.getElementById('appendi_qui')
      //       const newDiv = document.createElement("div");
      //       console.log(data.tracks.data[0].preview)
      //         newDiv.innerHTML = `
      //         <audio controls>
      //   <source src="${data.tracks.data[0].preview}" type="audio/mpeg">
      // </audio>
      //         `
      //         // <audio controls><source src="${data.tracks.data[0].link}" type="audio/mpeg"></audio>
      //         divAudio.appendChild(newDiv)
    })
    .catch((error) => {
      console.error("Si è verificato un errore:", error);
    });
};

getAlbum(albumId);

// funzione cuoricino
const cuore = document.getElementById("heart");
cuore.addEventListener("click", () => {
  cuore.classList.toggle("text-success");
  cuore.classList.toggle("bi-heart");
  cuore.classList.toggle("bi-heart-fill");
});

// funzione aside amici display e non
const gruppo = document.getElementById("users");
const btnx = document.getElementById("x");

const asidegruppo = document.getElementById("aside-right");
gruppo.addEventListener("click", () => {
  asidegruppo.classList.toggle("col-2");
  asidegruppo.classList.toggle("m-0");
  // asidegruppo.classList.add("d-none");
  asidegruppo.classList.toggle("d-lg-block");
});
btnx.addEventListener("click", () => {
  asidegruppo.classList.toggle("col-2");
  asidegruppo.classList.toggle("m-0");
  asidegruppo.classList.add("d-none");
  asidegruppo.classList.toggle("d-lg-block");
});

//  FUNZIONE PER INSERIRE GLI ALBUM NELLA BARRA LATERALE SINISTRA

const playlistMenu = document.getElementById("playlist");
const getAlbum2 = function (query) {
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
  for (const id of numeriArrey) getAlbum2(id);
}

// FUNZIONE BOTTONE PLAYLIST
const playlistbtn = document.getElementById("azz2");
playlistbtn.addEventListener("click", () => {
  const via = document.getElementById("albumlevate");
  via.classList.add("d-none");
  const realVia = document.getElementById("levate");
  realVia.classList.remove("d-none");
});

// FUNZIONE PER FAR SI CHE AL CLICK DELLE CANZONI PARTE LA MUSICA
const getSong = function (query, i) {
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
      console.log(data.tracks.data[i].album.cover);
      // cambio le immagini della st
      const getDivImg = document.getElementById("current-song-image");
      getDivImg.innerHTML = ``;
      const NewImgAlbum = document.createElement("div");
      NewImgAlbum.innerHTML = `<img
      src="${data.tracks.data[i].album.cover}"
      alt="song photo"
      width="65px"
      />`;
      getDivImg.appendChild(NewImgAlbum);

      // cambio h5 e h6 const
      const getDivText = document.getElementById("current-song-info");
      getDivText.innerHTML = ``;
      const newDivText = document.createElement("div");
      newDivText.innerHTML = `<h5>${data.tracks.data[i].title}</h5>
      <h6>${data.tracks.data[i].artist.name}</h6>`;
      getDivText.appendChild(newDivText);

      // parte centrale
      // prova
      const divAudio = document.getElementById("appendi_qui");
      const newDiv = document.createElement("div");
      console.log(data.tracks.data[i].preview);
      divAudio.innerHTML = ``;
      newDiv.innerHTML = `
      <audio controls autoplay>
  <source src="${data.tracks.data[i].preview}" type="audio/mpeg">
  </audio>
        `;
      divAudio.appendChild(newDiv);
    })
    .catch((error) => {
      console.error("Si è verificato un errore:", error);
    });
};
// invoco la funzione GET SONG al click di play
const playbtn = document.getElementById("songIn");
playbtn.addEventListener("click", function () {
  getSong(albumId, currentSongIndex);
});

// SELEZIONA L'IMMAGINE DEL PROFILO

const profileImageNavbar = document.querySelector(".dropdown img");
const userIcon = document.querySelector(".dropdown i");

// NOME IMMAGINE PROFILO IN BASE AL LOCAL STORAGE

const profileImageLocalStorage = localStorage.getItem("profileImage");
profileImageNavbar.src = profileImageLocalStorage
  ? profileImageLocalStorage
  : "http://placekitten.com/30/30";
profileImageNavbar.style.width = "30px";
profileImageNavbar.style.heigth = "30px";

if (profileImageLocalStorage) {
  userIcon.classList.add("d-none");
  profileImageNavbar.classList.remove("d-none");
}

// crea un canvas con l'immagine e ne ritorno il context 2d
const draw = function (img) {
  let canvas = document.createElement("canvas");
  let c = canvas.getContext("2d");
  c.width = canvas.width = img.clientWidth;
  c.height = canvas.height = img.clientHeight;
  c.clearRect(0, 0, c.width, c.height);
  c.drawImage(img, 0, 0, img.clientWidth, img.clientHeight);
  return c;
};

// scompone pixel per pixel e ritorna un oggetto con una mappa della loro frequenza nell'immagine
const getColors = function (c) {
  let col,
    colors = {};
  let pixels, r, g, b, a;
  r = g = b = a = 0;
  pixels = c.getImageData(0, 0, c.width, c.height);
  for (let i = 0, data = pixels.data; i < data.length; i += 4) {
    r = data[i];
    g = data[i + 1];
    b = data[i + 2];
    a = data[i + 3];
    if (a < 255 / 2) continue;
    col = rgbToHex(r, g, b);
    if (!colors[col]) colors[col] = 0;
    colors[col]++;
  }
  return colors;
};

// trova il colore più ricorrente data una mappa di frequenza dei colori
const findMostRecurrentColor = function (colorMap) {
  let highestValue = 0;
  let mostRecurrent = null;
  for (const hexColor in colorMap) {
    if (colorMap[hexColor] > highestValue) {
      mostRecurrent = hexColor;
      highestValue = colorMap[hexColor];
    }
  }
  return mostRecurrent;
};

// converte un valore in rgb a un valore esadecimale
const rgbToHex = function (r, g, b) {
  if (r > 255 || g > 255 || b > 255) {
    throw "Invalid color component";
  } else {
    return ((r << 16) | (g << 8) | b).toString(16);
  }
};

// inserisce degli '0' se necessario davanti al colore in esadecimale per renderlo di 6 caratteri
const pad = function (hex) {
  return ("000000" + hex).slice(-6);
};

const generateImage = function () {
  // genero dinamicamente un tag <img /> in un <div> vuoto
  const imgForAvgColor = document.querySelector("#image img");
  console.log(imgForAvgColor);
  urlAlbumCover = imgForAvgColor.src;
  let imageSrc = urlAlbumCover;
  const newContainer = document.createElement("div");
  newContainer.style.position = "absolute";
  newContainer.style.right = "2000px";
  const body = document.getElementsByTagName("body")[0];
  console.log(body);
  body.appendChild(newContainer);

  // l'event listener "onload" nel tag <img /> si occupa di lanciare la funzione "start()" solamente
  // al termine del caricamento della src
  newContainer.innerHTML = `
    <img
    style="position: absolute; "
      src=${imageSrc}
      id="img"
      crossorigin="anonymous"
      onload="start()"
    />`;
};

const start = function () {
  // prendo il riferimento all'immagine del dom
  let imgReference = document.querySelector("#img");

  // creo il context 2d dell'immagine selezionata
  let context = draw(imgReference);

  // creo la mappa dei colori più ricorrenti nell'immagine
  let allColors = getColors(context);

  // trovo colore più ricorrente in esadecimale
  let mostRecurrent = findMostRecurrentColor(allColors);

  // se necessario, aggiunge degli '0' per rendere il risultato un valido colore esadecimale
  let mostRecurrentHex = pad(mostRecurrent);

  // console.log del risultato
  console.log(mostRecurrentHex);
  const albumSection = Array.from(document.querySelectorAll("#color > div"));
  for (const section of albumSection) {
    section.classList.remove("bg-secondary");
    section.style.backgroundColor = `#${mostRecurrentHex}`;
  }

  console.log(albumSection);
};

pageOnLoad(albumId);
