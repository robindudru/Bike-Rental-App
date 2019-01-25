class Station {
	constructor(){
		this.name = null;
		this.address = null;
		this.status = null;
		this.stands = null;
		this.avail_stands = null;
		this.available = null;
		$.getJSON('https://api.jcdecaux.com/vls/v1/stations?contract=Rouen&apiKey=e034af446fba8014bb1eecadd35b88910fc35695', (stationsList) => {
			stationsList.forEach((data) => { stationsMap.initMarker(data.position, data.name, data); });
			stationsMap.cluster();
		});
	}

	clicked(data) {
		if (this.name === null) {
			$('#no-station-text').fadeOut('fast', () => {
				$('#no-station').css('width', '0', 'right', '100%');	
			});
		}
		this.name = data.name.replace(/^[^A-Za-z]+/, '');
		this.address = data.address.toUpperCase();
		this.status = data.status;
		this.stands = data.bike_stands;
		this.avail_stands = data.available_bike_stands;
		this.avail_bikes = data.available_bikes;
	}

	update() {
		if (this.status === 'OPEN') {
			this.status = 'OUVERT';
		}
		else  if(this.status === 'CLOSED'){
			this.status = 'FERMÉ';
		}
		$('#station-title').text(this.name);
		$('#station-status').text('- ' + this.status);
		$('#station-address').text(this.address);
		$('#avail-stands').text(this.avail_stands);
		$('#avail-bikes').text(this.avail_bikes);
	}
}