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
 * Fetch de recetas por categoría.
 *
 * Obtiene y muestra recetas de una categoría específica.
 * @param {string} category - Categoría de la que se obtendrán las recetas.
 * @returns {Promise<void>} - Promesa que resuelve cuando se han obtenido y mostrado las recetas.
 */
export async function getByCategory(category) {
	const showMoreBtn = document.getElementById("showMore-btn");
	const categoryTitle = document.getElementById("category-title");

	// Realiza una solicitud a la API para obtener recetas de la categoría especificada
	const promise = await fetch(`${urlRecipe}?c=${category}`);
	const recipes = await promise.json();

	// Limpia los contenedores, actualiza el título de la categoría y esconde el spinner de carga
	recipesContainer.innerHTML = "";
	modalContainer.innerHTML = "";
	categoryTitle.innerHTML = category;
	spinnerLoader.classList.remove("d-flex");
	spinnerLoader.classList.add("d-none");

	// Itera sobre las recetas obtenidas y las muestra en la página
	recipes.meals.forEach(async (recipe) => {
		// Obtiene detalles adicionales de la receta por su ID
		const recipeById = await getById(recipe.idMeal);
		showMoreBtn.style.display = "none";

		// Agrega las tarjetas y modales al HTML
		recipesContainer.innerHTML += createCard(recipeById);
		modalContainer.innerHTML += createModal(recipeById);
	});
	// Add event listener to heart buttons
	recipesContainer.addEventListener("click", (event) => {
		const target = event.target;
		if (target.classList.contains("bi-heart-fill-hover")) {
			const recipeId = target.id.split("_")[1];
			const selectedRecipe = recipes.meals.find(
				(recipe) => recipe.idMeal === recipeId
			);

			addRecipeToIndexedDB(selectedRecipe);
		}
	});
}
/**
 * Fetch de las categorías.
 *
 * Obtiene y lista las categorías de comidas disponibles.
 * @returns {Promise<void>} - Promesa que resuelve cuando se han obtenido y mostrado las categorías.
 */
export async function listCategories() {
	// Verifica la existencia del contenedor de categorías
	if (categoriesContainer !== null) {
		// Realiza una solicitud a la API para obtener la lista de categorías
		const promise = await fetch(urlCategories);
		const categories = await promise.json();

		// Agrega el HTML de las categorías al contenedor
		categoriesContainer.innerHTML = createCategory(categories);
	}
}
