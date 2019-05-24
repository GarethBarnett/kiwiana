
/** Remove loader */
setTimeout(function () {
    'use strict';
    $('.loadingscreen').remove();
}, 4000);


/** Transport Options */
var transportOptions = [{
    Name: 'Motorbike',
    image: 'img/motorbike.png',
    Mainclass: 'item cartype',
    idName: 'option-01',
    SubClass: 'pricetotal mbpricetotal',
    Dayprice: '$109/Day'
},
{
    Name: 'Small Car',
    image: 'img/smallcar.png',
    Mainclass: 'item cartype',
    idName: 'option-02',
    SubClass: 'pricetotal scpricetotal',
    Dayprice: '$129/Day'
},
{
    Name: 'Large Car',
    image: 'img/largecar.png',
    Mainclass: 'item cartype',
    idName: 'option-03',
    SubClass: 'pricetotal lcpricetotal',
    Dayprice: '$144/Day'
},
{
    Name: 'Motor Home',
    image: 'img/motorhome.png',
    Mainclass: 'item cartype',
    idName: 'option-04',
    SubClass: 'pricetotal mhpricetotal',
    Dayprice: '$200/Day'
}];



/** Create content divs for slider */
function createSlide(value, price) {
    /** Create Image */
    'use strict';
    var img = document.createElement('img');
    img.className = 'items';
    img.src = transportOptions[value].image;
    img.alt = '$' + price;


    /** Create Div */
    var div1 = document.createElement('div');
    div1.className = transportOptions[value].SubClass;

    /** Create Div */
    var div2 = document.createElement('div');
    div2.className = 'dayprice';
    div2.innerHTML = transportOptions[value].Dayprice;

    /** Create Div */
    var div3 = document.createElement('div');
    div3.className = 'vehicle';
    div3.innerHTML = transportOptions[value].Name;

    /** Create Div */
    var divContainer = document.createElement('div');
    divContainer.id = transportOptions[value].idName;
    divContainer.className = transportOptions[value].Mainclass;
    divContainer.value = transportOptions[value].Name;

    /** Where divs is getting placed */
    divContainer.append(div1);
    divContainer.append(div2);
    divContainer.append(div3);
    divContainer.append(img);

    /** Create Main Div */
    var divMain = document.createElement('div');

    /** Where Its going */
    divMain.append(divContainer);
    divMain.className = 'swiper-slide';
    $('.swiper-wrapper').append(divMain);
}



/** Initialising fullpage.js */
$('#fullpage').fullpage({
    sectionsColor: ['#FF69B4', '#8a9b9c', '#f05a28', '#fec401'],
    navigation: true,
    slidesNavigation: true,
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    anchors: ['firstPage', 'secondPage', '3rdPage', '4thPage', 'lastPage'],
    animateAnchor: true,
    lazyLoading: true,
    fitToSection: true,
    scrollBar: true
});


/** How to disable scrolling */
$.fn.fullpage.setMouseWheelScrolling(false);
$.fn.fullpage.setAllowScrolling(false);



/** Updating background image end */
$("#pickup").on('change', function () {
    'use strict';
    $('.roadend').attr("src", $(this).find(":selected").attr("data-src"));
});



/** Fuel Cal */
var mbFuel = (3.7 * 2.3) / 100;
var scFuel = (8.5 * 2.3) / 100;
var lcFuel = (9.7 * 2.3) / 100;


/** Diesel */
var mhFuelonly = (17 * 1.3) / 100;
/** Road User Charges */
var ruc = 0.068; 
/** Fuel Cost + Road User Charges */
var mhFuel = mhFuelonly + ruc;
var fuelCost;

/* Vehicle Daily Costs */
var mbPrice = 109;
var scPrice = 129;
var lcPrice = 144;
var mhPrice = 200;


/** Submit Button */
var dateButton = document.getElementById('button1');
var locationButton = document.getElementById('button0');
var peopleButton = document.getElementById('button');



/** Pick up Drop off locations */
locationButton.addEventListener('click', function() {


    var pickupOptions = document.getElementById("pickup");
    var pickupOptions2 = document.getElementById("dropoff");
    var selectedPickup = pickupOptions.options[pickupOptions.selectedIndex].value;
    var selectedDropOff = pickupOptions2.options[pickupOptions2.selectedIndex].value;

    /** Validate */
    if (selectedPickup == 0 || selectedDropOff == 0) {
        $('.locationoutput').removeClass('hide');
        $('.locationoutput').html("Please Select Both Locations");
    } else {
        $('.locationoutput').addClass('hide');
        $('.van').removeClass('hide');
        $('.van').addClass('fadeInLeftBig');
        setTimeout(function () {
            $('.vanwheel1').removeClass('loading');
            $('.vanwheel2').removeClass('loading');
            $('.van').removeClass('fadeInLeftBig');
            $('#menu').removeClass('hide');
        }, 4300);


        document.location = '#firstPage/1';
    }

}); 


var people1;


$('#date1, #date2').dateDropper();


var days;

/** Pick up Drop off Dates */
dateButton.addEventListener('click', function() {


    $('.opps').addClass('hide');

    var pickUpDate = $('#date1').val();
    var dropOffDate = $('#date2').val();
    var datePickUp = new Date(pickUpDate);
    var dateDropOff = new Date(dropOffDate);
    var singleDay = 24 * 60 * 60 * 1000;

    days = ((dateDropOff - datePickUp) / singleDay);
    $('.dateoutput').text(' ');
    /** Validate */
    if (pickUpDate == 0 || dropOffDate == 0) {
        $('.dateoutput').html("Please Select both dates");
    } else if (days > 15){
        $('.dateoutput').html("Days Exceed 15 day Maximum");
    } else if (days <= 0){
        $('.dateoutput').html("Minimum of 1 day required");
    }
    else{
        $('#people option').prop('selected', function() {
            return this.defaultSelected;

        });

        $('.dateoutput').text(' ');
        $('#peoplecount').addClass('hide');
        $('.van').addClass('vandr');
        $('.vanwheel1').addClass('loading');
        $('.vanwheel2').addClass('loading');

        /** Move to next page */
        setTimeout(function () {
            document.location = '#firstPage/2';
        }, 1000);


        /** remove classes and add for next page */
        setTimeout(function () {
            window.location.href = "#firstPage/3";
            $('.vanwheel1').removeClass('loading');
            $('.vanwheel2').removeClass('loading');
            $('.van').removeClass('vandr');
            $('.s1s4van img').addClass('pullin');
        }, 3300); 

        setTimeout(function () {
            $('.s1s4van img').removeClass('pullin');
        }, 1000); 
    }

});



/** Updating selected number of people on screen */
$("#people").on('change', function () {
    'use strict';
    $('.peopleoutput').addClass('hide');
    $('#peoplecount').removeClass('hide');
    $('#peoplecount').attr("src", $(this).find(":selected").attr("data-src"));
});



/** Number of People */
peopleButton.addEventListener('click', function() {
    people = document.getElementById('people').value;
    people = Number(people);
    /** Validate */
    if (people < 1) {
        $('.peopleoutput').removeClass('hide');
        $('.peopleoutput').html("Please Select People");
    } else {
        $('.peopleoutput').addClass('hide');
        document.location = '#secondPage';
    }

});



/** Display Transport Options on click */
peopleButton.addEventListener('click', function() {
    people1 = document.getElementById('people').value;
    $('.sorry').addClass('hide');
    $('.opps').addClass('hide');
    $('.oppsboth').addClass('hide');

    /** Empty the slider when clicked */
    $('.swiper-wrapper').empty();


    /** Update for booking review */
    document.getElementsByClassName("daystotal")[0].innerHTML = days;
    $('.daystotal').text = days;

    var people = parseInt(people1, 10);

    /** Validate */
    if(!people && !days){
        $('.oppsboth').removeClass('hide');
        document.location = '#firstPage/3';
    }else if(!people){
        $('.peopleoutput').removeClass('hide');
        $('.peopleoutput').html("Please Select People");
        document.location = '#firstPage/3';
    }else if(!days){
        $('.opps').removeClass('hide');
        document.location = '#firstPage/3';
    }else{
        /** Logic */
        var flag = true;
        if (people == 1 && days >= 1 && days <= 5) {
            var mbPriceTotal = mbPrice * days;
            createSlide(0, mbPriceTotal);
            $('.mbpricetotal').prepend('$' + mbPriceTotal + ' for ' + days + ' days' + '<br><span>Includes Insurance</span></br>');
            $('.peopleoutput').addClass('hide');
            document.location = '#secondPage';
            flag = false;
        }

        if (people >= 1 && people <= 2 && days >= 1 && days <= 10) {
            var scPriceTotal = scPrice * days;
            createSlide(1, scPriceTotal);
            $('.scpricetotal').prepend('$' + scPriceTotal + ' for ' + days + ' days' + '<br><span>Includes Insurance</span></br>');
            $('.peopleoutput').addClass('hide');
            document.location = '#secondPage';
            flag=false;
        }

        if (people >= 1 && people <= 5 && days >= 3 && days <= 10) {
            var lcPriceTotal = lcPrice * days;
            createSlide(2, lcPriceTotal);
            $('.lcpricetotal').prepend('$' + lcPriceTotal + ' for ' + days + ' days' + '<br><span>Includes Insurance</span></br>');
            $('.peopleoutput').addClass('hide');
            document.location = '#secondPage';
            flag = false;
        }

        if (people >= 2 && people <= 6 && days >= 2 && days <= 15) {
            var mhPriceTotal = mhPrice * days;
            createSlide(3, mhPriceTotal);
            $('.mhpricetotal').prepend('$' + mhPriceTotal + ' for ' + days + ' days' + '<br><span>Includes Insurance<span></br>');
            $('.peopleoutput').addClass('hide');
            document.location = '#secondPage';
            flag = false;

        }
        if(flag){
            $('.sorry').removeClass('hide');
            document.location = '#firstPage/3';
        }
    }
    /** Swiper Plugin */
    var mySwiper = new Swiper('.swiper-container', {
        /** Optional parameters */
        spaceBetween: 30,
        direction: 'horizontal',
        loop: false,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },

        /** If we need pagination */
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },

        /** Navigation arrows */
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }

    });



    /** What happens when you select an option */

    var optionOne = $('#option-01');
    optionOne.on('click', function () {
        fuelCost = mbFuel;
        /** Update Selected Car on Docket */
        $('.selectedoption').text($(this).attr('value'));
        /** Update Price on Docket */
        $('.totalprice').text($('#option-01 img').attr('alt'));
        /** Update Trailer Image */
        $('#selectedcar').attr("src","img/motorbikeside.png");
        $('#selectedcarfuel').attr("src","img/motorbikeside.png");
        $('#selectedcarpay').attr("src","img/motorbikeside.png");
    });


    var optionTwo = $('#option-02');
    optionTwo.on('click', function () {
        fuelCost = scFuel;
        /** Update Selected Car on Docket */
        $('.selectedoption').text($(this).attr('value'));
        /** Update Price on Docket */
        $('.totalprice').text($('#option-02 img').attr('alt'));
        /** Update Trailer Image */
        $('#selectedcar').attr("src","img/smallcarside.png");
        $('#selectedcarfuel').attr("src","img/smallcarside.png");
        $('#selectedcarpay').attr("src","img/smallcarside.png");
    });


    var optionThree = $('#option-03');
    optionThree.on('click', function () {
        fuelCost = lcFuel;
        /** Update Selected Car on Docket */
        $('.selectedoption').text($(this).attr('value'));
        /** Update Price on Docket */
        $('.totalprice').text($('#option-03 img').attr('alt'));
        /** Update Trailer Image */
        $('#selectedcar').attr("src","img/largecarside.png");
        $('#selectedcarfuel').attr("src","img/largecarside.png");
        $('#selectedcarpay').attr("src","img/largecarside.png");
    });


    var optionFour = $('#option-04');
    optionFour.on('click', function () {
        fuelCost = mhFuel;

        /** Update Selected Car on Docket */
        $('.selectedoption').text($(this).attr('value'));
        /** Update Price on Docket */
        $('.totalprice').text($('#option-04 img').attr('alt'));
        /** Update Trailer Image */
        $('#selectedcar').attr("src","img/motorhomeside.png");
        $('#selectedcarfuel').attr("src","img/motorhomeside.png");
        $('#selectedcarpay').attr("src","img/motorhomeside.png");
    });


    /** On selection animations and page movement */

    $('.item img').click(function () {

        $('.vans5').removeClass('hide');
        $('.vans5').addClass('fadeInLeftBig');
        $('.trailer').removeClass('hide');
        $('.trailer').addClass('fadeInLeftBig');
        $('#selectedcardiv').removeClass('hide');
        $('#selectedcardivpay').removeClass('hide');
        $('#selectedcardiv').addClass('fadeInLeftBig');
        $('#outputfail').addClass('hide');
        $('#outputpass').addClass('hide');
        $('#outputkm').addClass('hide');
        $('.travelcal').trigger('reset');
        $('.plane').removeClass('hide');
        $('.planeimg').addClass('bounceInDown');
        $('.signsky').addClass('hide');

        document.location = '#secondPage/1';
        setTimeout(function () {
            $('.signsky').removeClass('hide');
            $('.signskyimg').addClass('bounceInDown');
            $('.options').addClass('bounceInDown');
        }, 3000);

        document.location = '#secondPage/1';
        setTimeout(function () {
            $('.planeimg').addClass('vandr1');
        }, 3500);

        setTimeout(function () {
            $('.plane').addClass('hide');
        }, 4500);

        setTimeout(function () {
            $('.vans5').removeClass('vandr1');
            $('.trailer').removeClass('vandr1');
            $('#selectedcardiv').removeClass('vandr1');
            $('.trailer').removeClass('fadeInLeftBig');
            $('#selectedcardiv').removeClass('fadeInLeftBig');
            $('.signskyimg').removeClass('bounceInDown');
            $('.options').removeClass('bounceInDown');
            $('.planeimg').removeClass('bounceInDown');
            $('.vans5').removeClass('fadeInLeftBig');
            $('.plane').addClass('hide');
            $('.planeimg').removeClass('vandr1');

        }, 4650);

    });
});


/** Moving to Fuel Cal */
$('.fuelcal').click(function () {
    'use strict';

    setTimeout(function () {
        $('.vans5').addClass('vandr1');
        $('.trailer').addClass('vandr1');
        $('#selectedcardiv').addClass('vandr1');
    }, 500);


    setTimeout(function () {
        document.location = '#secondPage/2';
    }, 2200);



    setTimeout(function () {
        $('.vans5').removeClass('vandr1');
        $('.trailer').removeClass('vandr1');
        $('#selectedcardiv').removeClass('vandr1');
        $('.signsky').addClass('hide');
        $('.plane').addClass('hide');
    }, 6000);

});





/** Calculating Route Distance Button */
$('#calcRoute').on('click', function () {
    'use strict';
    $('#outputpass').removeClass('hide');
    $('#outputkm').removeClass('hide');
    calcRoute(fuelCost);

});



/** Reservation Data */

$("#pickup").on('change', function () {
    'use strict';
    $(".pickuplocation").text($("#pickup option:selected").text());
});


$("#dropoff").on('change', function () {
    'use strict';
    $(".dropofflocation").text($("#dropoff option:selected").text());
});


$("#date1").on('change', function () {
    'use strict';
    $(".pickupdate").text($(this).val());
});


$("#date2").on('change', function () {
    'use strict';
    $(".dropoffdate").text($(this).val());
});


$(".buttonbook").click(function () {
    'use strict';
    $(".reservationbooking").removeClass("hide");
});


$(".buttonbook2").click(function () {
    'use strict';
    $(".reservationbooking").removeClass("hide");
});



/** Modal */
var modal = document.querySelector(".modal");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");

function toggleModal() {
    'use strict';
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    'use strict';
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);


/** Making Payment */
$(".proceed-btn").on("click", function () {
    'use strict';

    /** close modal */
    $('.modal').remove();
    $(".cardswipe").addClass("swipe");

    /** create thanks div */
    var div4 = document.createElement('div');
    div4.innerHTML = 'Booking Reference <br>#01002</br>';

    $('#menu').addClass('hide');

    /**  Where div is getting placed */
    $('.thanks').append(div4);

    /** Move to thank you page */
    setTimeout(function () {
        document.location = '#4thPage';
    }, 1400);

});




/** POI hotspots */

$('.infoclick').bullseye({
    top: 655,
    left: 106,
    heading: "Springfield?",
    content: "did you know",
    orientation: "left"
}).bullseye({
    top: 697,
    left: 536,
    heading: "Ohakune",
    content: "did you know",
    orientation: "left"
}).bullseye({
    top: 723,
    left: 1667,
    heading: "Cape Reinga",
    orientation: "top"
});



