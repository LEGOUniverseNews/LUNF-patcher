/* jslint strict: true, indent: 2 */
/*
 * LEGO Universe News! Patcher
 *
 * Created 2013-2014 Triangle717 & rioforce
 * <http://Triangle717.WordPress.com/>
 * <http://rioforce.WordPress.com/>
 *
 * Licensed under The MIT License
 * <http://opensource.org/licenses/MIT>
*/

$(document).ready(function() {
  "use strict";

  // **** ADD SINGLE VIDEO URL HERE ****
  // Gets a random YouTube video from a specified playlist within parameters.
  // Assign value for a specific video ID.
  // Otherwise, leave defined as `null` (do not enclose in quotes).
  var ytVideoID = null,

    // Root YouTube domain and player parameters. Full list and definitions at
    // https://developers.google.com/youtube/player_parameters#Parameters
    ytDomain = "http://www.youtube.com/embed/",
    ytVideoParams = "?html5=1&rel=0&autohide=1&modestbranding=1&fs=1&playsinline=0",

    // **** ADD PLAYLIST URL HERE ****
    // YouTube playlist id, i.e. the "list" parameter in regular YouTube queries.
    playlistID = "PLRNbTEZ7dhL2zevm9nuPeLBlBEjr1fyzv",
    apiBaseUrl = "https://gdata.youtube.com/feeds/api/playlists/",

    // Higher numbers will lead to bigger requests, but more varied videos.
    // Needs to be under 50 to comply with YouTube Data API limitations.
    videoRequestCount = 15,

    randomVideoIndex = Math.floor((Math.random() * videoRequestCount)),
    queryString = "?v=2&alt=jsonc&max-results=" + videoRequestCount;

  // This is the string we are sending to the YouTube Data API
  var apiString = apiBaseUrl + playlistID + queryString;

  var video = null,
      $videoDiv = $("#video-div");

  // If the video ID is null or undefined, we use a playlis and select a video at random
  if (!ytVideoID) {
    console.log("Fetching YouTube data from: " + apiString);

    $.getJSON(apiString, function(data) {
      // Get a random video
      video = data.data.items[randomVideoIndex].video;

      // Assign the YouTube embed code after we select a video
      $videoDiv.html('<iframe id="yt-video" allowfullscreen></iframe>');
      console.log("Current video is " + ytDomain + video.id + ytVideoParams);

      // Setting the source using jQuery does not work for some reason
      document.querySelector("#yt-video").src = ytDomain + video.id + ytVideoParams;
    });

  // Use a specific ID instead of selecting one from a playlist instead
  } else if (ytVideoID) {

    // Stop the error image from being triggered
    video = "Error buster!";

    $videoDiv.html('<iframe id="yt-video" allowfullscreen></iframe>');
    console.log("Fetching YouTube video from: " + ytDomain + ytVideoID + ytVideoParams);

    // Setting the source using jQuery does not work for some reason
    document.querySelector("#yt-video").src = ytDomain + ytVideoID + ytVideoParams;
  }

  // Neither the playlist nor the video loaded
  if (video === null) {
    // Display an error message instead of the YouTube iframe
    $videoDiv.html('<img id="video-error" alt="Video error" src="img/video-error.png">');
  }

  $(function() {
    // Activate perfect-scrollbar
    $("#news-feed").perfectScrollbar({
      wheelSpeed: 1,
      suppressScrollX: true
    });

    // Update the scrollbar so it does not change sizes on us
    // TODO Why won't this work?
    $("#news-feed").perfectScrollbar("update");
  });
});
