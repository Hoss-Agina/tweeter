/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {
  
  const $form = $('.form');

  $form.on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();
    $.post('/tweets', data, (response) => {
      console.log(response);
      loadtweets();
    })
  })

  const loadtweets = function() {
    $.get("/tweets", function(data) {
      console.log(data);
      renderTweets(data);
    })
  }

  loadtweets();

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

        <p class="tweet-msg">${tweetData.content.text}</p>

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
      console.log($tweet);
      // takes return value and appends it to the tweets container
      $('#tweets-container').prepend($tweet);
    }
  }


});