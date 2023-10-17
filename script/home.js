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


const playlistMenu = document.getElementById('playlist')

const getAlbum = function (query) {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${query}`)

    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error('Errore nella response');
      }
    })
    .then((data)=>{
      const app = document.getElementById('albumlevate')
      const card = document.createElement('div')
      card.innerHTML=`<a class="text-decoration-none text-white" href="album.html?query=${data.id}"><div class="d-flex align-items-center mt-2"><img src="${data.cover_medium}" width="30px" height="30px" /><p>${data.title}<p></div><a>`
      app.appendChild(card)
      console.log(data)
      
    })
    .catch((error) => {
      console.error('Si è verificato un errore:', error);
    })
  }




const albumbtn = document.getElementById('azz')
albumbtn.addEventListener('click',()=>{

  const via =document.getElementById('levate')
  via.classList.add('d-none')
  const numeriArrey = [6415260,1362101,12207660,455130,454043,]
  invocagetalbum(numeriArrey)
  const fakeVia = document.getElementById('albumlevate')
  fakeVia.classList.remove('d-none')
  
}
)
function invocagetalbum(numeriArrey){
  for (const id of numeriArrey)
  getAlbum(id)
}

const playlistbtn = document.getElementById('azz2')
playlistbtn.addEventListener('click',()=>{
  const via =document.getElementById('albumlevate')
  via.classList.add('d-none')
  const realVia = document.getElementById('levate')
  realVia.classList.remove('d-none')
  

}
)

