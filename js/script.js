const pokemonName = document.querySelector(".pokemon_name");
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image");

const answer1 = document.querySelector(".answer_one");
const answer2 = document.querySelector(".answer_two");
const answer3 = document.querySelector(".answer_three");
const answer4 = document.querySelector(".answer_four");

const btn_next = document.querySelector(".btn_next");

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
  // pokemonName.innerHTML = "Pokemon Name";
  // pokemonNumber.innerHTML = "#";
  pokemonImage.src =
    pokemonData["sprites"]["versions"]["generation-v"]["black-white"][
      "animated"
    ]["front_default"];
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
  console.log(answerArr);
  const arr = answerArr;

  setTimeout(() => {
    answer1.innerHTML = arr[0];
    answer2.innerHTML = arr[1];
    answer3.innerHTML = arr[2];
    answer4.innerHTML = arr[3];
  }, "300");
  document.getElementById("answers").onclick = (e) => {
    if (e.target.tagName == "BUTTON") {
      checkAnswer = e.target.id;
      checkPokemon();
    }
  };
  // arr.forEach((element) => (answers.innerHTML = element));
}
const checkPokemon = async () => {
  const data = pokemonData;
  const button = document.getElementById(checkAnswer);
  const check = button.innerText;
  // const typeTwo = data.types.length - 1;

  // console.log(
  //   data.name,
  //   data.id,
  //   data.types[0].type.name,
  //   data.types[typeTwo].type.name
  // );

  if (data.name == check) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.classList.remove("shadow");
    button.classList.add("correct");
    btn_next.classList.remove("hidden");
    // btnNext.classList.remove("hidden");
  }
};
// btnNext.addEventListener("click", () => {
//   input.disabled = false;
//   pokemonImage.classList.add("shadow");
//   btnNext.classList.add("hidden");
//   renderPokemon();
// });
// form.addEventListener("submit", (event) => {
//   event.preventDefault();
//   checkPokemon(input.value);
//   input.value = "";
// });
btn_next.onclick = () => {
  window.location.reload();
};
renderPokemon();
renderAnswers();
