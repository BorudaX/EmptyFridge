var source = "https://raw.githubusercontent.com/Borudagaming/EmptyFridge/main/data/";
var resultlimit = 10;
var currentPage = 0;
var ingredients = [];
var contents;
var results = {};
var sorted;

function loadData() {
    fetch(source + "Ingredient0.json")
        .then(response => response.json())
        .then(res_data => {
            ingredients = res_data;
        });


    fetch(source + "RecipeToOriginFile.json")
        .then(response => response.json())
        .then(res_data => {
            contents = res_data;
        });
}

var input = document.getElementById("search");
var search = document.getElementById("search_button");
var recipeElement = document.getElementById("recipesList");
var expand = document.getElementById("expand");
var expandButton = document.getElementById("expandButton");
var header = document.getElementById("header");

loadData();


search.addEventListener("click", function () {
    var tags = [];
    reset();

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

expandButton.addEventListener("click", function () {
    console.log("Expand");
    expandResults();
});

function createRecipe(recipe) {
    console.log(recipe);
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
    div4.classList.add("d-flex");
    div4.classList.add("flex-row");

    var a = document.createElement("a");
    a.classList.add("h6");
    a.classList.add("text-decoration-none");
    a.classList.add("text-truncate");
    a.href = "https://borudagaming.github.io/EmptyFridge/detail.html?r=" + recipe[0] + "&p=" + contents[recipe[0]];
    a.innerText = recipe[0];

    div4.appendChild(a);
    div4.appendChild(createRating(recipe[1]));
    div3.appendChild(div4);
    div2.appendChild(div3);
    div1.appendChild(div2);

    return div1;
}


function createRating(rating) {
    var div = document.createElement("div");
    div.classList.add("ml-auto");
    div.classList.add("pr-5");

    var div1 = document.createElement("div");
    div1.classList.add("progress");
    rating = Math.round(rating * 100) / 100;
    div1.setAttribute("data-value", (rating * 100).toFixed(0));

    var div2 = document.createElement("span");
    div2.classList.add("progress-left");

    var div3 = document.createElement("span");
    div3.classList.add("progress-bar");
    div3.classList.add("border-primary");

    var div4 = document.createElement("span");
    div4.classList.add("progress-right");

    var div5 = document.createElement("span");
    div5.classList.add("progress-bar");
    div5.classList.add("border-primary");

    var div6 = document.createElement("div");
    div6.classList.add("progress-value");
    div6.classList.add("w-100");
    div6.classList.add("h-100");
    div6.classList.add("rounded-circle");
    div6.classList.add("d-flex");
    div6.classList.add("align-items-center");
    div6.classList.add("justify-content-center");

    var div7 = document.createElement("div");
    div7.classList.add("p");
    div7.innerText = (rating * 100).toFixed(0) + "%";;

    div6.appendChild(div7);
    div4.appendChild(div5);
    div2.appendChild(div3);
    div1.appendChild(div2);
    div1.appendChild(div4);
    div1.appendChild(div6);
    div.appendChild(div1);

    return div;
}

function addRecipes(tags) {
    tags.forEach(tag => {
        if (ingredients[tag] != null) {
            ingredients[tag].forEach(recipe => {
                // console.log(recipe[0] + " " + recipe[1]);

                if (results[recipe[0]] != null) {
                    console.log("Adding " + recipe[1] + " to " + recipe[0], results[recipe[0]], tag);
                    results[recipe[0]] += Number(recipe[1]);
                } else {
                    results[recipe[0]] = Number(recipe[1]);
                }
            });
        }
    });

    sorted = Object.keys(results).sort(function (a, b) {
        return results[b] - results[a];
    });

    expandResults();
}

function expandResults() {
    for (var i = currentPage * resultlimit; i < resultlimit + (currentPage * resultlimit); i++) {
        if (sorted[i] == null) {
            console.log("No more results");
            recipeElement.appendChild(addFooter());

            expand.classList.remove("d-flex");
            expand.classList.add("d-none");
            break;
        } else {
            recipeElement.appendChild(createRecipe([sorted[i], results[sorted[i]]]));
        }
    }


    $(".progress").each(function () {
        var value = $(this).attr('data-value');
        var left = $(this).find('.progress-left .progress-bar');
        var right = $(this).find('.progress-right .progress-bar');

        if (value > 0) {
            if (value <= 50) {
                right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
            } else {
                right.css('transform', 'rotate(180deg)')
                left.css('transform', 'rotate(' + percentageToDegrees(value - 50) + 'deg)')
            }
        }

    })

    currentPage++;
}

function reset() {
    recipeElement.innerHTML = "";
    results = {};
    sorted = [];
    resultlimit = 10;
    currentPage = 0;
}

function addFooter() {
    var div = document.createElement("div");
    div.classList.add("justify-content-center");
    div.classList.add("d-flex");
    div.classList.add("text-black-50");
    div.id = "footer";

    var h7 = document.createElement("h7");
    var small = document.createElement("small");
    small.innerText = "You reached the end of the list";

    h7.appendChild(small);

    div.appendChild(h7);

    return div;
}

function percentageToDegrees(percentage) {
    return percentage / 100 * 360;
}
