/* jslint strict: true, indent: 2 */
/*
  LEGO Universe News! Patcher

  Created 2013-2014 Triangle717 & rioforce
  <http://Triangle717.WordPress.com/>
  <http://rioforce.WordPress.com/>

  Licensed under The MIT License
  <http://opensource.org/licenses/MIT>
*/

$(document).ready(function() {
  "use strict";
  // Gets a random YouTube video from a specified playlist within parameters. //ADD SINGLE VIDEO URL HERE//
  // Assign value for specific video ID. Otherwise, leave defined as `null` (not enclosed in quotes).
  var ytVideoId = "mqp61m1WTdI";

  // YouTube domain and player parameters. Full list and definitions at
  // https://developers.google.com/youtube/player_parameters#Parameters
  var ytDomain = "http://www.youtube.com/embed/";
  var ytVideoParams = "?html5=1&rel=0&autohide=1&modestbranding=1&fs=1";

  // YouTube playlist id, i.e. the "list" parameter in regular YouTube queries. //ADD PLAYLIST URL HERE//
  var playlistId = "PLVfin74Qx3tWkukr46pCWGeyGd21b8ZjI";
  var apiBaseUrl = "https://gdata.youtube.com/feeds/api/playlists/";

  // Higher numbers will lead to bigger requests, but more varied videos.
  // Needs to be under 50 to comply with YouTube Data API limitations.
  var videoRequestCount = 10;

  var randomVideoIndex = Math.floor((Math.random() * videoRequestCount));
  var queryString = "?v=2&alt=jsonc&max-results=" + videoRequestCount;

  // This is the string we are sending to the YouTube Data API
  var apiString = apiBaseUrl + playlistId + queryString;
  console.log("Fetching YouTube data from: " + apiString);

  var video,
      $videoDiv = $("#video-div"),
      $videoFrame = $("#yt-video");

    // If the video ID is null or undefined, we use a playlist
    // and select a video at random
    if (!ytVideoId) {
        $.getJSON(apiString, function(data) {
            // Get a random video
            video = data.data.items[randomVideoIndex].video;

            // If the video did not load...
            if (!video) {
                // Display an error message instead of the YouTube iframe
                $videoDiv.html('<img id="video-error" alt="Video error" src="img/video-error.png" />');

            // The video did load
            } else {
                // Assign the YouTube embed code after we select a video
                $videoDiv.html('<iframe id="yt-video" allowfullscreen></iframe>');
                console.log("Current video is " + ytDomain + video.id + ytVideoParams);
                document.querySelector("#yt-video").src = ytDomain + video.id + ytVideoParams;
                //$videoFrame.attr("src", ytDomain + video.id + ytVideoParams);
            }
        });

      // Use a specific ID instead of selecting one from a playlist instead
    } else {
        $videoDiv.html('<iframe id="yt-video" allowfullscreen></iframe>');
        document.querySelector("#yt-video").src = ytDomain + ytVideoId + ytVideoParams;
        //$videoFrame.attr("src", ytDomain + ytVideoId + ytVideoParams);
    }

  // RSS feed of posts on LUN
  $("#news-feed-content").FeedEk({
      FeedUrl: "http://legouniversenews.wordpress.com/feed/",
      MaxCount: 5,
      ShowDesc: true,
      ShowPubDate: false,
      DescCharacterLimit: 155,
      TitleLinkTarget: "_blank"
  });

  // Adjust the CSS to align the feed
  $("#news-feed-content").css("right", "0.938em");

  // Activate perfect-scrollbar
  $("#news-feed").perfectScrollbar({
      wheelSpeed: 30,
      suppressScrollX: true
  });
});
