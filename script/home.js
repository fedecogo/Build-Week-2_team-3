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

const btn = document.getElementById('elimina_pubbl');
btn.addEventListener('click', function() {
  console.log('Pulsante cliccato');
  let cardElement = document.getElementById('porcodio')
  if (cardElement) {
    cardElement.classList.add('delete');
  }
});


