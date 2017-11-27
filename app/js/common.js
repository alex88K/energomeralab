$(function() {

// Stick elements to top
	
	var scrollTimer = null;
	var primePos = $(".prime-line").offset().top;

	fixedTop(primePos);

	$(window).on('scroll', function() {	
		if (scrollTimer) {
			clearTimeout(scrollTimer);
		}

		scrollTimer = setTimeout(fixedTop(primePos), 50);
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

	var mainHeader = $(".main-header");
	var scrollTop = $(window).scrollTop();
	var wrapper = $(".wrapper");

	if (scrollTop > 0) {
		mainHeader.addClass("fixed");
		wrapper.addClass("fixed");

	} else if (scrollTop < 2) {
		mainHeader.removeClass("fixed");
		wrapper.removeClass("fixed");
	}
}

