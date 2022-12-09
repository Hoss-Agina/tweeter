$(document).ready(function() {
  
  const $form = $('.form');
  //Listening to form Event and executing accordingly
  $form.on('submit', function(event) {
    event.preventDefault();
    //removing error display message for re-submission in case it appeared before 
    $('#error-display').empty();
    //Converting input from user into URI encoded
    let data = $(this).serialize();

    //Removing substring 'text=' from the data string to check its actual data that user entered
    let newData = data.substring(5);
    // Condition to check if user did not enter characters, if yes return alert message
    if (!newData) {
      console.log(newData);
      const errorMsg = "You can not submit if form is empty.";
      const $error = loaderror(errorMsg);
      $error.appendTo('#error-display').hide().slideDown("slow");
      return;
    }

    //Condition to check if user exceeded 140 characters and sending alert relevant msg
    let decodedText = decodeURIComponent(newData);
    if (decodedText.length > 140) {
      console.log(decodedText);
      const errorMsg = "You can not tweet more than 140 characters. Please reduce message length.";
      let $error = loaderror(errorMsg);
      $error.appendTo('#error-display').hide().slideDown("slow");
      return;
    }
    //Happy path to proceed with loading tweet if submission is not empty or surpasses 140 chars
    $.post('/tweets', data, (response) => {
      loadtweets();
      $("textarea").val(""); //Clears compose text area
    })
    //Reseting the character count value in HTML to 140 after submission.
    $('output').val("140");
  })

  const loadtweets = function() {
    $.get("/tweets", function(data) {
      renderTweets(data);
    })
  }

  loadtweets();

  //Function to create Error message is called if user attempts surpassing 140 characts or does not input any elements 
  const loaderror = function(someText) {
    const $msg = $(`
    <div id="error-msg">
      <i class="fa-solid fa-circle-exclamation"></i>
      <p>${someText}</p>
      <i class="fa-solid fa-circle-exclamation"></i>
    </div>
    `)
    return $msg;
  }

  const createTweetElement = function(tweetData) {
    const $tweet = $(`
      <article class="tweet">
        <header class="tweet-header">
          <div class="icon-and-name">
            <img class="image-face-icon" src=${tweetData.user.avatars}>
            <p class="tweeter-name">${tweetData.user.name}</p>
          </div>
          <div class="tweeter-username">${tweetData.user.handle}</div>
        </header>

        <p class="tweet-msg">${escape(tweetData.content.text)}</p>

        <footer class="tweet-footer">
          <p class="days">${timeago.format(tweetData.created_at)}</p>
          <div class="tweet-icons">
            <i class="footer-icon fa-solid fa-flag"></i>
            <i class="footer-icon fa-sharp fa-solid fa-retweet"></i>
            <i class="footer-icon fa-solid fa-heart"></i>
          </div>
        </footer>

      </article>
    `)
    return $tweet;
  } 


  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    // loops through tweets
    for (tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweets-container').prepend($tweet);
    }
  }

  //Escape function for cross site scripting
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

});