// Import our custom CSS
import "../scss/styles.scss";
// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";


// Random recipes
import { getByRandom } from "./byRandom";
const showMoreBtn = document.getElementById("showMore-btn");

(getByRandom)();

showMoreBtn.addEventListener('click', () => getByRandom());

// Recipe by 


