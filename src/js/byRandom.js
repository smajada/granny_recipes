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
   const template = `
      <div class="modal fade" id="modal_${recipe.meals[0].idMeal}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
         <div class="modal-dialog modal-xl">
         <div class="modal-content">
            <div class="modal-header">
               <h1 class="modal-title fs-5" id="exampleModalLabel">${recipe.meals[0].strMeal}</h1>
               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
            <div d-flex flex-column>
               <div>
                  <img src="${recipe.meals[0].strMealThumb}" alt="Food photo">
               </div>
               <div>
                  ${recipe.meals[0].strInstructions}
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
