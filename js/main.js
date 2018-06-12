"use strict";



// Variables
// ===================

var $html = $('html'),
    $document = $(document),
    $window = $(window),
    i = 0;



// Scripts initialize
// ===================

document.write('<script async defer src="//maps.googleapis.com/maps/api/js?key=AIzaSyAYjhWq7DvCwCiRKotPu9_IXQxupSQbhuo" type="text/javascript"></script>');

$(window).on('load', function () {

  // =======
  // Preloader
  // =======

  var $preloader = $('#page-preloader'),
      $spinner   = $preloader.find('.spinner');

  $spinner.fadeOut();
  $preloader.delay(1000).fadeOut('slow');
  
});


$document.ready(function () {

  function detectElement(dom) {
    return $window.height() + $window.scrollTop() >= dom.offset().top && $window.scrollTop() <= dom.outerHeight() + dom.offset().top;
  }

  // ==========
  // AJAX form
  // ==========
  var ajaxForm = $('.js-form');
  var jsForm = $('.contact-form');
  var resultPanel = $("body").append("<div class='js-result'></div>").find(".js-result");

  if (jsForm.length) {

    jsForm.each(function(){
      var $form = $(this);

      $form.ajaxForm({
        success: function(json) {
          var jsJSON = JSON.parse(json);
          resultPanel.text(jsJSON.message);

          if (jsJSON.valid) {

            resultPanel[0].classList.add("success");

            setTimeout(function () {
              resultPanel[0].classList.remove("success");
              $form.clearForm();
            }, 3000);

          } else {

            resultPanel[0].classList.add("error");

            setTimeout(function () {
              resultPanel[0].classList.remove("error");
            }, 4500);
          }
        }
      });

    });
  }


  // ==========
  // Magnific Popup
  // ==========
  var lightbox = $('[data-lightbox]').not('[data-lightbox="gallery"] [data-lightbox]');
  var lightboxGallery = $('[data-lightbox^="gallery"]');
  var popupMap = $('.popup-gmaps');

  if (popupMap.length) {
    $('.popup-gmaps').magnificPopup({
      disableOn: 700,
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,

      fixedContentPos: false
    });
  }

  if (lightbox.length) {
    lightbox.each(function(){
      var item = $(this);
      item.magnificPopup({
        type: item.data("lightbox")
      });
    });
  }
  if (lightboxGallery.length) {
    lightboxGallery.each(function(){
      $(this).magnificPopup({
        delegate: '[data-lightbox]',
        type: "image",
        mainClass: 'mfp-with-zoom mfp-img-mobile',
        gallery: {
          enabled: true
        },
        zoom: {
          enabled: true,
          duration: 300, // don't foget to change the duration also in CSS
          opener: function(element) {
            return element.find('img');
          }
        }
      });
    });
  }

  /* Magnific Popup modal window */
  $('.popup-with-zoom-anim').magnificPopup({
    type: 'inline',

    fixedContentPos: false,
    fixedBgPos: true,

    overflowY: 'auto',

    closeBtnInside: true,
    preloader: false,

    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in'
  });

  $('.popup-with-move-anim').magnificPopup({
    type: 'inline',

    fixedContentPos: false,
    fixedBgPos: true,

    overflowY: 'auto',

    closeBtnInside: true,
    preloader: false,

    midClick: true,
    removalDelay: 300,
    mainClass: 'my-mfp-slide-bottom'
  });


  // =======
  // Popover
  // =======
  var popOver = $('[data-toggle="popover"]');

  if (popOver.length) {
    popOver.popover({
      placement: 'auto',
      trigger: 'hover focus'
    });
  }


  
  // ==========
  // Scrolling and Toggling 
  // ==========
  var Menu = $("#menu");
  var HomeLink = $(".main-nav li:nth-child(1)");
  var Section = $(".section");

  /*Side bar toggling*/
  $('.nav-toggle').on("click", function(e){
    e.preventDefault();
    $(this).toggleClass("active");
    Menu.toggleClass("open");
    $("body").toggleClass("overflow-hid");
    $("#fullpage").toggleClass("content-overlay");
  });
  $('.main-nav li').on("click", function(){
    Menu.removeClass("open");
    $('.nav-toggle').removeClass("active");
    $("body").removeClass("overflow-hid");
    $("#fullpage").removeClass("content-overlay");
  });
  $("#fullpage").on("click", function(){
    if(Menu.hasClass("open")){
      Menu.removeClass("open");
      $('.nav-toggle').removeClass("active");
      $("#fullpage").removeClass("content-overlay");
      $("body").removeClass("overflow-hid");
    }
  });

  /*Inner section scroll*/
  var getWindow = $(window);

  function getWidth() {
    var windowSize = getWindow.width();
    if (windowSize > 1199) {
      Section.addClass("inner-scroll");
    }
    if (windowSize > 1799) {
      Section.removeClass("inner-scroll");
    }
    if (windowSize < 1200) {
      Section.removeClass("inner-scroll");
    }
   
    if(windowSize < 992){
      $(".fp-scrollable").addClass("outer-scroll");
      $(".fp-scrollable").removeClass("fp-scrollable");
      $(".fp-scroller").addClass("in-scroll");
      $(".fp-scroller").removeClass("fp-scroller");
      $(".iScrollVerticalScrollbar").addClass("hide");
    }
  }
  getWidth();
  $(window).resize(getWidth);
  

  /*Toggling Functions*/
  function defaultState(){
    $(".main-nav").addClass("main-nav-default");
    $(".nav-inside").addClass("active-it");
    $(".info-header-default").removeClass("active-info");
    $(".info-header-content").addClass("active-info");
  }

  function homeState(){
    $(".main-nav").removeClass("main-nav-default");
    $(".nav-inside").removeClass("active-it");
    $(".info-header-content").removeClass("active-info");
    $(".info-header-default").addClass("active-info");
  }

  function handler(){
    if(HomeLink.hasClass("active")){
      homeState();
    } else {
      defaultState();
    }
  }

  var delay = (function(){
    var timer = 0;
    return function(callback, ms){
      clearTimeout (timer);
      timer = setTimeout(callback, ms);
    };
  })();

  /* Different Events*/  
  $(window).on("wheel", function(){
    handler();
  });
  $(window).resize(handler);
  $(".main-nav li").click(defaultState);
  HomeLink.click(homeState);
  $("#toTop").click(homeState);
  $(".btn-return").click(homeState);
  $(".btn-main").click(defaultState);

  delay(function(){
    $(window).trigger("resize");
  }, 500);
  
  $(document).keyup(function(e) {
    delay(function(){
      if (e.keyCode === 32) {
        defaultState();
      }
      if (e.keyCode === 40) {
        defaultState();
      }
      if (e.keyCode === 34) {
        defaultState();
      }
      if (e.keyCode === 33 && HomeLink.hasClass("active") ) {
        homeState();
      }
      if (e.keyCode === 38 && HomeLink.hasClass("active") ) {
        homeState();
      }
    }, 100);
  });

  /*Mobile fixed Nav*/
  $(window).on("scroll", function(){
    if($(window).scrollTop()){
      defaultState();
    } else {
      homeState();
    }
  });

  $(window).on("load", function(){
    HomeLink.trigger("click");
  });
  

  // ==========
  // Bootstrap Touchspin 
  // ==========
  $(".quantity").TouchSpin();


  // =======
  // UIToTop
  // =======
  $().UItoTop();
 

  // =======
  // WOW
  // =======
  if ($html.hasClass('desktop')) { new WOW().init(); }


  // =======
  // Full Page
  // =======
  var FullPage = $('#fullpage');

  if(FullPage.length){
    FullPage.fullpage({
      anchors: ['1Page', '2Page', '3Page', '4Page', '5Page', '6Page', '7Page'],
      menu: '#menu',
      scrollingSpeed: 1000,
      responsiveWidth: 1200,
      normalScrollElements: '.inner-scroll',
      scrollOverflow: true,
      scrollOverflowOptions: {
        scrollbars: true,
        mouseWheel: true,
        hideScrollbars: false,
        fadeScrollbars: false,
        disableMouse: true
      }
    });
  }

});

