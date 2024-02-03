const urlCategories = "https://www.themealdb.com/api/json/v1/1/list.php?c=list";
const categoriesContainer = document.getElementById("categories-container");

function createCategory(categories) {
   const categoriesList = categories.meals;
   let template = '';

   categoriesList.forEach(category => {
      template +=
      `<div class="bg-brown-hover px-3 py-2">
         <h5>${category.strCategory}</h5>
      </div>
      `;
   });
   
   return template;
}


export async function listCategories() { 
   
   if (categoriesContainer !== null) {
      
      const promise = await fetch(urlCategories);
      const categories = await promise.json();

      console.log(categories.meals);
      
      categoriesContainer.innerHTML = createCategory(categories);
   }
}