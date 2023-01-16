function shuffleArray(array = []) {
  var actual = array.length,
    temp,
    random;
  while (0 !== actual) {
    random = Math.floor(Math.random() * actual);
    actual -= 1;

    temp = array[actual];
    array[actual] = array[random];
    array[random] = temp;
  }
  return array;
}

function getRandomPokemon(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  const item = array[randomIndex];

  return item;
}

async function getPokemons() {
  const response = await fetch(
    "https://pokeapi.co/api/v2/pokemon?offset=0&limit=649"
  ).then((res) => res.json());

  const pokemons = response.results;

  const currentPokemon = getRandomPokemon(pokemons);
  const options = [];

  options.push(currentPokemon);

  while (options.length < 4) {
    const option = getRandomPokemon(pokemons);
    const index = options.findIndex((item) => item?.name === option?.name);

    const doesExist = index !== -1;

    if (!doesExist) {
      options.push(option);
    }
  }
  renderPokemonAndOptions(options, currentPokemon);
}

async function renderPokemonAndOptions(options, currentPokemon) {
  const response = await fetch(currentPokemon.url).then((res) => res.json());
  shuffleArray(options).forEach((item) => {
    document.querySelector(
      "#answ_options"
    ).innerHTML += `<li>${item.name}</li>`;
  });
  document.querySelector("#pokemon_pic").src =
    response?.sprites?.versions?.["generation-v"]["black-white"]["animated"][
      "front_default"
    ];

  const buttons = document.querySelectorAll("#answ_options li");
  buttons.forEach((item) => {
    item.addEventListener("click", (e) => {
      const buttonSelected = e.target;
      if (buttonSelected.innerText === currentPokemon.name) {
        document.querySelector("#pokemon_pic").classList.remove("notSolved");
        document.querySelector(
          "#pokemon_info"
        ).innerText = `${response.id} - ${response.name}`;

        const nextBtn = document.querySelector("#btn_next");

        nextBtn.classList.remove("hidden");
        nextBtn.addEventListener("click", () => {
          window.location.reload();
        });
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  getPokemons();
});
