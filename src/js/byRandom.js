const urlRecipes = 'https://www.themealdb.com/api/json/v1/1/random.php'


export async function getByRandom() {
   const response = await fetch(urlRecipes);
   const recipes = await response.json();

   return recipes;
}