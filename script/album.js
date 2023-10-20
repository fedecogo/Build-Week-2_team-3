// funzione cerca url
const adressBar = new URLSearchParams(location.search);
const albumId = adressBar.get("query");
const toggleButton = document.getElementById("toggleButton");
const searchBar = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton");
let colorToConvert;

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
      // Funzione per far si che al click del nome dell artista ti porta alla sua pagina artist
      const goToArtistBtn = document.getElementById("name-artist");
      const dataArtist = data.artist.name;
      goToArtistBtn.addEventListener("click", () => {
        window.location.href = `artist.html?query=${dataArtist}`;
      });

      const tracksContainer = document.getElementById("album-tracks");
      const image = document.getElementById("image");
      const logoImage = document.getElementById("logo-image");
      image.innerHTML = ``;
      image.innerHTML = `<img
    class="ms-4 mt-4 border border-secondary-subtle shadow"
    src="${data.cover_big}"
    width="230px"
      alt="image"
    />`;
      logoImage.innerHTML = ``;
      logoImage.innerHTML = ` <img
      class="mt-4 shadow-sm "
      src="${data.artist.picture}"
      width="25px"
      height="25px"
      style="border-radius: 50%"
      alt="image"
      />`;
      const titolo = document.getElementById("titolo-album");
      titolo.innerHTML = ``;
      titolo.innerHTML = `${data.title} `;

      const nomegruppo = document.getElementById("name-artist");
      const time = (data.duration / 60).toFixed(2);

      nomegruppo.innerHTML = ``;
      nomegruppo.innerHTML = ` <span class="fw-bold "
      >${data.artist.name}</span
      >
      -${data.release_date} - ${data.nb_tracks} brani, ${time}min`;

      tracksContainer.innerHTML = "";
      data.tracks.data.forEach((song, i) => {
        const canzone = document.createElement("div");
        let durataTotale = song.duration;
        let minuti = Math.floor(durataTotale / 60);
        let secondi = durataTotale % 60;
        let durataFormattata =
          minuti.toString().padStart(2, "0") +
          ":" +
          secondi.toString().padStart(2, "0");

        canzone.innerHTML = `<div onclick=singThisSong(${i})
        class="row mb-3 d-flex justify-content-between align-items-center"
        >
        <div class="col-1 text-center">${i + 1}</div>
        <div class="col-6">
        <p class="m-0">${song.title}</p>
        <p class="m-0">${song.artist.name}</p>
        </div>
        <div class="col-3 ps-3">${song.rank}</div>
        <div class="col-2 ps-4">${durataFormattata} min</div>
        </div>`;
        tracksContainer.appendChild(canzone);
        generateImage();
      });
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
    1262260, 1262014, 113728, 12047952, 1327607, 90153, 6415260, 59853252,
    455130, 454043, 81314, 51350192, 59853992, 12207756,
  ];

  // Funzione per mescolare un array in modo casuale
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Mescola l'array numeriArrey
  shuffleArray(numeriArrey);
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

pageOnLoad(albumId);

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
  urlAlbumCover = imgForAvgColor.src;
  let imageSrc = urlAlbumCover;
  const newContainer = document.createElement("div");
  newContainer.style.position = "absolute";
  newContainer.style.right = "3000px";
  const body = document.getElementsByTagName("body")[0];

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
  const albumSection = Array.from(document.querySelectorAll("#color > div"));
  for (const section of albumSection) {
    section.classList.remove("bg-secondary");
    section.style.backgroundColor = `#${mostRecurrentHex}`;
  }
  colorToConvert = `#${mostRecurrentHex}`;
  console.log(colorToConvert);

  // FUNZIONE PER LA LUMINOSITA'

  const calcolaLuminosita = function (colore) {
    let r, g, b;
    if (colore.startsWith("rgb")) {
      let match = colore.match(/(\d+), (\d+), (\d+)/);
      r = parseInt(match[1]);
      g = parseInt(match[2]);
      b = parseInt(match[3]);
    } else if (colore.startsWith("#")) {
      r = parseInt(colore.slice(1, 3), 16);
      g = parseInt(colore.slice(3, 5), 16);
      b = parseInt(colore.slice(5, 7), 16);
    }
    // Calcola la luminosità utilizzando la formula
    let luminosita = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminosita;
  };
  console.log(calcolaLuminosita(colorToConvert));

  let luminositaSfondo = calcolaLuminosita(colorToConvert);

  const testo = document.getElementById("testo");
  const noWhiteText = document.getElementById("no-white-text");

  if (luminositaSfondo > 0.5) {
    console.log("si");
    noWhiteText.classList.remove("text-white");
    noWhiteText.classList.add("text-black");
    const textWhiteArray = Array.from(
      noWhiteText.getElementsByClassName("text-white")
    );
    textWhiteArray.forEach((element) => {
      element.classList.remove("text-white");
      element.classList.add("text-black");
    });
  } else {
    console.log("no");
    noWhiteText.classList.add("text-black");
    noWhiteText.classList.remove("text-white");
    const textWhiteArray = Array.from(
      noWhiteText.getElementsByClassName("text-black")
    );
    textWhiteArray.forEach((element) => {
      element.classList.add("text-white");
      element.classList.remove("text-black");
    });
  }
};
const goHomeMobile = document.getElementById("go-home-mobile");
goHomeMobile.addEventListener("click", () => {
  location.href = "./home.html";
});

const searchMobile = document.getElementById("search-mobile");
searchMobile.addEventListener("click", () => {
  location.href = "./search.html";
});
const profileMobile = document.getElementById("profile-mobile");
profileMobile.addEventListener("click", () => {
  location.href = "./profile.html";
});

pageOnLoad(albumId);

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

//

// const isTooLightYIQ = function (hexcolor) {
//   const r = parseInt(hexcolor.substr(0, 2), 16);
//   const g = parseInt(hexcolor.substr(2, 2), 16);
//   const b = parseInt(hexcolor.substr(4, 2), 16);
//   const yiq = (r * 299 + g * 587 + b * 114) / 1000;
//   return yiq >= 128;
// };

// const isTooDarkYIQ = function (hexcolor) {
//   const r = parseInt(hexcolor.substr(0, 2), 16);
//   const g = parseInt(hexcolor.substr(2, 2), 16);
//   const b = parseInt(hexcolor.substr(4, 2), 16);
//   const yiq = (r * 299 + g * 587 + b * 114) / 1000;
//   return yiq < 128;
// };

// //
// const verifyColor = isTooLightYIQ(colorToConvert) ? false : true;
// console.log(verifyColor);
// if (verifyColor) {
//   console.log("too white");
//   noWhiteText.classList.remove("text-white");
//   noWhiteText.classList.add("text-black");
//   const textWhiteArray = Array.from(
//     noWhiteText.getElementsByClassName("text-white")
//   );

//   textWhiteArray.forEach((element) => {
//     element.classList.remove("text-white");
//     element.classList.add("text-black");
//   });
// } else {
//   console.log("no");
// }

// } else if (isTooDarkYIQ(colorToConvert).ok) {
//   console.log("too dark");
//   noWhiteText.classList.toggle("text-black");
//   noWhiteText.classList.toggle("text-white");
//   const textWhiteArray = Array.from(
//     noWhiteText.getElementsByClassName("text-black")
//   );

//   textWhiteArray.forEach((element) => {
//     element.classList.toggle("text-black");
//     element.classList.toggle("text-white");
//   });
// }
