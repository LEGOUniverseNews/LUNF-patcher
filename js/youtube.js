/*global YT */


function _generateVideoUrl() {
  "use strict";
  var url = "",
      api = "//www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=",
      parameters  = "?html5=1&rel=0&autohide=1&modestbranding=1&fs=1&playsinline=0",
      playlistApi = "&playlistId=";

  var video       = null,
      playlist    = "PLRNbTEZ7dhL2zevm9nuPeLBlBEjr1fyzv",
      numOfVideos = 15;

  console.log(api + numOfVideos.toString() + playlistApi + playlist);


  // https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=15&playlistId=PLHdffdpNGTIJNCBmhP8XyqKCjnSgLkGLT

  return "Pu-HD8RNYjI" + parameters;
}


function onYouTubePlayerAPIReady() {
  "use strict";
  new YT.Player("yt-video", {
    height: "270",
    width: "355",
    videoId: _generateVideoUrl()
  });
}
