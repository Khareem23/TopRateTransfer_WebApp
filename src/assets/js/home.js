$(".slide").backstretch(
  [
    "./assets/img/asset_2.png",
    "./assets/img/asset_3.png",
    "./assets/img/asset_1.png",
    "./assets/img/asset_4.png",
  ],
  {
    duration: 10000,
    fade: 1000,
  }
);

$(".items").slick({
  dots: true,
  infinite: true,
  speed: 800,
  autoplay: true,
  autoplaySpeed: 2000,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
});
