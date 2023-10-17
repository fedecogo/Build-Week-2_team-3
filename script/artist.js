const addressBarContent = new URLSearchParams(location.search);
const name_artist = addressBarContent.get('query');

console.log(name_artist);

const getArtist = function(query) {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Errore nella response');
      }
    })
    .then((data) => {
      console.log(data);

      const contentRow = document.getElementById('h1_titolo');
      contentRow.innerHTML = '';
      const h1Element = document.createElement('h1');
      h1Element.textContent = data.data[0].artist.name;
      contentRow.appendChild(h1Element);

      const songDetails = document.getElementById('appendi_song');
      songDetails.innerHTML = '';
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
          <div class="col-2 ps-4">${data.data[0].duration}</div>
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
          <div class="col-2 ps-4">${data.data[1].duration}</div>
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
          <div class="col-2 ps-4">${data.data[2].duration}</div>
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
          <div class="col-2 ps-4">${data.data[3].duration}</div>
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
          <div class="col-2 ps-4">${data.data[4].duration}</div>
        </div>
        `;
      songDetails.innerHTML = songDetailsHTML;
      const wallpaperImg = document.getElementById('wallpaper-img');
      wallpaperImg.style.backgroundImage = `url('${data.data[0].artist.picture_xl}')`;
    
// aggiiungere albumalla row 
// da sistemare card per album
// chiedere a stefano se serve unaltra fatch con  https://striveschool-api.herokuapp.com/api/deezer/album/75621062

const newRow = document.getElementById('appAlbum');
newRow.innerHTML = '';
const newRowHTML = `
  <div class="col-xs-6 col-md-4">
    <div class="card">
    <div class="card-body">
      <img src="${data.data[0].album.cover_medium}" width="50px"  alt="..." />
        <h5 class="card-title">${data.data[0].album.title}</h5>
        <a href="album.html?query=${data.data[0].album.id}" class="btn btn-primary">Go to Album</a>
      </div>
    </div>
  </div>
  <div class="col-xs-6 col-md-4">
    <div class="card">
    <div class="card-body">
      <img src="${data.data[1].album.cover_medium}" width="50px"  alt="..." />
        <h5 class="card-title">${data.data[1].album.title}</h5>
        <a href="album.html?query=${data.data[1].album.id}" class="btn btn-primary">Go to Album</a>
      </div>
    </div>
  </div>
  <div class="col-xs-6 col-md-4">
    <div class="card">
    <div class="card-body">
      <img src="${data.data[2].album.cover_medium}" width="50px"  alt="..." />
        <h5 class="card-title">${data.data[2].album.title}</h5>
        <a href="album.html?query=${data.data[2].album.id}" class="btn btn-primary">Go to Album</a>
      </div>
    </div>
  </div>
 
`;

// Assegna la stringa HTML al tuo elemento
newRow.innerHTML = newRowHTML;
    }).catch((error) => {
      console.error('Si è verificato un errore:', error);
    });
};

getArtist(name_artist);


// funzione per il bottone segui
const button = document.getElementById('toggleButton2');

button.addEventListener('click', function() {
  if (button.textContent.trim() === 'Segui') {
    button.textContent = 'Seguito';
    button.classList.remove('btn-outline-light');
    button.classList.add('btn-light');
  } else {
    button.textContent = 'Segui';
    button.classList.remove('btn-light');
    button.classList.add('btn-outline-light');
  }
});

// funzione cerca copiata della home.js
const toggleButton = document.getElementById('toggleButton');
const searchBar = document.getElementById('searchBar');
const searchButton = document.getElementById('searchButton');

toggleButton.addEventListener('click', () => {
  searchBar.classList.toggle('hidden');
});

searchButton.addEventListener('click', () => {
  const query = searchBar.querySelector('input').value;
  if (query) {
    getImages(query);
  }
});

const getImages = function(query) {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Errore nella response');
      }
    })
    .then((data) => {
      window.location.href = `artist.html?query=${query}`;
    })
    .catch((error) => {
      console.error('Si è verificato un errore:', error);
    });
};