import { createCard, createModal, showNotification } from "./createElements.js";

/**
 * Opens an IndexedDB database and creates an object store for recipes.
 * @returns {IDBOpenDBRequest} The request to open the IndexedDB database.
 */
export function openIndexedDB() {
	const db = indexedDB.open("recipes", 1);

	db.onupgradeneeded = (event) => {
		const db = event.target.result;
		const objectStore = db.createObjectStore("recipes", { keyPath: "id" });
	};

	return db;
}

/**
 * Adds a recipe to the IndexedDB.
 *
 * @param {Object} recipe - The recipe object to be added.
 */
export function addRecipeToIndexedDB(recipe) {
	if (recipe && recipe.meals && recipe.meals.length > 0) {
		const db = openIndexedDB();

		console.log(recipe);

		db.onsuccess = (event) => {
			const db = event.target.result;
			const transaction = db.transaction("recipes", "readwrite");
			const objectStore = transaction.objectStore("recipes");

			objectStore.add({
				id: recipe.meals[0].idMeal,
				recipe: recipe,
			});

			transaction.oncomplete = () => {
				showNotification("Recipe added to favorites", "success");
			};

			transaction.onerror = () => {
				showNotification(
					"Error adding recipe to favorites." + transaction.error,
					"danger"
				);
			};
		};
	}
}

/**
 * Retrieves recipes from IndexedDB and displays them on the page.
 */
export function getRecipesFromIndexedDB() {
	const db = openIndexedDB();

	db.onsuccess = (event) => {
		const db = event.target.result;
		const transaction = db.transaction("recipes", "readonly");
		const objectStore = transaction.objectStore("recipes");
		const request = objectStore.getAll();

		request.onsuccess = (event) => {
			const recipes = event.target.result;

			const favoritesContainer = document.getElementById("favorites-container");
			const modalContainer = document.getElementById("modal-container");

			recipes.forEach((recipe) => {
				const recipeCard = createCard(recipe.recipe, true);
				const recipeModal = createModal(recipe.recipe, true);

				favoritesContainer.innerHTML += recipeCard;
				modalContainer.innerHTML += recipeModal;
			});

			if (recipes.length === 0) {
				favoritesContainer.innerHTML = `<div class="container my-4 vh-60 d-flex align-items-center justify-content-center">
					<h3 class="text-center">Go to <a class="text-dark text-decoration-none bg-beige-hover" href="./discover.html">discover</a> and start getting your favorites</p>
				</div>`;
			}
		};

		request.onerror = () => {
			showNotification(
				"Error retrieving recipes from favorites." + request.error,
				"danger"
			);
		};
	};
}

/**
 * Deletes a recipe from the IndexedDB.
 *
 * @param {number} recipeId - The ID of the recipe to be deleted.
 */
export function deleteRecipeFromIndexedDB(recipeId) {
	const db = openIndexedDB();

	db.onsuccess = (event) => {
		const db = event.target.result;
		const transaction = db.transaction("recipes", "readwrite");
		const objectStore = transaction.objectStore("recipes");

		objectStore.delete(recipeId);

		transaction.oncomplete = () => {
			const favoritesContainer = document.getElementById("favorites-container");
			showNotification("Recipe removed from favorites", "info");

			favoritesContainer.innerHTML = "";
			getRecipesFromIndexedDB();
		};

		transaction.onerror = () => {
			showNotification(
				"Error removing recipe from favorites." + transaction.error,
				"error"
			);
		};
	};
}

/**
 * Updates a comment to the recipe in the IndexedDB and if it doesn't exist, it creates it.
 *
 * @param {number} recipeId - The ID of the recipe to be updated.
 * @param {string} comment - The comment to be added.
 */
export function updateCommentInIndexedDB(recipeId, comment) {
	const db = openIndexedDB();

	db.onsuccess = (event) => {
		const db = event.target.result;
		const transaction = db.transaction("recipes", "readwrite");
		const objectStore = transaction.objectStore("recipes");

		const request = objectStore.get(recipeId);

		request.onsuccess = (event) => {
			const recipe = event.target.result;
			if (recipe) {
				recipe.recipe.meals[0].comment = comment;

				objectStore.put(recipe);
				showNotification("Comment updated in favorites", "success");

				setTimeout(() => {
					window.location.reload();
				}, 1000);
			} else {
				showNotification("Recipe not found in favorites", "danger");
			}
		};

		request.onerror = () => {
			showNotification(
				"Error updating comment in favorites." + request.error,
				"danger"
			);
		};
	};
}
