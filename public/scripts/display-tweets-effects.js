$(document).ready(function() { 

  $("body").on('mouseenter','article', function() {
    $(this).addClass("boxshadow")})

  $("body").on('mouseleave',"article", function() {
    $(this).removeClass("boxshadow")})

  $("body").on('mouseenter','.footer-icon', function() {
    $(this).addClass("icon-color-change")
    $(this).css('cursor', 'pointer')})
  
  $("body").on('mouseleave',".footer-icon", function() {
      $(this).removeClass("icon-color-change")})

});