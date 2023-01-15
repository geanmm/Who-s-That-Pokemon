const pokemonName = document.querySelector(".pokemon_name");
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image");

const game_screen = document.querySelector(".main_game");
const start_screen = document.querySelector(".start_game");

const answer1 = document.querySelector(".answer_one");
const answer2 = document.querySelector(".answer_two");
const answer3 = document.querySelector(".answer_three");
const answer4 = document.querySelector(".answer_four");

const btn_next = document.querySelector(".btn_next");
const start_btn = document.querySelector(".start_btn");

let pokemonData;
let answerArr = new Array();
let checkAnswer;

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
  setTimeout(() => {
    pokemonImage.src =
      pokemonData["sprites"]["versions"]["generation-v"]["black-white"][
        "animated"
      ]["front_default"];
  }, "300");

  answerArr.push(pokemonData.name);
  // console.log(questions);
  return pokemonData;
};

const answerOptions = async () => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=0&limit=649`
  ).then((p) => p.json());

  const pokemonList = APIResponse.results;
  const generatedPokemon = Math.floor(
    Math.random() * APIResponse.results.length
  );

  const result = pokemonList[generatedPokemon];
  const questionsData = await fetch(result.url).then((p) => p.json());

  answerArr.push(questionsData.name);
};

function renderAnswers() {
  answerOptions();
  answerOptions();
  answerOptions();

  setTimeout(() => {
    let shuffled = answerArr
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

    answer1.innerHTML = shuffled[0];
    answer2.innerHTML = shuffled[1];
    answer3.innerHTML = shuffled[2];
    answer4.innerHTML = shuffled[3];
  }, "300");
  document.getElementById("answers").onclick = (e) => {
    if (e.target.tagName == "BUTTON") {
      checkAnswer = e.target.id;
      checkPokemon();
    }
  };
}
const checkPokemon = async () => {
  const data = pokemonData;
  const button = document.getElementById(checkAnswer);
  const check = button.innerText;
  if (data.name == check) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.classList.remove("shadow");
    button.classList.add("correct");
    btn_next.classList.remove("hidden");
  }
};
btn_next.onclick = () => {
  answerArr = [];
  const button = document.getElementById(checkAnswer);
  pokemonImage.classList.add("shadow");
  button.classList.remove("correct");
  btn_next.classList.add("hidden");
  pokemonName.innerHTML = "Pokemon Name";
  pokemonNumber.innerHTML = "#";

  renderPokemon();
  setTimeout(() => {
    renderAnswers();
  }, 400);
};

start_btn.onclick = () => {
  start_screen.classList.add("hidden");
  game_screen.classList.remove("hidden");
};
renderPokemon();
renderAnswers();
