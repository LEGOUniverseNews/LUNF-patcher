(function($){
  "use strict";

  /**
   * @constructor
   * Create a blog post object.
   * @param {String} id Post ID.
   * @param {String} title Post title.
   * @param {String} url Post URL.
   * @param {String} summary Post summary.
   */
  function BlogPost(id, title, url, summary) {
    this.url = url;
    this.title = title;
    this.summary = summary;
    this.selector = ".post-single#" + id;
    this.container = '<div class="post-single" id="' + id + '"></div>';
  }


  /**
   * @constant
   * @type {Number}
   * The number of characters the summary should be limited to.
   */
  BlogPost.prototype.charLimit = 170;


  /**
   * Create a blog post summary.
   */
  BlogPost.prototype.summarize = function() {
    // Strip HTML tags except for whitelisted ones
    var tagsRegEx = new RegExp(/<(?!\/?(?:p|div)).+?>/gi);
    this.summary = this.summary.replace(tagsRegEx, "");

    // Display only the first short bit of the content
    // TODO Do not let leftover HTML tags effect this
    this.summary = this.summary.slice(0, this.charLimit);
    return true;
  };


  // Number of posts depending to display
  var posts    = [],
      postsNum = 6;

  // Poll the WordPress.com API
  $.ajax({
    dataType: "json",
    url: "//public-api.wordpress.com/rest/v1/sites/legouniversenews.wordpress.com/posts/?number=" + postsNum + "&callback=?",
    success: [
      function(data) {
        console.log("Fetching news feed from LEGOUniverseNews.WordPress.com");
        data.posts.forEach(function(details) {
        // Create a unique post ID
        var postID = "post-{0}".format(details.guid.substr(-4));

        // Create the post object and store it
        var newsPost = new BlogPost(postID, details.title, details.short_URL, details.content);
        newsPost.summarize();
        posts.push(newsPost);
      });
    }, displayNews],

    error: function() {
      var message = "<p>Uh-oh, the news could not be loaded! Please try again in a few minutes. " +
          "In the meantime, you can visit <a style='color: #CEC2C2;' href='https://legouniversenews.wordpress.com' target='_blank'>LUN</a> directly.</p>";
      $("#news-feed").html(message);
    }
  });


  /**
   * Display post details.
   * @returns {Boolean} true.
   */
  function displayNews() {
    var $container = $("#news-feed");
    posts.forEach(function(value, index) {
      $container.append(value.container);
      $(value.selector).append("<a class='post-url post-title' target='_blank' href='#'></a>");
      $(value.selector).append("<div class='post-summary'></div>");
      $(value.selector + " .post-title").html(value.title);
      $(value.selector + " .post-url").attr("href", value.url);
      $(value.selector + " .post-summary").html(value.summary);
    });
    return true;
  }
})(jQuery);
