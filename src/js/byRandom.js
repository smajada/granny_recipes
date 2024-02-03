const urlRecipes = "https://www.themealdb.com/api/json/v1/1/random.php";
const recipesContainer = document.getElementById("recipes-container");
const modalContainer = document.getElementById("modal-container");


function createCard(recipe) {
   const template = `
   <div class="col-3">
      <div class="card mb-4" style="width: 18rem;">
         <img src="${recipe.meals[0].strMealThumb}" class="card-img-top" alt="Food photo">
         <div class="card-body">
            <h5 class="card-title">${recipe.meals[0].strMeal}</h5>
            <p class="card-text">${recipe.meals[0].strCategory}</p>
            <a href="#" class="btn btn-dark bi bi-heart-fill bi-heart-fill-hover"></a>
            <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modal_${recipe.meals[0].idMeal}">
               More info
            </button>
         </div>
      </div>
   </div>`;

   return template;
}

function createModal(recipe) {
   const modalId = recipe.meals[0].idMeal;
   const modalTitle = recipe.meals[0].strMeal;
   const modalImage = recipe.meals[0].strMealThumb;
   const modalInstructions = recipe.meals[0].strInstructions
   const ingredientsList = createIngredientsList(recipe.meals[0]);
   
   const template = `
      <div class="modal fade" id="modal_${modalId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog modal-xl">
         <div class="modal-content">
            <div class="modal-header">
               <h1 class="modal-title fs-5" id="exampleModalLabel">${modalTitle}</h1>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <div d-flex flex-column>
               <img src="${modalImage}" class="w-100 h-auto" alt="Food photo">
               <h5 class="mt-3">Ingredients:</h5>
               <ul class="mt-2">
                  ${ingredientsList}
               </ul>
               <div>
                  ${modalInstructions}
               </div>
            </div>
            </div>
            <div class="modal-footer">
               <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
               <button type="button" class="btn btn-dark bi bi-heart-fill bi-heart-fill-hover"></button>
            </div>
         </div>
         </div>
      </div>`;
   
   return template;
}

function createIngredientsList(meal) {

   let ingredientsList = '';
   for (let i = 1; i < 20; i++) {
      const ingredient = meal[`strIngredient${i}`]
      const measure = meal[`strMeasure${i}`]
      
      if (!ingredient && !measure) {
         break;
      }

      ingredientsList += `<li>${ingredient} - ${measure}</li>`
   }
   return ingredientsList;
}

export async function getByRandom() {
   const promises = [];

   for (let i = 0; i <= 7; i++) {
      const response = await fetch(urlRecipes);
      const recipe = await response.json();

      promises.push(recipe);
   }

   const randomRecipes = await Promise.all(promises);
   randomRecipes.forEach((randomRecipe) => {
      recipesContainer.innerHTML += createCard(randomRecipe);
      modalContainer.innerHTML += createModal(randomRecipe);
   });
}
