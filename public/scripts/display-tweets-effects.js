$(document).ready(function() { 

  $('article').hover(function() {
    $(this).addClass("boxshadow")}, 
    function() {
      $(this).removeClass("boxshadow")})

  $('.footer-icon').hover(function() {
    $(this).addClass("icon-color-change")
    $(this).css('cursor', 'pointer')}, 
    function() {
      $(this).removeClass("icon-color-change")})
});