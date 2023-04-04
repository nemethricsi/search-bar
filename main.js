let characters = [];
const searchBar = document.getElementById('search-bar');

searchBar.addEventListener('keyup', ({ target: { value } }) => {
  const filtered = characters.filter(
    ({ name, house }) =>
      name.toLowerCase().includes(value.toLowerCase()) ||
      house.toLowerCase().includes(value.toLowerCase())
  );
  console.log(filtered);
  displayCharacters(filtered, value);
});

async function loadCharacters() {
  try {
    const res = await fetch('https://hp-api.onrender.com/api/characters');
    characters = await res.json();
    console.log(characters[0]);
    displayCharacters(characters);
  } catch (err) {
    console.dir(err);
  }
}

function displayCharacters(characters, searchTerm) {
  const list = document.getElementById('characters-list');
  const results = document.getElementById('results');

  const htmlString = characters
    .map(({ name, house }) => {
      if (searchTerm) {
        let string = `${name} - ${house}`;
        let pattern = new RegExp(searchTerm, 'gi');
        string = string.replace(pattern, (match) => `<mark>${match}</mark>`);
        return `<li>${string}</li>`;
      } else {
        return `<li>${name} - ${house}</li>`;
      }
    })
    .join('');
  list.innerHTML = htmlString;
  results.innerHTML = `${characters.length} match`;
}

loadCharacters();
