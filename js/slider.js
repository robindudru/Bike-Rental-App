var Slider = function() {
	this.slideId = 0;
	this.nextId = 1;
	this.prevId = 2;
	this.slides = document.querySelectorAll('.slide');
	this.autoSlide = null;
	this.navListener();
	this.start();
}

Slider.prototype = {

	start: function(){
		that = this;
		this.autoSlide = setInterval(function(){that.next()}, 5000);
	},

	navListener: function(){
		that=this;
		$('#next').on('click', function(){that.next()});
		$(window).keydown(function(e){
			if (e.which == 39) {
				$('#next').click();
			}
		});
		$('#prev').on('click', function(){that.prev()});
		$(window).keydown(function(e){
			if (e.which == 37) {
				$('#prev').click();
			}
		});
		$('#pause').on('click', function(){that.stop()});
		$('#play').on('click', function(){that.start()});
	},

	prev: function(){
		that=this;
		this.stop();
		$(this.slides[this.slideId]).fadeOut('fast', function(){
			console.log('fadeoutok');
			$(that.slides[that.prevId]).fadeIn('fast');
			that.prevUpdateIds();
		});
		this.start();
	},

	next: function(){
		that=this;
		this.stop();
		$(this.slides[this.slideId]).fadeOut('fast', function(){
			$(that.slides[that.nextId]).fadeIn('fast');
			that.nextUpdateIds();
		});
		this.start();
	},

	stop: function(){
		this.autoslide = clearInterval(this.autoSlide);
	},

	nextUpdateIds: function(){
		this.nextId++;
		this.slideId++;
		this.prevId++;
		if (this.nextId > 2) {
			this.nextId = 0;
		}
		if (this.slideId > 2) {
			this.slideId = 0;
		}
		if (this.prevId > 2) {
			this.prevId = 0;
		}
	},

	prevUpdateIds: function(){
		this.nextId--;
		this.slideId--;
		this.prevId--;
		if (this.nextId < 0) {
			this.nextId = 2;
		}
		if (this.slideId < 0) {
			this.slideId = 2;
		}
		if (this.prevId < 0) {
			this.prevId = 2;
		}
	}
}


$('#2').hide();
$('#3').hide();

var howTo = new Slider();