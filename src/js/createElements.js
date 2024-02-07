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
		template = ` 
   <div class="flex-item mb-4">
      <div class="card mx-auto" style="width: 18rem;">
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
	} else {
		// Estructura de la tarjeta en formato HTML
		template = `
   <div class="mb-4">
      <div class="card mx-auto" style="width: 18rem;">
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
export function createModal(recipe, isFavorite) {
	const recipeId = recipe.meals[0].idMeal;
	const recipeTitle = recipe.meals[0].strMeal;
	const recipeImage = recipe.meals[0].strMealThumb;
	const recipeInstructions = recipe.meals[0].strInstructions;
	const recipeCategory = recipe.meals[0].strCategory;
	const recipeArea = recipe.meals[0].strArea;
	const recipeComment = recipe.meals[0].comment;
	const ingredientsList = createIngredientsList(recipe.meals[0]);
	let template = "";

	console.log(recipeComment);

	if (isFavorite) {
		// Estructura del modal en formato HTML
		template = `
   <div class="modal fade" id="modal_${recipeId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
         <div class="modal-content">
            <div class="modal-header">
               <h1 class="modal-title" id="exampleModalLabel">${recipeTitle} - <span class="text-secondary">${recipeCategory}</span></h1>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex flex-column">
               <div class="d-flex flex-wrap justify-content-around h-auto">
                  <img src="${recipeImage}" class="h-400 rounded" alt="Food photo"/>
                  <div class="d-flex flex-grow-1 justify-content-around align-items-start mt-5">
                     <div class="d-flex flex-column justify-content-start">
                        <h3>Ingredients</h3>
                        <ul class="mt-2">
                           ${ingredientsList}
                        </ul>
                     </div>
                     <div class="d-flex flex-column align-items-start w-max-400">
                        <h3 class="text-center">Comments</h3>
                        <p class="text-justify">${
													recipeComment ? recipeComment : "No comments yet"
												}</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div class="m-3">
                  <h3>Instructions</h3>
                  <p class="text-justify">${recipeInstructions}</p>
                  </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
               <button class="btn btn-primary" data-bs-target="#commentModalToggle_${recipeId}" data-bs-toggle="modal">Update comment</button>
            </div>
         </div>
      </div>
   </div>
   <div class="modal fade" id="commentModalToggle_${recipeId}" aria-labelledby="exampleModalToggleLabel2" tabindex="-1" style="display: none;" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalToggleLabel2">Add a comment to your recipe</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="form-floating">
            <textarea class="form-control" placeholder="Leave a comment here" style="height: 100px" id="comment_${recipeId}">${
			recipeComment !== "" ? recipeComment : "No comments yet"
		}</textarea>
        </div>
          </div>
          <div class="modal-footer">
          <button class="btn btn-primary update-btn" id="update-btn_${recipeId}" data-bs-dismiss="modal">Update comment</button>
          </div>
        </div>
      </div>
    </div>
   `;
	} else {
		// Estructura del modal en formato HTML
		template = `
   <div class="modal fade" id="modal_${recipeId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
         <div class="modal-content">
            <div class="modal-header">
               <h1 class="modal-title" id="exampleModalLabel">${recipeTitle} - <span class="text-secondary">${recipeCategory}</span></h1>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body d-flex flex-column">
               <div class="d-flex flex-wrap justify-content-around h-auto">
                  <img src="${recipeImage}" class="h-400 rounded" alt="Food photo"/>
                  <div class="d-flex flex-grow-1 justify-content-around align-items-start mt-5">
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
   </div>
   
   `;
	}
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

/**
 * Displays a notification message on the screen.
 *
 * @param {string} message - The message to be displayed in the notification.
 * @param {string} className - The CSS class name to be applied to the notification element.
 */
export function showNotification(message, className) {
	const notification = document.createElement("div");
	notification.className = `alert alert-${className}`;
	notification.appendChild(document.createTextNode(message));

	const container = document.getElementById("notification-container");
	container.appendChild(notification);

	setTimeout(() => {
		notification.remove();
	}, 3000);
}
