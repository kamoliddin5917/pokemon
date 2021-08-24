// HTML digi taglani oberadigon function
var findEl = (className) => document.querySelector(className);
var myForm = findEl(".js-form");
var mySelectType = findEl(".js-select__type");
var mySearchInput = findEl(".js-search");
var mySelectSort = findEl(".js-select__sort");
var myUlBox = findEl(".js-box");

var myModal = findEl(".js-modal");
var myModalBtn = findEl(".js-modal__btn");
var myModalH1 = findEl(".js-modal__h1");
var myModalUl = findEl(".js-modal__ol");
var myModalP = findEl(".js-modal__p");

// Tag yaratadigon function
var creatEl = (tag) => document.createElement(tag);

// Arraydigi Type sini tekshiradigin functionni arrayi
var type = [];

// Har bitta kegan elementga li yaratib li ni ichiga img,p,span*2,ul yaratib ichiga soladi
var boxList = (multik) => {
  var newLiBox = creatEl("li");
  var newImg = creatEl("img");
  var newP = creatEl("p");
  var newSpanWeight = creatEl("span");
  var newSpanYear = creatEl("span");

  var newUlType = creatEl("ul");

  var newModalBtn = creatEl("button");

  var birthDate =
    new Date(multik.birth_date).getDay() +
    "." +
    (new Date(multik.birth_date).getUTCMonth() + 1) +
    "." +
    new Date(multik.birth_date).getUTCFullYear() +
    "year";

  newImg.src = multik.img;
  newP.textContent = multik.name;
  newSpanWeight.textContent = multik.weight;
  newSpanYear.textContent = birthDate;

  newModalBtn.textContent = "More";
  newModalBtn.dataset.id = multik.id;

  newLiBox.className = "box__list";
  newImg.className = "box__img";
  newP.className = "box__titel";
  newSpanWeight.className = "box__weight";
  newSpanYear.className = "box__year";
  newUlType.className = "type";

  newModalBtn.className = "btn btn--box";

  // Box ichida li yaratib uni ul ga soladi
  var creatType = (multik) => {
    multik.type.forEach((typ) => {
      var newLiType = creatEl("li");
      newLiType.className = "type__list";
      newLiType.textContent = typ;
      newUlType.append(newLiType);
    });
  };
  creatType(multik);

  // Type select i ichida option yaratib typega tenglab selecti ichiga soladi
  var selectType = (multik) => {
    multik.type.forEach((typ) => {
      if (!type.includes(typ)) {
        type.push(typ);
        var newOption = creatEl("option");
        newOption.className = "form__option";
        newOption.textContent = typ;
        newOption.value = typ;
        mySelectType.append(newOption);
      }
    });
  };
  selectType(multik);

  newLiBox.append(
    newImg,
    newP,
    newSpanWeight,
    newSpanYear,
    newUlType,
    newModalBtn
  );
  myUlBox.append(newLiBox);

  // Box__listdigi button click bo'ganda modal ochiladi va u pokempnni zaif tomonini, bo'yini chiqazadi (ma'lumoti)
  var modalOpen = (event) => {
    myModalUl.innerHTML = "";

    var kino = findMultik(event.target.dataset.id);

    kino.weaknesses.forEach((weak) => {
      var newModalLi = creatEl("li");
      newModalLi.textContent = weak;
      newModalLi.className = "modal__list";
      myModalUl.append(newModalLi);
    });

    myModalH1.textContent = kino.name;
    myModalP.textContent = kino.height;

    myModal.classList.add("modal__open");
  };
  newModalBtn.addEventListener("click", modalOpen);
};

// Modal yoki Modaldigi button click bo'ganda modal yopiladi
var modalClosed = (event) => {
  if (event.target === myModal || event.target === myModalBtn) {
    myModal.classList.remove("modal__open");
  }
};
myModal.addEventListener("click", modalClosed);

//  li digi btn bosilganda olingan ID orqali pokemonni topib ushatga qaytarvoradi
var findMultik = (id) => {
  return pokemons.find((pokemon) => pokemon.id == id);
};

// Berilgan arrayi aylanib har bitta element boxList() functionga beriladi
var forFilms = (films) => {
  films.forEach((film) => {
    boxList(film);
  });
};
forFilms(pokemons);

// Sortlash uchun formula
var sortNumberSmallBig = (a, b) => b.birth_date - a.birth_date;
var sortNumberBidSmall = (a, b) => a.birth_date - b.birth_date;
var sortNumberHeavyLight = (a, b) =>
  b.weight.split("kg").join("") - a.weight.split(" kg").join("");
var sortNumberLightHeavy = (a, b) =>
  a.weight.split("kg").join("") - b.weight.split(" kg").join("");
var sortAaZz = (a, b) => {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  return 0;
};
var sortZzAa = (a, b) => {
  if (a.name > b.name) {
    return -1;
  }
  if (a.name < b.name) {
    return 1;
  }
  return 0;
};
// Sortlash uchun obyekt
var objSort = {
  0: sortAaZz,
  1: sortZzAa,
  2: sortNumberSmallBig,
  3: sortNumberBidSmall,
  4: sortNumberHeavyLight,
  5: sortNumberLightHeavy,
};

// Form submit bo'ganda pokemons filterlanib sortlanadi
myForm.addEventListener("submit", function (event) {
  event.preventDefault();

  myUlBox.innerHTML = "";

  var typeValue = mySelectType.value;
  var sortValue = mySelectSort.value;
  var searchValue = mySearchInput.value.trim();
  var searchRegExp = new RegExp(searchValue, "gi");

  var resultFilter = pokemons
    .filter((multik) => {
      if (typeValue === "all") {
        return multik;
      }
      return multik.type.includes(typeValue);
    })
    .filter((multik) => multik.name.match(searchRegExp))
    .sort(objSort[sortValue]);

  forFilms(resultFilter);
});

// Karusel
var karuselImg = findEl(".karusel__img");

var i = 0;
var time = 1500;
var images = [];

images[0] = "../img/0.jpg";
images[1] = "../img/1.jpg";
images[2] = "../img/2.jpg";
images[3] = "../img/3.jpg";
images[4] = "../img/4.jpg";
images[5] = "../img/5.jpg";
images[6] = "../img/6.jpg";
images[7] = "../img/7.jpg";
images[8] = "../img/8.jpg";
images[9] = "../img/9.jpg";
images[10] = "../img/10.jpg";

var karuselPokemon = () => {
  karuselImg.src = images[i];
  i < images.length - 1 ? i++ : (i = 0);

  setTimeout("karuselPokemon()", time);
};
window.onload = karuselPokemon;
