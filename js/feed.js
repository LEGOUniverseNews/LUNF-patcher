/*
    LEGO Universe News! Patcher

    Created 2013-2014 Triangle717 & rioforce
    <http://Triangle717.WordPress.com/>
    <http://rioforce.WordPress.com/>

    Licensed under The MIT License
    <http://opensource.org/licenses/MIT>
*/

$(document).ready(function() {
    $('#news-feed').FeedEk({
        FeedUrl: "http://legouniversenews.wordpress.com/feed/",
        MaxCount: 3,
        ShowDesc: true,
        ShowPubDate: false,
        DescCharacterLimit :155,
        TitleLinkTarget: "_blank"
    });
});
