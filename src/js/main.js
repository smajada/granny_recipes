// Import our custom CSS
import "../scss/styles.scss";
// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";
import { getByRandom } from "./byRandom";
import { getByCategory, listCategories } from "./byCategory";

const showMoreBtn = document.getElementById("showMore-btn");
const categoriesContainer = document.getElementById('categories-container');

// Random recipes
(getByRandom)();
showMoreBtn.addEventListener('click', () => getByRandom());

// Categories
(listCategories)();
if (categoriesContainer) {
   categoriesContainer.addEventListener('click', function (event) {
      const categoryBtn = event.target.closest('#category-btn');

      if (categoryBtn) {
         const categoryTextElement = categoryBtn.querySelector('h5');
         
         if (categoryTextElement) {
            const categoryFood = categoryTextElement.textContent;
            getByCategory(categoryFood);
         } else {
            console.error('Elemento h5 no encontrado dentro del botón de categoría');
         }
      }
   });
} else {
   console.log('Contenedor de categorías no encontrado');
}

// Importa la funcionalidad de los Tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))