const time_line = document.querySelector("#time_line");
const timeText = document.querySelector("#time_left_txt");
const timeCount = document.querySelector("#timer_sec");
const next_btn = document.querySelector("#btn_next");
const start_btn = document.querySelector("#start_btn");
const try_again = document.querySelector("#try_again");
let options = [];
let userScore = 0;
let timeValue = 15;
let counter;
let counterLine;
let widthValue = 0;

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
      clearInterval(counter);
      clearInterval(counterLine);

      const buttonSelected = e.target;

      if (buttonSelected.innerText.toLowerCase() === currentPokemon.name) {
        userScore += 1;
        document.querySelector("#pokemon_pic").classList.remove("notSolved");
        document.querySelector(
          "#pokemon_info"
        ).innerText = `${response.id} - ${response.name}`;
        document.querySelector("#btn_next").classList.remove("hidden");
      } else {
        setTimeout(() => {
          document.querySelector("#game").classList.add("hidden");
          document.querySelector("#gameover").classList.remove("hidden");
        }, 2000);
      }
      document.querySelector("#user_score").innerHTML = userScore;
      document.querySelector("#user_finalscore").innerHTML = userScore;
      document.querySelector("#answ_options").classList.add("disable_listener");
    });
  });
}
try_again.addEventListener("click", () => {
  window.location.reload();
});
start_btn.addEventListener("click", () => {
  document.querySelector("#game").classList.remove("hidden");
  start_btn.classList.add("hidden");
  document.querySelector("#start").classList.add("hidden");
  startTimer(15);
  startTimerLine(0);
});
next_btn.addEventListener("click", () => {
  options = [];
  const pokemonList = document.querySelector("#answ_options");
  pokemonList.innerHTML -= `<li></li>`;
  if ((pokemonList.innerHTML = "NaN")) {
    pokemonList.innerHTML = "";
  }
  document.querySelector("#pokemon_info").innerText = "# - Pokemon Name";
  next_btn.classList.add("hidden");
  document.querySelector("#pokemon_pic").classList.add("notSolved");
  getPokemons();
  startTimer(15);
  startTimerLine(0);

  document.querySelector("#answ_options").classList.remove("disable_listener");
});

function startTimer(time) {
  counter = setInterval(timer, 1000);
  function timer() {
    timeCount.textContent = time;
    time--;

    if (time < 9) {
      let addZero = timeCount.textContent;
      timeCount.textContent = "0" + addZero;
    }
    if (time < 0) {
      clearInterval(counter);
      timeText.textContent = "Time Off";
      setTimeout(() => {
        document.querySelector("#game").classList.add("hidden");
        document.querySelector("#gameover").classList.remove("hidden");
      }, 2000);
    }
  }
}
function startTimerLine(time) {
  counterLine = setInterval(timer, 27);
  function timer() {
    time += 1; //upgrading time value with 1
    time_line.style.width = time + "px"; //increasing width of time_line with px by time value
    if (time > 599) {
      //if time value is greater than 549
      clearInterval(counterLine); //clear counterLine
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getPokemons();
});
