import { createCard, createModal } from "./createElements";

const urlRecipes = "https://www.themealdb.com/api/json/v1/1/random.php";
const recipesContainer = document.getElementById("recipes-container");
const modalContainer = document.getElementById("modal-container");
import { addRecipeToIndexedDB } from "./indexedDB";
const spinnerLoader = document.getElementById("spinner-loader");

/**
 * Random Recipes Fetch.
 *
 * Retrieves random recipes and displays them on the page.
 * Uses the fetch API to fetch data and the createCard and createModal functions to generate HTML.
 * @returns {Promise<void>} - Promise that resolves when the recipes have been fetched and displayed.
 */
export async function getByRandom() {
	const promises = [];

	// Check the existence of the recipes and modals containers
	if (recipesContainer !== null && modalContainer !== null) {
		// Make 8 asynchronous requests to the recipes API
		for (let i = 0; i <= 7; i++) {
			const response = await fetch(urlRecipes);
			const recipe = await response.json();
			promises.push(recipe);
		}

		// Wait for all promises to resolve and get the random recipes
		const randomRecipes = await Promise.all(promises);

		// Hide the loading spinner
		spinnerLoader.classList.remove("d-flex");
		spinnerLoader.classList.add("d-none");

		// Add the HTML of the recipes and modals to the corresponding container
		randomRecipes.forEach((randomRecipe) => {
			recipesContainer.innerHTML += createCard(randomRecipe, false);
			modalContainer.innerHTML += createModal(randomRecipe, false);
		});

		// Add event listener to heart buttons
		recipesContainer.addEventListener("click", (event) => {
			const target = event.target;
			if (target.classList.contains("bi-heart-fill")) {
				const recipeId = target.id.split("_")[1];

				const selectedRecipe = randomRecipes.find(
					(recipe) => recipe.meals[0].idMeal === recipeId
				);

				addRecipeToIndexedDB(selectedRecipe);
			}
		});
	}
}
