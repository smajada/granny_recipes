let map, infoWindow, customMarker, accuracyCircle;

/**
 * Initializes the map and displays the user's current location.
 * @function initMap
 */
export function initMap() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				const pos = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};

				// Create a map centered at the user's current location
				map = new google.maps.Map(document.getElementById("map"), {
					center: pos,
					zoom: 15,
				});

				// Create a circle to represent the position's accuracy
				accuracyCircle = new google.maps.Circle({
					map: map,
					fillColor: "#a6631b",
					fillOpacity: 0.3,
					strokeColor: "#a6631b",
					strokeOpacity: 0.8,
					strokeWeight: 2,
					center: pos,
					radius: position.coords.accuracy,
				});

				// Create a marker to represent the user's current location
				if (!customMarker) {
					customMarker = new google.maps.Marker({
						position: pos,
						map: map,
						title: "This is you, granny!",
					});
				} else {
					customMarker.setPosition(pos);
					accuracyCircle.setCenter(pos);
					accuracyCircle.setRadius(position.coords.accuracy);
				}

				// Configure the info window
				infoWindow = new google.maps.InfoWindow({
					content: "Here's our granny!",
				});

				infoWindow.open(map, customMarker);

				map.setCenter(pos);
			},
			() => {
				handleLocationError(true, infoWindow, map.getCenter());
			}
		);
	} else {
		handleLocationError(false, infoWindow, map.getCenter());
	}
}

/**
 * Handles location errors and updates the info window accordingly.
 * @param {boolean} browserHasGeolocation - Indicates if the browser has geolocation support.
 * @param {google.maps.InfoWindow} infoWindow - The info window to update.
 * @param {google.maps.LatLng} pos - The position to set for the info window.
 */
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
	infoWindow.setPosition(pos);
	infoWindow.setContent(
		browserHasGeolocation
			? "Error: The Geolocation service failed."
			: "Error: Your browser doesn't support geolocation."
	);
	infoWindow.open(map);
}

window.initMap = initMap;
