// Importa nuestro CSS modificado
import "../scss/styles.scss";
// Importa todo el JS de Bootstrap
import * as bootstrap from "bootstrap";
import { getByCategory, listCategories } from "./byCategory";
import { getByRandom } from "./byRandom";
import {
	openIndexedDB,
	getRecipesFromIndexedDB,
	deleteRecipeFromIndexedDB,
	updateCommentInIndexedDB,
} from "./indexedDB";
import { initMap } from "./geolocation";
import { showNotification } from "./createElements";

const showMoreBtn = document.getElementById("showMore-btn");
const categoriesContainer = document.getElementById("categories-container");
const favoritesContainer = document.getElementById("favorites-container");
const modalContainer = document.getElementById("modal-container");

// Bloque de Recetas random
getByRandom(); // Muestra una receta aleatoria al cargar
if (showMoreBtn) {
	showMoreBtn.addEventListener("click", () => getByRandom()); // Asocia mostrar más recetas al clicar en el botón
}

// Bloque de Categorías
listCategories(); // Lista las categorías al cargar
if (categoriesContainer) {
	// Manejo de clics en el contenedor de categorías
	categoriesContainer.addEventListener("click", function (event) {
		const categoryBtn = event.target.closest("#category-btn");
		if (categoryBtn) {
			const categoryTextElement = categoryBtn.querySelector("h5");
			if (categoryTextElement) getByCategory(categoryTextElement.textContent);
			else console.error("Element not found in category button");
		}
	});
} else console.log("Categories container not found");

// Bloque de Tooltips
const tooltipTriggerList = document.querySelectorAll(
	'[data-bs-toggle="tooltip"]'
); // Selecciona elementos con tooltips
const tooltipList = [...tooltipTriggerList].map(
	(tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
); // Inicializa tooltips

// Favorites
if (favoritesContainer) {
	getRecipesFromIndexedDB();

	// Add event listener to the parent container
	favoritesContainer.addEventListener("click", (event) => {
		const target = event.target;

		// Check if the clicked element has the class "bi-x-circle"
		if (target.classList.contains("bi-x-circle")) {
			const recipeId = target.id.split("_")[1];
			deleteRecipeFromIndexedDB(recipeId);
		}
	});

	modalContainer.addEventListener("click", (event) => {
		const target = event.target;
		const recipeId = target.id.split("_")[1];
		const comment = document.getElementById(`comment_${recipeId}`);

		if (target.classList.contains("update-btn")) {
			updateCommentInIndexedDB(recipeId, comment.value);
		}
	});
}

// IndexedDB
(function () {
	const db = openIndexedDB();
	db.onsuccess = (event) => {
		console.log("IndexedDB abierto con éxito", event);
	};
})();
