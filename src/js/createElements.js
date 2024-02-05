/**
 * Crear tarjeta.
 *
 * Crea y devuelve el HTML para una tarjeta de receta.
 * @param {Object} recipe - Objeto que contiene información de la receta.
 * @returns {string} - HTML de la tarjeta con detalles básicos de la receta.
 */
export function createCard(recipe, isFavorite) {
	const recipeId = recipe.meals[0].idMeal;
	const recipeTitle = recipe.meals[0].strMeal;
	const recipeImage = recipe.meals[0].strMealThumb;
	const recipeCategory = recipe.meals[0].strCategory;
	let template = "";

	if (isFavorite) {
		// Estructura de la tarjeta en formato HTML
		// Estructura de la tarjeta en formato HTML
		template = `
   <div class="col-3">
      <div class="card mb-4" style="width: 18rem;">
         <img src="${recipeImage}" class="card-img-top" alt="Food photo">
         <div class="card-body">
            <h5 class="card-title">${recipeTitle}</h5>
            <p class="card-text">${recipeCategory}</p>
            <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modal_${recipeId}">
            More info
            </button>
            <button class="btn btn-dark bi bi-heart-fill bi-heart-fill-hover" id="recipe_${recipeId}"></button>
            </div>
         </div>
      </div>
   </div>`;
	} else {
		template = ` <div class="col-3">
      <div class="card mb-4" style="width: 18rem;">
         <img src="${recipeImage}" class="card-img-top" alt="Food photo">
         <div class="card-body">
            <h5 class="card-title">${recipeTitle}</h5>
            <p class="card-text">${recipeCategory}</p>
            <div class="d-flex justify-content-between">
            <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modal_${recipeId}">
            More info
            </button>
            <button class="btn btn-dark bi bi-x-circle bi-x-circle-hover" id="recipe_${recipeId}"></button>
            </div>
         </div>
      </div>
   </div>`;
	}

	return template;
}

/**
 * Crear modal.
 *
 * Crea y devuelve el HTML para un modal de receta.
 * @param {Object} recipe - Objeto que contiene información de la receta.
 * @returns {string} - HTML del modal con detalles de la receta.
 */
export function createModal(recipe) {
	const recipeId = recipe.meals[0].idMeal;
	const recipeTitle = recipe.meals[0].strMeal;
	const recipeImage = recipe.meals[0].strMealThumb;
	const recipeInstructions = recipe.meals[0].strInstructions;
	const recipeCategory = recipe.meals[0].strCategory;
	const recipeArea = recipe.meals[0].strArea;
	const ingredientsList = createIngredientsList(recipe.meals[0]);

	// Estructura del modal en formato HTML
	const template = `
      <div class="modal fade" id="modal_${recipeId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog modal-xl">
            <div class="modal-content">
               <div class="modal-header">
                  <h1 class="modal-title" id="exampleModalLabel">${recipeTitle} - <span class="text-secondary">${recipeCategory}</span></h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
               </div>
               <div class="modal-body d-flex flex-column">

                  <div class="d-flex h-auto">
                     <img src="${recipeImage}" class="h-400 rounded" alt="Food photo"/>

                     <div class="d-flex flex-grow-1 justify-content-around align-items-start">
                        <div class="d-flex flex-column justify-content-start">
                           <h3>Ingredients</h3>
                           <ul class="mt-2">
                              ${ingredientsList}
                           </ul>
                        </div>
                        <div class="d-flex flex-column align-items-start w-max-400">
                           <h3 class="text-center">Info</h3>
                           <p><span class="fw-bold">Area:</span> ${recipeArea}</p>
                           <p><span class="fw-bold">Food category:</span> ${recipeCategory}</p>
                        </div>
                     </div>
                  </div>

                  <div class="mt-3">
                     <h3>Instructions</h3>
                     <p class="text-justify">${recipeInstructions}</p>
                  </div>
               </div>
               <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
               </div>
            </div>
         </div>
      </div>`;

	return template;
}

/**
 * Crear lista de ingredientes.
 *
 * Crea y devuelve una lista de ingredientes con sus cantidades para una receta.
 * @param {Object} meal - Objeto que contiene información de la receta, incluyendo ingredientes y medidas.
 * @returns {string} - Lista de ingredientes en formato HTML.
 */
function createIngredientsList(meal) {
	let ingredientsList = "";

	// Itera sobre los ingredientes y medidas (hasta 20) de la receta
	for (let i = 1; i < 20; i++) {
		const ingredient = meal[`strIngredient${i}`];
		const measure = meal[`strMeasure${i}`];

		// Verifica si hay ingredientes o medidas nulos y finaliza el bucle
		if (ingredient == null || measure == null) {
			break;
		} else if (!ingredient.trim() && !measure.trim()) {
			break;
		}

		// Agrega el elemento de lista con el nombre del ingrediente y su medida
		ingredientsList += `<li me-3>${ingredient} - ${measure}</li>`;
	}

	return ingredientsList;
}

/**
 * Elementos de categorías.
 *
 * Crea y devuelve el HTML para mostrar las categorías.
 * @param {Object} categories - Objeto que contiene las categorías de comidas.
 * @returns {string} - HTML con las categorías.
 */
export function createCategory(categories) {
	const categoriesList = categories.meals;
	let template = "";

	// Genera el HTML para cada categoría
	categoriesList.forEach((category) => {
		template += `<div class="border-bottom-white border-bottom-brown-hover px-3 py-2" id="category-btn">
         <h5>${category.strCategory}</h5>
      </div>`;
	});

	return template;
}
