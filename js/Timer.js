class Timer {
	init(){
		this.minutes = 19;
		this.seconds = 59;
		sessionStorage.setItem('minutes', this.minutes);
		sessionStorage.setItem('seconds', this.seconds);
		this.interval = clearInterval(this.interval);
		const _this = this;
		this.interval = setInterval(() => {_this.start()}, 1000);
	}

	start(){
		if (this.seconds > 0) {
			this.seconds--;
			sessionStorage.setItem('seconds', this.seconds);
			$('#seconds').text((this.seconds < 10) ? `0${this.seconds}` : this.seconds);
		}
		else if(this.seconds === 0 && this.minutes > 0 ) {
			this.seconds = 59;
			sessionStorage.setItem('seconds', this.seconds);
			$('#seconds').text(this.seconds);
			this.minutes--;
			sessionStorage.setItem('minutes', this.minutes);
			$('#minutes').text((this.minutes < 10) ? `0${this.minutes}` : this.minutes);
		}
		else if (this.minutes === 0 && this.minutes === 0){
			this.timeOver();
		}
	}

	timeOver(){
		clearInterval(this.interval);
		$('#reservation-message').text('Votre réservation a expiré. Merci de renouveler votre demande.');
		sessionStorage.removeItem('station');
		sessionStorage.removeItem('stationId');
		sessionStorage.removeItem('minutes');
		sessionStorage.removeItem('seconds');
		this.minutes = 19;
		this.seconds = 59;
	}

	resume(){
		const _this = this;
		this.minutes = sessionStorage.getItem('minutes');
		this.seconds = sessionStorage.getItem('seconds');
		this.interval = setInterval(() => {_this.start()}, 1000);
	}
}