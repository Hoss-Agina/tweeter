$(document).ready(function() {
  
  const $form = $('.form');

  $form.on('submit', function(event) {
    event.preventDefault();
    const data = $(this).serialize();

    //Removing substring 'text=' from the data string to check its actual data that user entered
    let newData = data.substring(5);
    // Condition to check if user did not enter characters, if yes return alert message
    if (!newData) {
      return alert("You can not submit if form is empty");
    }

    //Condition to check if user exceeded 140 characters by first decoding URI then checking length and sending alert relevant msg
    let decodedText = decodeURIComponent(newData);
    if (decodedText.length > 140) {
      return alert("You can not tweet more than 140 characters. Please reduce message length.")
    }
    $.post('/tweets', data, (response) => {
      loadtweets();
    })
  })

  const loadtweets = function() {
    $.get("/tweets", function(data) {
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
      // takes return value and appends it to the tweets container
      $('#tweets-container').prepend($tweet);
    }
  }


});