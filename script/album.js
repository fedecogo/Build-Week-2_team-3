// funzione cerca copiata dalla home.js
const adressBar = new URLSearchParams(location.search);
const albumId = adressBar.get("query");
console.log(albumId);
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
        canzone.innerHTML = `<div
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
const asidegruppo = document.getElementById("aside-right");
gruppo.addEventListener("click", () => {
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
  const numeriArrey = [6415260, 1362101, 12207660, 455130, 454043];
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
