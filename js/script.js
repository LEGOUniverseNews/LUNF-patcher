/*
    LEGO Universe News! Patcher

    Created 2013-2014 Triangle717 & rioforce
    <http://Triangle717.WordPress.com/>
    <http://rioforce.WordPress.com/>

    Licensed under The MIT License
    <http://opensource.org/licenses/MIT>
*/

$(document).ready(function() {
    /* YouTube embed player of current LEGO-related video
    preferably from the LEGO channel (http://www.youtube.com/user/LEGO
    */

    /* FUTURE When updating the YouTube video, always get the code directly after
    "watch?v=". For example, if you wanted to embed "http://www.youtube.com/watch?v=g8-4wXkT60c",
    you would take "g8-4wXkT60c" and paste it between the double quotess.
    Thus the new value of "ytVideo" would be "g8-4wXkT60c".
    */
    var ytVideo = "n71HJwNS_so";

    /* YouTube domain and player parameters. Full list and definitions at
    https://developers.google.com/youtube/player_parameters#Parameters */
    var ytDomain = "http://www.youtube.com/embed/";
    var ytVideoParams = "?html5=1&rel=0&autohide=1&modestbranding=1";

    // Give the iframe an src attribute of the new video
    document.getElementById("yt-video").src = ytDomain + ytVideo + ytVideoParams;

    // Adjust the CSS to align the feed
    $("#news-feed-content").css("right", "0.938em");

    // RSS feed of posts on LUN
    $("#news-feed-content").FeedEk({
        FeedUrl: "http://legouniversenews.wordpress.com/feed/",
        MaxCount: 5,
        ShowDesc: true,
        ShowPubDate: false,
        DescCharacterLimit: 155,
        TitleLinkTarget: "_blank"
    });
    
    var $newsFeed = $("#news-feed");
    // Activate perfect-scrollbar
    $newsFeed.perfectScrollbar({
        wheelSpeed: 30,
        suppressScrollX: true,
        wheelPropagation: true
    });
    // Always scroll to the top of the feed on page load
    $newsFeed.scrollTop(0);
    $$newsFeed.perfectScrollbar('update');
});
