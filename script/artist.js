function myFunction() {
  alert("⚠️IT⚠️: Questa applicazione non è Spotify! Si tratta semplicemente di un clone realizzato a fini didattici durante il corso Epicode.\n\n ⚠️EN⚠️: This application is not affiliated with Spotify. It is a clone developed solely for educational purposes during the Epicode course.");
}
myFunction()


const addressBarContent = new URLSearchParams(location.search);
const name_artist = addressBarContent.get("query");

console.log(name_artist);

//funzione per riempire correttamente il div current song al caricamento della pagina
const currentSongDiv = document.getElementById("current-song");
const pageOnLoad = async (query) => {
  try {
    const res = await fetch(
      `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`
    );
    const data = await res.json();
    const onloadImg = data.data[0].album.cover_small;
    const onloadArtistName = data.data[0].artist.name;

    currentSongDiv.innerHTML = `
    <div id="current-song-image" class="p-2 d-flex align-items-center">
    <img
    src="${onloadImg}"
    alt="song photo"
    width="65px"
    />
    </div>
    <div id="current-song-info">
    <h5>${onloadArtistName}</h5>
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
      const contentRow = document.getElementById("h1_titolo");
      contentRow.innerHTML = "";
      const h1Element = document.createElement("h1");
      h1Element.textContent = data.data[0].artist.name;
      contentRow.appendChild(h1Element);
      const addSong = document.getElementById("addSongBtn");
      addSong.addEventListener("click", (e) => {
        const card1 = document.getElementById("card1");
        const card2 = document.getElementById("card2");
        const card3 = document.getElementById("card3");
        const card4 = document.getElementById("card4");
        const card5 = document.getElementById("card5");
        card1.classList.toggle("visually-hidden");
        card2.classList.toggle("visually-hidden");
        card3.classList.toggle("visually-hidden");
        card4.classList.toggle("visually-hidden");
        card5.classList.toggle("visually-hidden");
        if (e.target.textContent.trim() === "Visualizza altro") {
          e.target.textContent = "Visualizza di meno";
        } else {
          e.target.textContent = "Visualizza altro";
        }
      });

      const songDetails = document.getElementById("appendi_song");

      songDetails.innerHTML = "";
      let durataTotale0 = data.data[0].duration;
      let durataTotale1 = data.data[1].duration;
      let durataTotale2 = data.data[2].duration;
      let durataTotale3 = data.data[3].duration;
      let durataTotale4 = data.data[4].duration;
      let durataTotale5 = data.data[5].duration;
      let durataTotale6 = data.data[6].duration;
      let durataTotale7 = data.data[7].duration;
      let durataTotale8 = data.data[8].duration;
      let durataTotale9 = data.data[9].duration;
      let minuti0 = Math.floor(durataTotale0 / 60);
      let minuti1 = Math.floor(durataTotale1 / 60);
      let minuti2 = Math.floor(durataTotale2 / 60);
      let minuti3 = Math.floor(durataTotale3 / 60);
      let minuti4 = Math.floor(durataTotale4 / 60);
      let minuti5 = Math.floor(durataTotale5 / 60);
      let minuti6 = Math.floor(durataTotale6 / 60);
      let minuti7 = Math.floor(durataTotale7 / 60);
      let minuti8 = Math.floor(durataTotale8 / 60);
      let minuti9 = Math.floor(durataTotale9 / 60);
      let secondi0 = durataTotale0 % 60;
      let secondi1 = durataTotale1 % 60;
      let secondi2 = durataTotale2 % 60;
      let secondi3 = durataTotale3 % 60;
      let secondi4 = durataTotale4 % 60;
      let secondi5 = durataTotale5 % 60;
      let secondi6 = durataTotale6 % 60;
      let secondi7 = durataTotale7 % 60;
      let secondi8 = durataTotale8 % 60;
      let secondi9 = durataTotale9 % 60;
      let durataFormattata1 =
        minuti0.toString().padStart(2, "0") +
        ":" +
        secondi0.toString().padStart(2, "0");
      let durataFormattata2 =
        minuti1.toString().padStart(2, "0") +
        ":" +
        secondi1.toString().padStart(2, "0");
      let durataFormattata3 =
        minuti2.toString().padStart(2, "0") +
        ":" +
        secondi2.toString().padStart(2, "0");
      let durataFormattata4 =
        minuti3.toString().padStart(2, "0") +
        ":" +
        secondi3.toString().padStart(2, "0");
      let durataFormattata5 =
        minuti4.toString().padStart(2, "0") +
        ":" +
        secondi4.toString().padStart(2, "0");
      let durataFormattata6 =
        minuti5.toString().padStart(2, "0") +
        ":" +
        secondi5.toString().padStart(2, "0");
      let durataFormattata7 =
        minuti6.toString().padStart(2, "0") +
        ":" +
        secondi6.toString().padStart(2, "0");
      let durataFormattata8 =
        minuti7.toString().padStart(2, "0") +
        ":" +
        secondi7.toString().padStart(2, "0");
      let durataFormattata9 =
        minuti8.toString().padStart(2, "0") +
        ":" +
        secondi8.toString().padStart(2, "0");
      let durataFormattata10 =
        minuti9.toString().padStart(2, "0") +
        ":" +
        secondi9.toString().padStart(2, "0");

      const songDetailsHTML = `
    <div class="row mb-3 d-flex justify-content-between align-items-center rounded" id="card-1-top" onclick=getSong(${0})>
  
    <div class="col-1 text-center">1</div>
    <div class="col-1 text-center">
    <img class="me-1" src="${data.data[0].album.cover}" width="30px">
    </div>
    <div class="col-6">
    <p class="m-0">${data.data[0].title}</p>
    </div>
    <div class="col-2 ps-3">${data.data[0].rank}</div>
    <div class="col-2 ps-4 d-none d-md-block">${durataFormattata1} min</div>
    </div>
    <div class="row mb-3 d-flex justify-content-between align-items-center rounded" id="card-2-top"
    onclick=getSong(${1})>
    <div class="col-1 text-center">2</div>
    <div class="col-1 text-center">
    <img class="me-1" src="${data.data[1].album.cover}" width="30px">
    </div>
    <div class="col-6">
    <p class="m-0">${data.data[1].title}</p>
    </div>
    <div class="col-2 ps-3">${data.data[1].rank}</div>
    <div class="col-2 ps-4 d-none d-md-block">${durataFormattata2} min</div>
    </div>
    <div class="row mb-3 d-flex justify-content-between align-items-center rounded" id="card-3-top" onclick=getSong(${2})>
    <div class="col-1 text-center">3</div>
    <div class="col-1 text-center">
    <img class="me-1" src="${data.data[2].album.cover}" width="30px">
    </div>
    <div class="col-6">
    <p class="m-0">${data.data[2].title}</p>
    </div>
    <div class="col-2 ps-3">${data.data[2].rank}</div>
    <div class="col-2 ps-4 d-none d-md-block">${durataFormattata3} min</div>
    </div>
    <div class="row mb-3 d-flex justify-content-between align-items-center rounded" id="card-4-top"
    onclick=getSong(${3})>
    <div class="col-1 text-center">4</div>
    <div class="col-1 text-center">
    <img class="me-1" src="${data.data[3].album.cover}" width="30px">
    </div>
    <div class="col-6">
    <p class="m-0">${data.data[3].title}</p>
    </div>
    <div class="col-2 ps-3">${data.data[3].rank}</div>
    <div class="col-2 ps-4 d-none d-md-block ">${durataFormattata4} min</div>
    </div>
    <div class="row mb-3 d-flex justify-content-between align-items-center rounded" id="card-5-top"
    onclick=getSong(${4})>
    <div class="col-1 text-center">5</div>
    <div class="col-1 text-center">
    <img class="me-1" src="${data.data[4].album.cover}" width="30px">
    </div>
    <div class="col-6">
    <p class="m-0">${data.data[4].title}</p>
    </div>
    <div class="col-2 ps-3">${data.data[4].rank}</div>
    <div class="col-2 ps-4 d-none d-md-block">${durataFormattata5} min</div>
    </div>

    <div class="row mb-3 d-flex justify-content-between align-items-center rounded visually-hidden" id="card1" onclick=getSong(${5})>
    <div class="col-1 text-center">6</div>
    <div class="col-1 text-center">
    <img class="me-1" src="${data.data[5].album.cover}" width="30px">
    </div>
    <div class="col-6">
    <p class="m-0">${data.data[5].title}</p>
    </div>
    <div class="col-2 ps-3">${data.data[5].rank}</div>
    <div class="col-2 ps-4 d-none d-md-block">${durataFormattata6} min</div>
    </div>
    <div class="row mb-3 d-flex justify-content-between align-items-center rounded visually-hidden" id="card2" onclick=getSong(${6})>
    <div class="col-1 text-center">7</div>
    <div class="col-1 text-center">
    <img class="me-1" src="${data.data[6].album.cover}" width="30px">
    </div>
    <div class="col-6">
    <p class="m-0">${data.data[6].title}</p>
    </div>
    <div class="col-2 ps-3">${data.data[6].rank}</div>
    <div class="col-2 ps-4 d-none d-md-block">${durataFormattata7} min</div>
    </div>
    <div class="row mb-3 d-flex justify-content-between align-items-center rounded visually-hidden" id="card3" onclick=getSong(${7})>
    <div class="col-1 text-center">8</div>
    <div class="col-1 text-center">
    <img class="me-1" src="${data.data[7].album.cover}" width="30px">
    </div>
    <div class="col-6">
    <p class="m-0">${data.data[7].title}</p>
    </div>
    <div class="col-2 ps-3">${data.data[7].rank}</div>
    <div class="col-2 ps-4 d-none d-md-block">${durataFormattata8} min</div>
    </div>
    <div class="row mb-3 d-flex justify-content-between align-items-center rounded visually-hidden" id="card4" onclick=getSong(${8})>
    <div class="col-1 text-center">9</div>
    <div class="col-1 text-center">
    <img class="me-1" src="${data.data[8].album.cover}" width="30px">
    </div>
    <div class="col-6">
    <p class="m-0">${data.data[8].title}</p>
    </div>
    <div class="col-2 ps-3">${data.data[8].rank}</div>
    <div class="col-2 ps-4 d-none d-md-block ">${durataFormattata9} min</div>
    </div>
    <div class="row mb-3 d-flex justify-content-between align-items-center rounded visually-hidden" id="card5" onclick=getSong(${9})>
    <div class="col-1 text-center">10</div>
    <div class="col-1 text-center">
    <img class="me-1" src="${data.data[9].album.cover}" width="30px">
    </div>
    <div class="col-6">
    <p class="m-0">${data.data[9].title}</p>
    </div>
    <div class="col-2 ps-3">${data.data[9].rank}</div>
    <div class="col-2 ps-4 d-none d-md-block">${durataFormattata10} min</div>
    </div>
    `;
      songDetails.innerHTML = songDetailsHTML;
      const wallpaperImg = document.getElementById("wallpaper-img");
      wallpaperImg.style.backgroundImage = `url('${data.data[0].artist.picture_xl}')`;

      // AGGIUNGE EVENTLISTENER A OGNI SINGOLA CANZONE
      const addsMenuListener = function () {
        const songs = Array.from(
          document.querySelectorAll("#appendi_song .row")
        );
        for (const song of songs) {
          const divToAppend = document.createElement("div");
          divToAppend.classList.add(
            "item-menu-artist",
            "text-white",
            "d-flex",
            "flex-column",
            "flex-start",
            "d-none"
          );
          divToAppend.innerHTML = `
              <p onclick="addToPlaylist(event)">Aggiungi alla playlist</p>
              <p>Condividi</p>
      `;
          song.appendChild(divToAppend);
        }
        for (const song of songs) {
          song.addEventListener("contextmenu", function (e) {
            openItemMenu(e);
          });
        }
      };
      addsMenuListener();
      // FUNZIONE PER APRIRE IL MENU
      const openItemMenu = function (e) {
        e.preventDefault();
        const song = e.target.closest(".row");
        const itemMenu = song.querySelector(".item-menu-artist");
        itemMenu.classList.remove("d-none");
        itemMenu.style.top = `${e.clientY}px`;
        itemMenu.style.left = `${e.clientX}px`;
      };

      // aggiiungere albumalla row
      // da sistemare card per album
      // chiedere a stefano se serve unaltra fatch con  https://striveschool-api.herokuapp.com/api/deezer/album/75621062

      const newRow = document.getElementById("appAlbum");
      newRow.innerHTML = "";
      const newRowHTML = `
    <div class="col-xs-6 col-md-4 m-3 m-md-0 pb-1 pb-lg-3" >
    <a href="album.html?query=${data.data[0].album.id}" class="text-decoration-none" >
    <div class="card bg-dark  text-white h-100 " id="cardalbum1">
    <div class="card-body">
    <img src="${data.data[0].album.cover_medium}" max-width="200px"  alt="..." class="img-fluid" />
    <h5 class="card-title mt-3">${data.data[0].album.title}</h5>
    </div>
    </div>
    </a>
    </div>
    
    <div class="col-xs-6 col-md-4 m-3 m-md-0 pb-1 pb-lg-3" >
    <a href="album.html?query=${data.data[1].album.id}" class="text-decoration-none" >
    <div class="card bg-dark  text-white h-100 " id="cardalbum2">
    <div class="card-body">
    <img src="${data.data[1].album.cover_medium}" max-width="200px"  alt="..." class="img-fluid"/>
    <h5 class="card-title mt-3">${data.data[1].album.title}</h5>
    </div>
    </div>
    </a>
    </div>
    <div class="col-xs-6 col-md-4 m-3 m-md-0 pb-1 pb-lg-3" >
    <a href="album.html?query=${data.data[2].album.id}" class="text-decoration-none" >
    <div class="card bg-dark  text-white h-100 " id="cardalbum3">
    <div class="card-body">
    <img src="${data.data[2].album.cover_medium}" max-width="200px"  alt="..." class="img-fluid"/>
    <h5 class="card-title mt-3">${data.data[2].album.title}</h5>
    </div>
    </div>
    </a>
    </div>
    <div class="col-xs-6 col-md-4 m-3 m-md-0" >
    <a href="album.html?query=${data.data[3].album.id}" class="text-decoration-none" >
    <div class="card bg-dark  text-white h-100 " id="cardalbum1">
    <div class="card-body">
    <img src="${data.data[3].album.cover_medium}" max-width="200px"  alt="..." class="img-fluid" />
    <h5 class="card-title mt-3">${data.data[3].album.title}</h5>
    </div>
    </div>
    </a>
    </div>
    
    <div class="col-xs-6 col-md-4 m-3  m-md-0" >
    <a href="album.html?query=${data.data[4].album.id}" class="text-decoration-none" >
    <div class="card bg-dark  text-white h-100 " id="cardalbum2">
    <div class="card-body">
    <img src="${data.data[4].album.cover_medium}" max-width="200px"  alt="..." class="img-fluid"/>
    <h5 class="card-title mt-3">${data.data[4].album.title}</h5>
    </div>
    </div>
    </a>
    </div>
    <div class="col-xs-6 col-md-4 m-3 m-md-0" >
    <a href="album.html?query=${data.data[5].album.id}" class="text-decoration-none" >
    <div class="card bg-dark  text-white h-100 " id="cardalbum3">
    <div class="card-body">
    <img src="${data.data[5].album.cover_medium}" max-width="200px"  alt="..." class="img-fluid"/>
    <h5 class="card-title mt-3">${data.data[5].album.title}</h5>
    </div>
    </div>
    </a>
    </div>
    
    `;

      newRow.innerHTML = newRowHTML;
      //   const divAudio = document.getElementById("appendi_qui");
      //   const newDiv = document.createElement("div");
      //   newDiv.innerHTML = `
      // <audio controls id="audio-player">
      // <source src="${data.data[playTheRightSong].preview}" type="audio/mpeg">
      // </audio>
      // `;
      //   divAudio.appendChild(newDiv);

      // CREAZIONE DINAMICA DEI BRANI CHE MI PIACCIONO
      const artistName = data.data[0].artist.name;
      const artistPicture = data.data[0].artist.picture_small;
      const numberOfLike = Math.ceil(Math.random() * 15);
      const iLike = document.getElementById("brani-piacciono-desktop");
      iLike.innerHTML = `<div class="me-2">
    <img src="${artistPicture}" alt="" class="rounded-circle" width="60px">
    </div>
    <div>
    <p class="fw-medium mb-0 text-nowrap fs-6">Hai messo mi piace a ${numberOfLike} brani</p>
    <p class="text-secondary fw-light my-0 py-0">Di ${artistName}</p>
    </div>
    `;
      const iLikeMobile = document.getElementById("brani-piacciono-mobile");
      iLikeMobile.innerHTML = `<div class="d-flex align-items-center mt-2 ms-2">
    <div class="me-2">
    <img src="${artistPicture}" alt="" class="rounded-circle" width="60px">
    </div>
    <div>
    <p class="fw-medium mb-0 text-nowrap fs-6">Brani che ti piacciono</p>
    <p class="text-secondary fw-light my-0 py-0">${numberOfLike} brani di ${artistName}</p>
    </div>
    </div>
    `;
    })
    .catch((error) => {
      console.error("Si è verificato un errore:", error);
    });
};

const htmlToSave = document.createElement("div");
htmlToSave.innerHTML = localStorage.getItem("playlist");

// AGGIUNGE LA SINGOLA CANZONE ALLA PLAYLIST
const addToPlaylist = function (e) {
  const appendiSong = document.getElementById("appendi_song");
  const htmlInsideAppendiSong = appendiSong.innerHTML;
  const songToTarget = e.target.closest(".row");
  const itemMenu = songToTarget.querySelector(".item-menu-artist");
  const songToAppend = songToTarget;

  htmlToSave.appendChild(songToAppend);
  appendiSong.innerHTML = htmlInsideAppendiSong;
  itemMenu.classList.add("d-none");
  appendiSong.querySelectorAll(".item-menu-artist").forEach((menu) => {
    menu.classList.add("d-none");
  });
  // aggiunge eventlistener per aprire il menu di nuovo, perché lo perde quando riscrivi l'html
  const songs = Array.from(appendiSong.getElementsByClassName("row"));
  const openItemMenu = function (e) {
    e.preventDefault();
    const song = e.target.closest(".row");
    const itemMenu = song.querySelector(".item-menu-artist");
    itemMenu.classList.remove("d-none");
    itemMenu.style.top = `${e.clientY}px`;
    itemMenu.style.left = `${e.clientX}px`;
  };
  songs.forEach((song) => {
    song.addEventListener("contextmenu", function (e) {
      e.preventDefault();
      openItemMenu(e);
    });
  });
  localStorage.setItem("playlist", htmlToSave.innerHTML);
  e.stopPropagation();
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
  shuffleArray(numeriArrey);
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
  butM.classList.add(
    "text-white",
    "border-bottom",
    "border-3",
    "border-success"
  );
  butE.classList.remove(
    "text-white",
    "border-bottom",
    "border-3",
    "border-success"
  );
});

butE.addEventListener("click", () => {
  // butM.classList.remove('btn-outline-success')
  // butM.classList.add("btn-outline-dark")
  // butE.classList.toggle("btn-outline-dark");
  // butE.classList.toggle("btn-outline-success");
  butE.classList.add(
    "text-white",
    "border-bottom",
    "border-3",
    "border-success"
  );
  butM.classList.remove(
    "text-white",
    "border-bottom",
    "border-3",
    "border-success"
  );
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
const butShuffle = document.getElementById("shuffle");
butShuffle.addEventListener("click", function () {
  butShuffle.classList.toggle("text-secondary");
  butShuffle.classList.toggle("text-success");
});

// const playTheRightSong = async (query, i) => {
//   try {
//     const res = await fetch(
//       `https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`
//     );
//     const data = await res.json();
//     const divAudio = document.getElementById("appendi_qui");
//     const newDiv = document.createElement("div");
//     newDiv.innerHTML = `
//   <audio controls id="audio-player">
//   <source src="${data.data[i].preview}" type="audio/mpeg">
//   </audio>
//   `;
//     divAudio.appendChild(newDiv);
//     console.log(data.data[i].preview);
//   } catch (error) {
//     console.log("errore", error);
//   }
// };

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

pageOnLoad(name_artist);

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

let songIndex = 0;

// funzione per riprodurre la song selezionata
const getSong = function (i) {
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/search?q=${name_artist}`
  )
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
      // src="${data.data[i].album.cover}"
      alt="song photo"
      width="65px"
      />`;
      getDivImg.appendChild(NewImgAlbum);

      // cambio h5 e h6 const
      const getDivText = document.getElementById("current-song-info");
      getDivText.innerHTML = ``;
      const newDivText = document.createElement("div");
      newDivText.innerHTML = `<h5>${data.data[i].title}</h5>
      <h6>${data.data[i].artist.name}</h6>`;
      getDivText.appendChild(newDivText);

      const divAudio = document.getElementById("appendi_qui");
      const newDiv = document.createElement("div");
      divAudio.innerHTML = ``;
      newDiv.innerHTML = `
      <audio controls autoplay>
  <source src="${data.data[i].preview}" type="audio/mpeg">
  </audio>
        `;
      divAudio.appendChild(newDiv);
      songIndex = i;
    })
    .catch((error) => {
      console.error("Si è verificato un errore:", error);
    });
};

// Funzione per far partire la prima song con il btn con id Song in
const buttonPlay = document.getElementById("songIn");
buttonPlay.addEventListener("click", () => {
  getSong(songIndex);
});
const CursorState = () => {
  if (history.length <= 1) {
    leftArrow.classList.add("not-allowed");
  } else {
    leftArrow.classList.remove("not-allowed");
  }
};

CursorState();

// funzione per full screen PER OGNI PAGINA
const fullscreenIcon = document.getElementById("fullscreen-icon");
fullscreenIcon.addEventListener("click", toggleFullScreen);
function toggleFullScreen() {
  if (document.fullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    fullscreenIcon.classList.remove("active");
    fullscreenIcon.classList.remove("bi-arrows-angle-contract");
    fullscreenIcon.classList.add("bi-arrows-angle-expand");
    sessionStorage.setItem("fullscreen", "inattiva");
  } else {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    }
    fullscreenIcon.classList.add("active");
    fullscreenIcon.classList.add("bi-arrows-angle-contract");
    fullscreenIcon.classList.remove("bi-arrows-angle-expand");
    sessionStorage.setItem("fullscreen", "attiva");
  }
}
