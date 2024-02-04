import { addRecipeToIndexedDB } from "./indexedDB";

const favoriteBtn = document.querySelector(".bi-heart-fill");

favoriteBtn.addEventListener("click", () => {
	const recipe = {
		id: 1,
		title: "Test",
		image: "https://via.placeholder.com/150",
	};

	addRecipeToIndexedDB(recipe);
});
