const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const searchInput = document.getElementById('search-input');
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navList = document.querySelector('.nav-list');

    navToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const slideshow = document.getElementById('slideshow');

    searchInput.addEventListener('input', () => {
        if (searchInput.value.trim() !== '') {
            slideshow.style.display = 'none'; // Hide slideshow when there's input
        } else {
            slideshow.style.display = 'flex'; // Show slideshow when input is empty
        }
    });
});


// event listeners  
searchBtn.addEventListener('click', getMealList);
searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        getMealList();
    }
});
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// get meal list that matches with the ingredients
function getMealList(){
    let searchInputTxt = searchInput.value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "meal-item" data-id = "${meal.idMeal}">
                        <div class = "meal-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div class = "meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href = "#" class = "recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry, we didn't find any meal!";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
        document.querySelector('.meal-result').classList.remove('hidden');
    });
}

// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals));
    }
}

// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2 class = "recipe-title">${meal.strMeal}</h2>
        <p class = "recipe-category">${meal.strCategory}</p>
        <div class = "recipe-instruct">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        <div class = "recipe-meal-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>
        <div class = "recipe-link">
            <a href = "${meal.strYoutube}" target = "_blank">Watch Video</a>
        </div>
    `;
    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}
document.addEventListener('DOMContentLoaded', () => {
    fetchSampleRecipes(50); // Fetch and display 6 sample recipes on page load
});

function fetchSampleRecipes(count) {
    const sampleMealsContainer = document.getElementById('sample-meals');
    sampleMealsContainer.innerHTML = ''; // Clear previous content

    for (let i = 0; i < count; i++) {
        fetch('https://www.themealdb.com/api/json/v1/1/random.php')
            .then(response => response.json())
            .then(data => {
                data.meals.forEach(meal => {
                    const mealItem = document.createElement('div');
                    mealItem.classList.add('meal-item');
                    mealItem.dataset.id = meal.idMeal; // Add data-id for the recipe modal
                    mealItem.innerHTML = `
                        <div class="meal-img">
                            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>
                    `;
                    sampleMealsContainer.appendChild(mealItem);
                });
            })
            .catch(error => console.error('Error fetching sample recipes:', error));
    }
}


// Event listener for sample meals to display recipe details
document.getElementById('sample-meals').addEventListener('click', getMealRecipe);


