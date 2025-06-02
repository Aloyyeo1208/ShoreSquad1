// This file is intentionally left blank.
// Map functionality for ShoreSquad
class MapService {
    constructor() {
        this.map = null;
        this.marker = null;
    }

    initializeMap(lat, lon) {
        // Initialize Google Map
        this.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat, lng: lon },
            zoom: 15,
        });

        // Add a marker for the next cleanup location
        this.marker = new google.maps.Marker({
            position: { lat, lng: lon },
            map: this.map,
            title: 'Next Cleanup',
        });
    }
}

// Initialize map service
const mapService = new MapService();

document.addEventListener('DOMContentLoaded', () => {
    // Default coordinates for Pasir Ris
    const lat = 1.381497;
    const lon = 103.955574;

    // Check if the map container exists before initializing
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        mapService.initializeMap(lat, lon);
    }
});