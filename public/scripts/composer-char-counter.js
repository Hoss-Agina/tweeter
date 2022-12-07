$(document).ready(function() {
  $('#tweet-text').on('input', function(event) {
    let counter = $(this).parent().find('output');
    currCount = Number(counter.val());
    charInput = event.originalEvent.data;
    //Condition to check if user enters 'backspace' and if yes, it adds to counter count +1
    if (charInput === null) {
      currCount++;
    } 
    //Subtracts caracter count by 1 if it key enterred was not a 'backspace/delete' key
    if (charInput !== null) {
      currCount--;
    }
    //Conditional to check if counter is a negative number to display red font color
    if (currCount < 0) {
      counter.addClass("changeCounterColor");
    }

    //Conditional to check if counter is a positive number to display default font color
    if (currCount > 0) {
      counter.removeClass("changeCounterColor");
    }

    //Updates character count for user
    counter.text(currCount);
  
  })
});