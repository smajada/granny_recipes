// Import our custom CSS
import "../scss/styles.scss";
// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";
import { getByCategory, listCategories } from "./byCategory";
import { getByRandom } from "./byRandom";
import { openIndexedDB, getRecipesFromIndexedDB } from "./indexedDB";

const showMoreBtn = document.getElementById("showMore-btn");
const categoriesContainer = document.getElementById("categories-container");
const favoritesContainer = document.getElementById("favorites-container");

// Random recipes
getByRandom();
if (showMoreBtn) {
	showMoreBtn.addEventListener("click", getByRandom);
}

// Categories
listCategories();
if (categoriesContainer) {
	categoriesContainer.addEventListener("click", function (event) {
		const categoryBtn = event.target.closest("#category-btn");

		if (categoryBtn) {
			const categoryTextElement = categoryBtn.querySelector("h5");

			if (categoryTextElement) {
				const categoryFood = categoryTextElement.textContent;
				getByCategory(categoryFood);
			} else {
				console.error(
					"Elemento h5 no encontrado dentro del botón de categoría"
				);
			}
		}
	});
} else {
	console.log("Contenedor de categorías no encontrado");
}

// Favorites
if (favoritesContainer) {
	getRecipesFromIndexedDB();
}

// IndexedDB
(function () {
	const db = openIndexedDB();
	db.onsuccess = (event) => {
		console.log("IndexedDB abierto con éxito", event);
	};
})();
