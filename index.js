var source = "https://raw.githubusercontent.com/Borudagaming/EmptyFridge/main/data/";
var resultlimit = 10;
var currentPage = 0;
var ingredients = [];
var results = {};

function loadData() {
    fetch(source + "Ingredient0.json")
        .then(response => response.json())
        .then(res_data => {
            ingredients = res_data;
        });
}

var input = document.getElementById("search");
var search = document.getElementById("search_button");
var recipeElement = document.getElementById("recipesList");
var expand = document.getElementById("expand");
var header = document.getElementById("header");

loadData();


search.addEventListener("click", function () {
    var tags = [];
    Array.from(input.selectedOptions).forEach(e => tags.push(e.innerText));

    expand.classList.remove("d-none");
    expand.classList.add("d-flex");
    header.hidden = false;

    addRecipes(tags);
});

input.addEventListener("keyup", function (event) {
    if (event.which === 13) {
        event.preventDefault();
        console.log("Enter pressed");
    }
});

/*
        <div class="row px-xl-5">
            <div class="col-lg-3 col-md-4 col-sm-6 pb-1">
                <div class="product-item bg-light mb-4">
                    <div class="text-center py-4">
                        <a class="h6 text-decoration-none text-truncate" href="">Product Name Goes Here</a>
                    </div>
                </div>
            </div>
        </div>
 */
function createRecipe(title) {
    var div1 = document.createElement("div");
    div1.classList.add("row");
    div1.classList.add("px-xl-5");

    var div2 = document.createElement("div");
    div2.classList.add("col-lg-3");
    div2.classList.add("col-md-4");
    div2.classList.add("col-sm-6");
    div2.classList.add("pb-1");

    var div3 = document.createElement("div");
    div3.classList.add("product-item");
    div3.classList.add("bg-light");
    div3.classList.add("mb-4");

    var div4 = document.createElement("div");
    div4.classList.add("text-center");
    div4.classList.add("py-4");

    var a = document.createElement("a");
    a.classList.add("h6");
    a.classList.add("text-decoration-none");
    a.classList.add("text-truncate");
    a.href = "";
    a.innerText = title;

    div4.appendChild(a);
    div3.appendChild(div4);
    div2.appendChild(div3);
    div1.appendChild(div2);

    return div1;
}

function addRecipes(tags) {
    tags.forEach(tag => {
        if (ingredients[tag] != null) {
            ingredients[tag].forEach(recipe => {
                if (results[recipe[0]] == null) {
                    results[recipe[0]] += recipe[1];
                } else {
                    results[recipe[0]] = recipe[1];
                }
            });
        }
    });

    var sorted = Object.keys(results).sort(function (a, b) {
        return results[b] - results[a];
    });

    for (var i = 0; i < resultlimit; i++) {
        recipeElement.appendChild(createRecipe(sorted[i]));
    }

    currentPage++;
}

function expandResults() {
    for (var i = currentPage * resultlimit; i < resultlimit; i++) {
        recipeElement.appendChild(createRecipe(sorted[i]));
    }
}