class Slider {
	constructor(){
		this.slideId = 0;
		this.nextId = 1;
		this.prevId = 2;
		this.slides = document.querySelectorAll('.slide');
		this.autoSlide = null;
		$('#2, #3, #pause-feedback, #play-feedback').hide();
		$('#slide'+this.slideId).css('backgroundColor', 'rgba(250,250,250,0.9)');
		this.navListener();
		this.start();
	}

	start(){
		let that = this;
		this.autoSlide = setInterval(function(){that.navigate('next')}, 5000);
	}

	navListener() {
		let that = this;
		$('#next').on('click', function(){that.navigate('next')});
		$('#prev').on('click', function(){that.navigate('prev')});
		$('#pause').on('click', function(){
			that.stop();
			$('#pause-feedback').fadeIn(1).fadeOut(1500);
		});
		$('#play').on('click', function(){
			that.start();
			$('#play-feedback').fadeIn(1).fadeOut(1500);
		});
		$(window).keydown(function(e){
			switch (e.key) {
				case 'ArrowLeft':
					that.navigate('prev');
					break;
				case 'ArrowRight':
					that.navigate('next');
			}
		});
	}

	navigate(direction) {
		let that = this;
		this.stop();
		$('#slide'+that.slideId).css('backgroundColor', 'rgba(250,250,250,0.2)');
		$(this.slides[this.slideId]).fadeOut('fast', function(){
			switch (direction) {
				case 'prev':
					$(that.slides[that.prevId]).fadeIn('fast');
					$('#slide'+that.prevId).css('backgroundColor', 'rgba(250,250,250,0.9)');
					that.prevUpdateIds();
					break;
				case 'next':
					$(that.slides[that.nextId]).fadeIn('fast');
					$('#slide'+that.nextId).css('backgroundColor', 'rgba(250,250,250,0.9)');
					that.nextUpdateIds();
			}
		});
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

const howTo = new Slider();