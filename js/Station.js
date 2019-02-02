class Station {
	constructor(data, id){
		this.id = id;
		this.name = data.name.replace(/^[^A-Za-z]+/, '');
		this.address = data.address.toUpperCase();
		this.status = data.status;
		this.stands = data.stands;
		this.avail_stands = data.available_bike_stands;
		this.available = data.available_bikes;
		this.marker = stationsMap.initMarker(data.position, data.name, this);
	}

	clicked() {
		$('#no-station-text').fadeOut('fast', () => {
			$('#no-station').css('width', '0', 'right', '100%');	
		});
		sessionStorage.setItem('activeStation', this.id);
	}

	update() {
		if (this.status === 'OPEN') {
			this.status = 'OUVERT';
		}
		else if(this.status === 'CLOSED'){
			this.status = 'FERMÉ';
		}
		$('#station-title').text(this.name);
		$('#station-status').text('- ' + this.status);
		$('#station-address').text(this.address);
		$('#avail-stands').text(this.avail_stands);
		$('#avail-bikes').text(this.available);
	}
}