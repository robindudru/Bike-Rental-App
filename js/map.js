const Map = {
	init: function(lat, lng, zoom) {
		this.map = new google.maps.Map(document.getElementById('map'), {
				center: {
					lat: lat,
					lng: lng
				},
				zoom: zoom,
		});
		this.markersArray = [];
	},
	initMarker: function(position, title) {
		marker = new google.maps.Marker({
			map: this.map,
			position: position,
			title: title
		});
		this.markersArray.push(marker);
	},
	cluster: function() {
        new MarkerClusterer(this.map, this.markersArray,
        {
            imagePath : 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' 
        });
    }
};

const Station = {
	init: function(){
		this.name = null;
		this.address = null;
		this.status = null;
		this.stands = null;
		this.avail_stands = null;
		this.available = null; 
	},
	clicked: function(data) {
		this.name = data.name;
		this.address = data.address;
		this.status = data.status;
		this.stands = data.bike_stands;
		this.avail_stands = data.available_bike_stands;
		this.avail_bikes = data.available_bikes;
	},
	update: function() {
		document.getElementById('station-infos').innerHTML = this.address;
	}
};

const stationsMap = Object.create(Map);
stationsMap.init(49.437489866065405, 1.096252291204278, 14);

const stationInfos = Object.create(Station);
stationInfos.init();

$.getJSON('https://api.jcdecaux.com/vls/v1/stations?contract=Rouen&apiKey=e034af446fba8014bb1eecadd35b88910fc35695', function(stationsList){
	stationsList.forEach(function(data){
		stationsMap.initMarker(data.position, data.name);
		google.maps.event.addListener(marker, "click", function(){
	        	stationInfos.clicked(data);
	        	stationInfos.update();
	    });
	});
	stationsMap.cluster();
});