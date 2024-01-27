// Import our custom CSS
import "../scss/styles.scss";

// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";
import { getByRandom } from "./byRandom";

const randomBtn = document.getElementById('random-btn');
const recipesContainer = document.getElementById('recipes-container');

randomBtn.addEventListener('click', async () => {
   const randomRecipe = await getByRandom();
   // console.log(randomRecipe);
   recipesContainer.innerHTML = 
      `<ul>
         <li>${randomRecipe.meals[0].strMeal}</li>
         <img src="${randomRecipe.meals[0].strMealThumb}" alt="Food photo">
      </ul>`
})