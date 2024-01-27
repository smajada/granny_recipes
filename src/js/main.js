// Import our custom CSS
import "../scss/styles.scss";
// Import all of Bootstrap's JS
import * as bootstrap from "bootstrap";


// Random recipe
import { getByRandom } from "./byRandom";
const randomBtn = document.getElementById("random-btn");
randomBtn.addEventListener('click', () => getByRandom());

// Recipe by 


