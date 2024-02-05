const urlRecipe = 'https://www.themealdb.com/api/json/v1/1/lookup.php';

/**
 * Fetch de receta por su ID
 * 
 * Obtiene detalles de una receta por su ID.
 * @param {string} id - ID de la receta.
 * @returns {Promise<Object>} - Promesa que resuelve con los detalles de la receta.
 */
export async function getById(id) {
   // Realiza una solicitud a la API para obtener detalles de la receta por su ID
   const promise = await fetch(`${urlRecipe}?i=${id}`);
   const recipe = await promise.json();

   return recipe;
}
