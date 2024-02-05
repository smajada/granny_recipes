import { createCard, createModal } from "./createElements";

const urlRecipes = "https://www.themealdb.com/api/json/v1/1/random.php";
const recipesContainer = document.getElementById("recipes-container");
const modalContainer = document.getElementById("modal-container");
import { addRecipeToIndexedDB } from "./indexedDB";
const spinnerLoader = document.getElementById('spinner-loader');

/**
 * Fetch de recetas aleatorias.
 * 
 * Obtiene recetas aleatorias y las muestra en la página.
 * Utiliza la API fetch para obtener datos y las funciones createCard y createModal para generar HTML.
 * @returns {Promise<void>} - Promesa que resuelve cuando se han obtenido y mostrado las recetas.
 */
export async function getByRandom() {
	const promises = [];

   // Verifica la existencia de los contenedores de recetas y modales
   if (recipesContainer !== null && modalContainer !== null) {
      // Realiza 8 peticiones a la API de recetas de forma asíncrona
      for (let i = 0; i <= 7; i++) {
         const response = await fetch(urlRecipes);
         const recipe = await response.json();
         promises.push(recipe);
      }

      // Espera a que todas las promesas se resuelvan y obtiene las recetas aleatorias
      const randomRecipes = await Promise.all(promises);

      // Oculta el spinner de carga
      spinnerLoader.classList.remove('d-flex');
      spinnerLoader.classList.add('d-none');

      // Agrega el HTML de las recetas y modales al contenedor correspondiente
      randomRecipes.forEach((randomRecipe) => {
         recipesContainer.innerHTML += createCard(randomRecipe);
         modalContainer.innerHTML += createModal(randomRecipe);
      });
   }
		recipesContainer.addEventListener("click", (event) => {
			const target = event.target;
			if (target.classList.contains("bi-heart-fill-hover")) {
				const recipeId = target.id.split("_")[1];
				const selectedRecipe = randomRecipes.find(
					(recipe) => recipe.meals[0].idMeal === recipeId

				);
				if (selectedRecipe) {
					addRecipeToIndexedDB(selectedRecipe);
				}
			}
		});
}

