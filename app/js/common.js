$(function() {

// Stick elements to top
	
	var scrollTimer = null;
	var primePos = $(".prime-line").offset().top;

	fixedTop(primePos);

	$(window).on('scroll', function() {	
		if (scrollTimer) {
			clearTimeout(scrollTimer);
		}

		scrollTimer = setTimeout(fixedTop(primePos), 100);
	});


// Sliders 

	$(".wslider").slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		nextArrow: '<button type="button" class="slick-next"></button>',
		prevArrow: '<button type="button" class="slick-prev"></button>',
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
					infinite: true,
				}
			},
			{
				breakpoint: 600,
				setting: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
		      breakpoint: 480,
		      settings: {
		      	slidesToShow: 1,
		      	slidesToScroll: 1
		      }
		   }
		]
	});


// Modals

	$("[data-modal]").on("click", function(e) {
		var target = $(e.currentTarget);
		var modal = $(this).attr('data-modal');

		if ($(this).hasClass("service-item")) {
			var title = target.children('span').html();

			$(".modal").find(".form-title span").html( title );
			$(".modal").find(".contact-f .submit-btn").attr("value", "Заказать услугу" );
		}

		modalToggle(modal);
	});

	$(".close-btn").on("click", function() {
		$(".modal, body").removeClass("modal-active");
		$(".modal").find(".form-title span").html( "На бесплатный выезд специалиста" );
		$(".modal").find(".contact-f .submit-btn").attr("value", "Отправить" );
	});


// Mask

	if( $('input[name="phone"]').length ) {
		$('input[name="phone"]').mask("+7 (999) 999-9999");
	}
	
// AJAX Form submit

	$(document).on('af_complete', function(event,response) {
		var form_id = '' || response.form.parents('.modal').attr('id');
		var modalSuccess = "modal-success";

		if (response.success) {
			// close modal on Success
			if( form_id ) {
				modalToggle(form_id);
			}

			modalToggle(modalSuccess);

			// close success message after 5 sec
			
			var timer = setTimeout(function() { 
				modalToggle(modalSuccess, true) 
			}, 5000);
		}
	});


// Collapser

	$(".collapse-btn").on("click", function(e) {
		e.preventDefault();

		if ($(this).siblings(".collapse-body").hasClass("show")) {
			$(this).html("Узнать больше");
			$(this).siblings(".collapse-body").removeClass("show");
		} else {
			$(this).html("Скрыть");
			$(this).siblings(".collapse-body").toggleClass("show");
		}
	});

});

function modalToggle(modalWindow, closeOption) {
	var modal = modalWindow || "modal";

	if (closeOption) {
		$("body, ." + modal).removeClass("modal-active");
	} else {
		$("body, ." + modal).toggleClass("modal-active");
	}	
}


// Fixed top elements

function fixedTop(primePosition) {
	scrollTimer = null; 

	var topLine = $(".top-line");
	var primeLine = $(".prime-line");
	var scrollTop = $(window).scrollTop();

	if (scrollTop > primePosition) {
		primeLine.addClass("fixed");
		topLine.addClass("spaced"); 
	} else if (scrollTop < primePosition) {
		primeLine.removeClass("fixed");
		topLine.removeClass("spaced");
	}
}

