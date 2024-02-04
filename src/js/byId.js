const urlRecipe = 'https://www.themealdb.com/api/json/v1/1/lookup.php';

export async function getById(id) {
   const promise = await fetch(`${urlRecipe}?i=${id}`);
   const recipe = await promise.json();

   return recipe;
}