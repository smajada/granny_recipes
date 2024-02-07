import { addRecipeToIndexedDB } from "./indexedDB";
import { createCard, createModal, createCategory } from "./createElements";
import { getById } from "./byId";

const urlCategories = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
const urlRecipe = "https://www.themealdb.com/api/json/v1/1/filter.php";
const categoriesContainer = document.getElementById("categories-container");
const recipesContainer = document.getElementById("recipes-container");
const modalContainer = document.getElementById("modal-container");
const spinnerLoader = document.getElementById("spinner-loader");

/**
 * Fetch recipes by category.
 *
 * Retrieves and displays recipes from a specific category.
 * @param {string} category - Category from which recipes will be obtained.
 * @returns {Promise<void>} - Promise that resolves when recipes have been obtained and displayed.
 */
export async function getByCategory(category) {
	const showMoreBtn = document.getElementById("showMore-btn");
	const categoryTitle = document.getElementById("category-title");

	// Makes a request to the API to get recipes from the specified category
	const promise = await fetch(`${urlRecipe}?c=${category}`);
	const recipes = await promise.json();

	// Clear the containers, update the category title, and hide the loading spinner
	recipesContainer.innerHTML = "";
	modalContainer.innerHTML = "";
	categoryTitle.innerHTML = category;
	spinnerLoader.classList.remove("d-flex");
	spinnerLoader.classList.add("d-none");

	// Iterates over the obtained recipes and displays them on the page
	recipes.meals.forEach(async (recipe) => {
		// Get additional details of the recipe by its ID
		const recipeById = await getById(recipe.idMeal);
		showMoreBtn.style.display = "none";

		// Add the cards and modals to the HTML
		recipesContainer.innerHTML += createCard(recipeById, false);
		modalContainer.innerHTML += createModal(recipeById, false);
	});

	// Add event listener to heart buttons
	recipesContainer.addEventListener("click", async (event) => {
		const target = event.target;
		if (target.classList.contains("bi-heart-fill")) {
			const recipeId = target.id.split("_")[1];

			const selectedRecipe = recipes.meals.find(
				(recipe) => recipe.idMeal === recipeId
			);

			const recipe = await getById(recipeId);

			addRecipeToIndexedDB(recipe);
		}
	});
}

/**
 * Fetch categories.
 *
 * Retrieves and lists the available food categories.
 * @returns {Promise<void>} - Promise that resolves when the categories have been obtained and displayed.
 */
export async function listCategories() {
	// Check the existence of the categories container
	if (categoriesContainer !== null) {
		// Makes a request to the API to get the list of categories
		const promise = await fetch(urlCategories);
		const categories = await promise.json();

		// Adds the HTML of the categories to the container
		categoriesContainer.innerHTML = createCategory(categories);
	}
}
