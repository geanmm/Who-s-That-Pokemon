const pokemonName = document.querySelector(".pokemon_name");
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image");
const form = document.querySelector(".form");
const input = document.querySelector(".input_search");
const btnGuess = document.querySelector(".btn-guess");
const btnTip = document.querySelector(".btn-tip");
const btnNext = document.querySelector(".btn-next");

let pokemonData;
console.log(pokemonData);

const renderPokemon = async () => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=0&limit=649`
  ).then((p) => p.json());

  const pokemonList = APIResponse.results;
  const generatedPokemon = Math.floor(
    Math.random() * APIResponse.results.length
  );

  const result = pokemonList[generatedPokemon];
  pokemonData = await fetch(result.url).then((p) => p.json());

  pokemonName.innerHTML = "Name";
  pokemonNumber.innerHTML = "#";
  pokemonImage.src =
    pokemonData["sprites"]["versions"]["generation-v"]["black-white"][
      "animated"
    ]["front_default"];
  return pokemonData;
};

const checkPokemon = async () => {
  const data = pokemonData;
  // const typeTwo = data.types.length - 1;

  // console.log(
  //   data.name,
  //   data.id,
  //   data.types[0].type.name,
  //   data.types[typeTwo].type.name
  // );
  if (data.name.replace("-", "") == input.value.toLowerCase()) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.classList.remove("shadow");
    input.value = "";
    input.disabled = true;
    btnNext.classList.remove("hidden");
  } else if (input.value == "") {
    return;
  } else {
    pokemonName.innerHTML = "Try Again!";
    pokemonNumber.innerHTML = "#";
  }
};
btnNext.addEventListener("click", () => {
  input.disabled = false;
  pokemonImage.classList.add("shadow");
  btnNext.classList.add("hidden");
  renderPokemon();
});
btnGuess.addEventListener("click", () => {
  checkPokemon(input.value);
  input.value = "";
});
form.addEventListener("submit", (event) => {
  event.preventDefault();
  checkPokemon(input.value);
  input.value = "";
});

renderPokemon();
