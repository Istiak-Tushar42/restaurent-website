// STICKY NAV
$(window).on('scroll', function() {
    if($(window).scrollTop()) {
        $('header').addClass('sticky');
    } else {
        $('header').removeClass('sticky');
    }
});

// ADD CART
$(document).ready(function () {
    $('#cart').simpleCart();
});