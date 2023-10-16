const toggleButton = document.getElementById('toggleButton');
const searchBar = document.getElementById('searchBar');

toggleButton.addEventListener('dblclick', () => {
  searchBar.classList.toggle('hidden');
});
