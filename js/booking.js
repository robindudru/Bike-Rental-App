const Booking = {
	submit: function(){
		if (stationInfos.avail_bikes < 1) { alert('Il n\'y a pas de vélo disponible à cette station'); }
		else if (!signaturePad.hasSigned) { alert('Merci de signer le champ sous votre nom'); }
		else {
			stationInfos.avail_bikes--;
			stationInfos.update();
			sessionStorage.setItem('station', stationInfos.name);
			this.surname = document.getElementById('surname').value;
			this.name = document.getElementById('name').value;
			if (localStorage.getItem('surname') === null && localStorage.getItem('name') === null) {
				localStorage.setItem('surname', this.surname);
				localStorage.setItem('name', this.name);
			}
			else if (localStorage.getItem('surname') !== this.surname || localStorage.getItem('name') !== this.name) {
				localStorage.removeItem('surname');
				localStorage.removeItem('name');
				localStorage.setItem('surname', this.surname);
				localStorage.setItem('name', this.name);
			}
			timer.init();
			$('#reservation-message').text(this.surname.toUpperCase() + ' ' + this.name.toUpperCase() + ', VOUS AVEZ UN VÉLO RÉSERVÉ À LA STATION ' + stationInfos.name + ' PENDANT ');
			$('#reservation-message').append('<span id="minutes">' + timer.minutes + '</span>mn<span id="seconds">' + timer.seconds + '</span>s');
		}
	}
};

const Timer = {
	init: function(){
		this.minutes = 19;
		this.seconds = 59;
		sessionStorage.setItem('minutes', this.minutes);
		sessionStorage.setItem('seconds', this.seconds);
		this.interval = setInterval("timer.start()", 1000);
	},
	start: function(){
		if (this.seconds > 0) {
			this.seconds--;
			sessionStorage.setItem('seconds', this.seconds);
			if(this.seconds < 10){
				$('#seconds').text('0' + this.seconds);
			}
			else {
				$('#seconds').text(this.seconds);	
			}
		}
		else if(this.seconds === 0 && this.minutes > 0 ) {
			this.seconds = 59;
			sessionStorage.setItem('seconds', this.seconds);
			$('#seconds').text(this.seconds);
			this.minutes--;
			sessionStorage.setItem('minutes', this.minutes);
			if(this.minutes < 10){
				$('#minutes').text('0' + this.minutes);
			}
			else {
				$('#minutes').text(this.minutes);	
			}
		}
		else if (this.minutes === 0 && this.minutes === 0){
			this.timeOver();
		}
	},
	timeOver: function(){
			clearInterval(this.interval);
			$('#reservation-message').text('Votre réservation a expiré. Merci de renouveler votre demande.');
			sessionStorage.removeItem('station');
			sessionStorage.removeItem('minutes');
			sessionStorage.removeItem('seconds');
			this.minutes = 19;
			this.seconds = 59;
	},
	resume: function(){
		this.minutes = sessionStorage.getItem('minutes');
		this.seconds = sessionStorage.getItem('seconds');
		this.interval = setInterval("timer.start()", 1000);
	}
};

if (localStorage.getItem('surname') !== null && localStorage.getItem('name') !== null) {
	document.getElementById('surname').value = localStorage.getItem('surname');
	document.getElementById('name').value = localStorage.getItem('name');
}

const newBooking = Object.create(Booking);
const timer = Object.create(Timer);

if (sessionStorage.getItem('station') !== null) {
	$('#reservation-message').text(localStorage.getItem('surname').toUpperCase() + ' ' + localStorage.getItem('name').toUpperCase() + ', VOUS AVEZ UN VÉLO RÉSERVÉ à LA STATION ' + sessionStorage.getItem('station') + ' PENDANT ');
	$('#reservation-message').append('<span id="minutes">' + sessionStorage.getItem('minutes') + '</span>mn<span id="seconds">' + sessionStorage.getItem('seconds') + '</span>s');
	timer.resume();
}

submitForm = document.querySelector('form');
submitForm.addEventListener('submit', function(e){
	e.preventDefault();
	newBooking.submit();
});