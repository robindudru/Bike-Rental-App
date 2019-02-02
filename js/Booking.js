class Booking {
	constructor(){
		const _this = this;
		$('form').on('submit', (e) => {
			e.preventDefault();
			_this.submit();
		});
	}

	submit(){
		let currentId = sessionStorage.activeStation;
		let prevId = sessionStorage.stationId;
		let prevStation = stationsMap.stationsList.stationsArray[prevId];
		let station = stationsMap.stationsList.stationsArray[currentId];
		if (station.avail_bikes < 1) { alert('Il n\'y a pas de vélo disponible à cette station'); }
		else if (!signaturePad.hasSigned) { alert('Merci de signer le champ sous votre nom'); }
		else {
			if (prevId) { prevStation.available++; };
			station.available--;
			station.update();
			sessionStorage.setItem('station', station.name);
			sessionStorage.setItem('stationId', station.id);
			this.surname = $('#surname').val();
			this.name = $('#name').val();
			localStorage.setItem('surname', this.surname);
			localStorage.setItem('name', this.name);
		}
		timer.init();
		$('#reservation-message').html(`
			${this.surname.toUpperCase()} ${this.name.toUpperCase()}, VOUS AVEZ UN VÉLO RÉSERVÉ À LA STATION ${station.name} PENDANT 
			<span id="minutes">${timer.minutes}</span>mn<span id="seconds">${timer.seconds}</span>s`
		);
	}
}
