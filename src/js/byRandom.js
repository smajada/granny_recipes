const urlRecipes = "https://www.themealdb.com/api/json/v1/1/random.php";
const recipesContainer = document.getElementById("recipes-container");

export async function getByRandom() {
   const response = await fetch(urlRecipes);
   const randomRecipe = await response.json();

   recipesContainer.innerHTML =
   `<ul>
      <li>${randomRecipe.meals[0].strMeal}</li>
      <img src="${randomRecipe.meals[0].strMealThumb}" alt="Food photo">
   </ul>`;
}