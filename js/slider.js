const Slider = {
	init: function(){
		this.slideId = 0;
		this.nextId = 1;
		this.prevId = 2;
		this.slides = document.querySelectorAll('.slide');
		this.start();
	},

	start: function(){
		this.autoSlide = setInterval(this.next, 5000);
	},

	navListener: function(){
			$('#next').on('click', this.next);
			$(window).keydown(function(e){
				if (e.which == 39) {
					$('#next').click();
				}
			});
			$('#prev').on('click', this.prev);
			$(window).keydown(function(e){
				if (e.which == 37) {
					$('#prev').click();
				}
			});
			$('#pause').on('click', this.stop);
	},

	prev: function(){
		$(howTo.slides[howTo.slideId]).fadeOut('fast', function(){
			$(howTo.slides[howTo.prevId]).fadeIn('fast');
			howTo.prevUpdateIds();
		});
	},

	next: function(){
		$(howTo.slides[howTo.slideId]).fadeOut('fast', function(){
			$(howTo.slides[howTo.nextId]).fadeIn('fast');
			howTo.nextUpdateIds();
		});
	},

	stop: function(){
		clearInterval(howTo.autoSlide);
	},

	nextUpdateIds : function(){
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

const howTo = Object.create(Slider);
howTo.init();
howTo.navListener();
$('#2').hide();
$('#3').hide();
