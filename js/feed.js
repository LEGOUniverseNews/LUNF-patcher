/*
    LEGO Universe News! Forums Patcher

    Created 2013-2014 Triangle717 & rioforce
    <http://Triangle717.WordPress.com/>
    <http://rioforce.WordPress.com/>

    Licensed under The MIT License
    <http://opensource.org/licenses/MIT>
*/

google.load("feeds", "1");

function OnLoad() {
    "use strict";
    // Create a feed control
    var feedControl = new google.feeds.FeedControl();

    // Load the LUN feed
    feedControl.addFeed("http://legouniversenews.wordpress.com/feed/", "LEGO Universe News!");

    // Display the feed
    feedControl.draw(document.getElementById("news-feed"));
}

google.setOnLoadCallback(OnLoad);

//$(document).ready(function() {
//    // Activate scroll bar
//    $("#news-feed").perfectScrollbar({
//        wheelSpeed: 30,
//        suppressScrollX: true,
//        wheelPropagation: true
//    });
//});
