import { createCard, createModal } from "./createElements.js";

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
				const recipeCard = createCard(recipe.recipe, false);
				const recipeModal = createModal(recipe.recipe);

				favoritesContainer.innerHTML += recipeCard;
				modalContainer.innerHTML += recipeModal;
			});

			if (recipes.length === 0) {
				favoritesContainer.innerHTML = `      <div class="container my-4">
        <p class="text-center">Go to discover and start getting your favorites</p>
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

export function deleteRecipeFromIndexedDB(recipeId) {
	const db = openIndexedDB();

	db.onsuccess = (event) => {
		const db = event.target.result;
		const transaction = db.transaction("recipes", "readwrite");
		const objectStore = transaction.objectStore("recipes");

		objectStore.delete(recipeId);

		transaction.oncomplete = () => {
			showNotification("Recipe removed from favorites", "success");
			getRecipesFromIndexedDB();
		};

		transaction.onerror = () => {
			showNotification(
				"Error removing recipe from favorites." + transaction.error,
				"danger"
			);
		};
	};
}

/**
 * Displays a notification message on the screen.
 *
 * @param {string} message - The message to be displayed in the notification.
 * @param {string} className - The CSS class name to be applied to the notification element.
 */
function showNotification(message, className) {
	const notification = document.createElement("div");
	notification.className = `alert alert-${className}`;
	notification.appendChild(document.createTextNode(message));

	const container = document.getElementById("notification-container");
	container.appendChild(notification);

	setTimeout(() => {
		notification.remove();
	}, 3000);
}
