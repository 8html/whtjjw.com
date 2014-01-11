$(function() {
  function pos_sub_menu(a) {
    var b = $("#menu_sub_" + $(a).attr("data-id")),
        c = $("#header").width();
    a = $(a).position().left + 250;
    a + b.width() > c && (a = c - 41 - b.width());
    a < $("#menu").position().left + 10 && (a = $("#menu").position().left + 10);
    b.removeClass("hidden").css({
        left: parseInt(a)
    })
  }
  $("#menu .menu_item a").hover(function () {
    $(this).attr("data-id") ? pos_sub_menu(this) : $("[id^=menu_sub_]").addClass("hidden")
  }, function () {
    $("#menu_sub_" + $(this).attr("data-id")).addClass("hidden")
  });
  $(".submenu").hover(function () {
    var a = $("#menu .menu_item a[data-id=" + $(this).attr("id").replace(/^menu_sub_/, "") + "]");
    a.hasClass("menu_item_current") ? a.addClass("alrcurrent") : a.addClass("menu_item_current");
    $(this).removeClass("hidden")
  }, function () {
    var a = $("#menu .menu_item a[data-id=" + $(this).attr("id").replace(/^menu_sub_/, "") + "]");
    a.hasClass("alrcurrent") || a.removeClass("menu_item_current");
    $(this).addClass("hidden")
  });
});
