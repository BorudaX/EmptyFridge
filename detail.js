var source = "https://raw.githubusercontent.com/Borudagaming/EmptyFridge/main/data/";
var contents;
var data;

const queryString = window.location.search;
const URLparams = new URLSearchParams(queryString);

var recipe = URLparams.has("r") ? URLparams.get("r") : "Quick Pasta Dish";
var dataset = URLparams.has("p") ? URLparams.get("p") : "RecipeNLG_dataset_1.json";

function loadData() {
    fetch(source + dataset)
        .then(response => response.json())
        .then(res_data => {
            data = res_data[recipe];
            createDetails(recipe, data);
        });
}

loadData();

var title = document.getElementById("title");
var ingredientsList = document.getElementById("ingredientsList");
var link = document.getElementById("link");
var directionsList = document.getElementById("directionsList");



function createDetails(name, details) {
    title.innerText = name;

    var ingredients = details["ingredients"];

    for (var i = 0; i < ingredients.length; i++) {
        ingredientsList.appendChild(createIngredientsLi(ingredients[i]));
    }

    link.href = "https://" + details["link"];

    var directions = details["directions"];

    for (var i = 0; i < directions.length; i++) {
        directionsList.appendChild(createDirectionsLi(directions[i]));
    }
}


function createDirectionsLi(direction) {
    var li = document.createElement("li");
    li.classList.add("list-group-item");
    li.classList.add("px-0");
    li.innerText = direction.charAt(0).toUpperCase() + direction.slice(1);
    return li;
}

function createIngredientsLi(ingredient) {
    var li = document.createElement("li");
    li.innerText = ingredient.charAt(0).toUpperCase() + ingredient.slice(1);
    return li;
}


