// Importa nuestro CSS modificado
import "../scss/styles.scss";
// Importa todo el JS de Bootstrap
import * as bootstrap from "bootstrap";
import { getByRandom } from "./byRandom";
import { getByCategory, listCategories } from "./byCategory";

const showMoreBtn = document.getElementById("showMore-btn");
const categoriesContainer = document.getElementById('categories-container');

// Bloque de Recetas random
(getByRandom)(); // Muestra una receta aleatoria al cargar
showMoreBtn.addEventListener('click', () => getByRandom()); // Asocia mostrar más recetas al clicar en el botón

// Bloque de Categorías
(listCategories)(); // Lista las categorías al cargar
if (categoriesContainer) { // Manejo de clics en el contenedor de categorías
   categoriesContainer.addEventListener('click', function (event) {
      const categoryBtn = event.target.closest('#category-btn');
      if (categoryBtn) {
         const categoryTextElement = categoryBtn.querySelector('h5');
         if (categoryTextElement) getByCategory(categoryTextElement.textContent);
         else console.error('Element not found in category button');
      }
   });
} else console.log('Categories container not found');

// Bloque de Tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]'); // Selecciona elementos con tooltips
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl)); // Inicializa tooltips
