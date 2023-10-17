

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
