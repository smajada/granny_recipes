let map, infoWindow, customMarker;

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

				map = new google.maps.Map(document.getElementById("map"), {
					center: { lat: pos.lat, lng: pos.lng },
					zoom: 15,
				});

				infoWindow = new google.maps.InfoWindow();

				// Creamos un marcador personalizado beige
				if (!customMarker) {
					customMarker = new google.maps.Marker({
						position: pos,
						map: map,
						title: "This is you, granny!",
						icon: {
							path: google.maps.SymbolPath.CIRCLE,
							scale: 10,
							fillColor: "#A6631B",
							fillOpacity: 1,
							strokeWeight: 0,
						},
					});
				} else {
					customMarker.setPosition(pos);
				}

				infoWindow.setPosition(pos);
				infoWindow.setContent("Here's our granny!");
				infoWindow.open(map);
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
