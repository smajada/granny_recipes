const urlRecipes = "https://www.themealdb.com/api/json/v1/1/random.php";
const recipesContainer = document.getElementById("recipes-container");

function createCard(recipe) {
   const template =
   `
   <div class="col-3">
      <div class="card mb-4" style="width: 18rem;">
         <img src="${recipe.meals[0].strMealThumb}" class="card-img-top" alt="Food photo">
         <div class="card-body">
            <h5 class="card-title">${recipe.meals[0].strCategory}</h5>
            <p class="card-text">${recipe.meals[0].strMeal}</p>
            <a href="#" class="btn btn-primary">Add to favourites</a>
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
   randomRecipes.forEach(randomRecipe => {
      recipesContainer.innerHTML += createCard(randomRecipe);
   })
   
}
