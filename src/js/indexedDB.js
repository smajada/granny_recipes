export function openIndexedDB() {
	const db = indexedDB.open("recipes", 1);

	db.onupgradeneeded = (event) => {
		const db = event.target.result;
		const objectStore = db.createObjectStore("recipes", { keyPath: "id" });
	};

	return db;
}

export function addRecipeToIndexedDB(recipe) {
	const db = openIndexedDB();

	db.onsuccess = (event) => {
		const db = event.target.result;
		const transaction = db.transaction("recipes", "readwrite");
		const objectStore = transaction.objectStore("recipes");

		objectStore.add(recipe);
	};
}
