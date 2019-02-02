class Bikemap {
	constructor(lat, lng){
		let mapZoom = (window.innerWidth < 850 ) ? 13 : 14;
		this.map = new google.maps.Map($('#map')[0], {
			center: {
				lat: lat,
				lng: lng
			},
			zoom: mapZoom,
		});
		this.markersArray = [];
		this.stationsList = new StationsList();
	}

	initMarker(position, title, station) {
		let marker = new google.maps.Marker({
			map: this.map,
			position: position,
			title: title,
			icon: 'http://www.robindupontdruaux.fr/bike.png'
		});
		marker.addListener("click", () => {
	        		station.clicked();
	        		station.update();
	        		$('html, body').animate({
	        			scrollTop: $('#submit').offset().top
	        		}, 500);
	    });
		this.markersArray.push(marker);
	}

	cluster() {
        new MarkerClusterer(this.map, this.markersArray, {
        	imagePath : 'http://www.robindupontdruaux.fr/',
        });
    }
}