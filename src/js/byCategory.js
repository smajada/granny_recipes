const urlCategories = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
const urlRecipe = "https://www.themealdb.com/api/json/v1/1/filter.php";
const categoriesContainer = document.getElementById("categories-container");

function createCategory(categories) {
   const categoriesList = categories.meals;
   let template = '';

   categoriesList.forEach(category => {
      template +=
      `<div class="bg-brown-hover px-3 py-2 border-start" id="category-btn">
         <h5>${category.strCategory}</h5>
      </div>
      `;
   });
   
   return template;
}

export async function getByCategory(category) {
   const promise = await fetch(`${urlRecipe}?c=${category}`);
   const recipes = promise.json();

   console.log(recipes);
}


export async function listCategories() { 
   if (categoriesContainer !== null) {
      
      const promise = await fetch(urlCategories);
      const categories = await promise.json();
      
      categoriesContainer.innerHTML = createCategory(categories);
   }
}