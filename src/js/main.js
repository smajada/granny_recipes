// Import our custom CSS
import "../scss/styles.scss";
// import * as bootstrap from "bootstrap";
import { getByRandom } from "./byRandom";
import { getByCategory, listCategories } from "./byCategory";

// Random recipes
const showMoreBtn = document.getElementById("showMore-btn");

(getByRandom)();

showMoreBtn.addEventListener('click', () => getByRandom());

// Categories
(listCategories)();

// const categoryBtn = document.getElementById('category-btn');

// categoryBtn.addEventListener('click', (event) => {
   
//    console.log(event.target);
// })

