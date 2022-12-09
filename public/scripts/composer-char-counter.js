$(document).ready(function() {
  $('#tweet-text').on('input', function(event) {
    //Grabbing value of 140 from HTML to display for user (To be updated by the latter code below)
    let counter = $(this).parent().find('output');
    //Calculating number of characters remaining (for user display)
    let charsInText = $(this).val().length
    let currCount = 140 - charsInText;
    //Condition to check if counter is a negative number to display red font color
    if (currCount < 0) {
      counter.addClass("changeCounterColor");
    }
    //Condition to check if counter is a positive number to display default font color
    if (currCount >= 0) {
      counter.removeClass("changeCounterColor");
    }
    //Updates character count for user on Display
    counter.text(currCount);
  })
});