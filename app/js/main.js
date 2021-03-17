$(function () { 

    let mixer = mixitup('.products__box');

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

 });