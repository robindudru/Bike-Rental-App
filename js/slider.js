class Slider {
	constructor(){
		this.slideId = 0;
		this.nextId = 1;
		this.prevId = 2;
		this.slides = $('.slide');
		this.autoSlide = null;
		this.isNavigating = false;
		$('#slide2, #slide3, #pause-feedback, #play-feedback').hide();
		$('#slide-progress-bar'+this.slideId).css('backgroundColor', 'rgba(250,250,250,0.9)');
		this.navListener();
		this.start();
	}

	start(){
		const _this = this;
		this.autoSlide = setInterval(() => {_this.navigate('next')}, 5000);
	}

	navListener() {
		const _this = this;
		$('#next').on('click', () => {_this.navigate('next')});
		$('#prev').on('click', () => {_this.navigate('prev')});
		$('#pause').on('click', () => {
			_this.stop();
			$('#pause-feedback').fadeIn(1).fadeOut(1500);
		});
		$('#play').on('click', () => {
			_this.start();
			$('#play-feedback').fadeIn(1).fadeOut(1500);
		});
		$(window).keyup((e) => {
			switch (e.key) {
				case 'ArrowLeft':
					_this.navigate('prev');
					break;
				case 'ArrowRight':
					_this.navigate('next');
			}
		});
	}

	navigate(direction) {
		const _this = this;
		this.stop();
		if (!this.isNavigating) {
			this.isNavigating = true;
			$('#slide-progress-bar'+_this.slideId).css('backgroundColor', 'rgba(250,250,250,0.2)');
			$(this.slides[this.slideId]).fadeOut('fast', () => {
				switch (direction) {
					case 'prev':
						$(_this.slides[_this.prevId]).fadeIn('fast');
						$('#slide-progress-bar'+_this.prevId).css('backgroundColor', 'rgba(250,250,250,0.9)');
						_this.prevUpdateIds();
						_this.isNavigating = false;
						break;
					case 'next':
						$(_this.slides[_this.nextId]).fadeIn('fast');
						$('#slide-progress-bar'+_this.nextId).css('backgroundColor', 'rgba(250,250,250,0.9)');
						_this.nextUpdateIds();
						_this.isNavigating = false;
				}
			});
		}
		this.start();
	}

	stop(){
		this.autoslide = clearInterval(this.autoSlide);
	}

	nextUpdateIds(){
		(this.nextId === 2) ? this.nextId = 0 :	this.nextId++;
		(this.slideId === 2) ? this.slideId = 0 :	this.slideId++;
		(this.prevId === 2) ? this.prevId = 0 :	this.prevId++;
	}

	prevUpdateIds(){
		(this.nextId === 0) ? this.nextId = 2 :	this.nextId--;
		(this.slideId === 0) ? this.slideId = 2 : this.slideId--;
		(this.prevId === 0) ? this.prevId = 2 :	this.prevId--;
	}
}