$(function () { 

    

    $(".rate-star").rateYo({
        rating: 5,
        starWidth:"12px",
        readOnly: true
      });

    $('.trend__box').slick({
        dots:true,
        infinite: true,
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 4
    });

    $(".js-range-slider").ionRangeSlider({
      type: "double",
      grid: false,
      min: 0,
      max: 1000,
      from: 0,
      to: 600,
      prefix: "$"
  });
  
    $('.icon-th-list').on('click',function () { 
      $('.product__item').addClass('list')
      $('.icon-th-list').addClass('active')
      $('.icon-th-large').removeClass('active')
     });

     $('.icon-th-large').on('click',function () { 
      $('.product__item').removeClass('list')
      $('.icon-th-list').removeClass('active')
      $('.icon-th-large').addClass('active')
     });
  
    var mixer = mixitup('.products__box');
 });