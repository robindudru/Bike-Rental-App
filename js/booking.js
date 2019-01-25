class Booking {
	constructor(){
		const _this = this;
		$('form').on('submit', (e) => {
			e.preventDefault();
			_this.submit();
		});
	}

	submit(){
		if (stationInfos.avail_bikes < 1) { alert('Il n\'y a pas de vélo disponible à cette station'); }
		else if (!signaturePad.hasSigned) { alert('Merci de signer le champ sous votre nom'); }
		else {
			stationInfos.avail_bikes--;
			stationInfos.update();
			sessionStorage.setItem('station', stationInfos.name);
			this.surname = $('#surname').val();
			this.name = $('#name').val();
			localStorage.setItem('surname', this.surname);
			localStorage.setItem('name', this.name);
		}
		timer.init();
		$('#reservation-message').html(`
			${this.surname.toUpperCase()} ${this.name.toUpperCase()}, VOUS AVEZ UN VÉLO RÉSERVÉ À LA STATION ${stationInfos.name} PENDANT 
			<span id="minutes">${timer.minutes}</span>mn<span id="seconds">${timer.seconds}</span>s`
		);
	}
}