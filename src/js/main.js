// Import our custom CSS
import "../scss/styles.scss";
// import * as bootstrap from "bootstrap";
import { getByRandom } from "./byRandom";
import { listCategories } from "./byCategory";

// Random recipes
const showMoreBtn = document.getElementById("showMore-btn");

(getByRandom)();

showMoreBtn.addEventListener('click', () => getByRandom());

// Categories
(listCategories)();

