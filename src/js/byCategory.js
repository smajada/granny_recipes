import { createCard, createModal } from './byRandom';
import { getById } from './byId';

const urlCategories = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
const urlRecipe = "https://www.themealdb.com/api/json/v1/1/filter.php";
const categoriesContainer = document.getElementById("categories-container");
const recipesContainer = document.getElementById("recipes-container");
const modalContainer = document.getElementById("modal-container");
const spinnerLoader = document.getElementById('spinner-loader');

function createCategory(categories) {
   const categoriesList = categories.meals;
   let template = '';

   categoriesList.forEach(category => {
      template +=
      `<div class="border-bottom-white border-bottom-brown-hover px-3 py-2" id="category-btn">
         <h5>${category.strCategory}</h5>
      </div>
      `;
   });

   return template;
}

export async function getByCategory(category) {
   const showMoreBtn = document.getElementById('showMore-btn');
   const categoryTitle = document.getElementById('category-title');
   
   const promise = await fetch(`${urlRecipe}?c=${category}`);
   const recipes = await promise.json();
   
   recipesContainer.innerHTML = '';
   modalContainer.innerHTML = '';
   categoryTitle.innerHTML = category;
   spinnerLoader.classList.remove('d-flex');
   spinnerLoader.classList.add('d-none');

   recipes.meals.forEach(async (recipe) => {

      const recipeById = await getById(recipe.idMeal);
      showMoreBtn.style.display = 'none';

      recipesContainer.innerHTML += createCard(recipeById);
      modalContainer.innerHTML += createModal(recipeById);
   });
}


export async function listCategories() { 
   if (categoriesContainer !== null) {
      
      const promise = await fetch(urlCategories);
      const categories = await promise.json();
      
      categoriesContainer.innerHTML = createCategory(categories);
   }
}