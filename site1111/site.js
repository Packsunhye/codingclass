$(function () {
  //header menu--------------------------------------------------------
  $("div.header__menu > ul li.one a").mouseenter(function () {
    $("ul.li-menu").slideDown(800);
  });

  $("div.header__menu > ul li.one a").mouseleave(function () {
    $("ul.li-menu").stop().slideUp(500);
  });

  //slide---------------------------------------------------------------
  setInterval(function () {
    $(".slider__inner").animate({ "margin-top": "-300" }, function () {
      $(".slide:first").appendTo(".slider__inner");
      $(".slider__inner").css({ "margin-top": "0" });
    });
  }, 3000);

  //tab-----------------------------------------------------------------
  $("div.menu li").click(function () {
    var idx = $(this).index();

    $(".tabItem >*").hide().removeClass("active");
    $(".tabItem >*").eq(idx).show().addClass("active");

    $("div.menu li").removeClass("active");
    $(this).addClass("active");
  });

  //   //popUpBox---------------------------------------------------------
  //   $(".notice li:nth-child(1)").click(function () {
  //     $(".popUpBox").show();
  //   });

  //   $(".popUpBox button").click(function () {
  //     $(".popUpBox").hide();
  //   });
});
