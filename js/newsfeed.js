/*
 * LEGO Universe News! Patcher
 *
 * Created 2013-2015 Triangle717 & rioforce
 * <http://Triangle717.WordPress.com/>
 * <http://rioforce.WordPress.com/>
 *
 * Licensed under The MIT License
 * <http://opensource.org/licenses/MIT>
*/


(function($) {
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
    this.id = "post-" + id.toString();
    this.url = url;
    this.title = title;
    this.summary = summary;
    this.selector = ".post-single#" + this.id;
    this.container = '<div class="post-single" id="' + this.id + '"></div>';
  }


  /**
   * @constant
   * @type {Number}
   * The number of characters the summary should be limited to.
   * This is a rough number and may increase in order
   * to accommodate the rest of a word.
   */
  BlogPost.prototype.charLimit = 170;


  /**
   * Create a blog post summary.
   * @returns {Boolean} true.
   */
  BlogPost.prototype.summarize = function() {
    // Strip HTML tags except for white listed ones
    var tagsRe   = /<(?!\/??(?:p|div)).+?>/gi;
    this.summary = this.summary.replace(tagsRe, "");
    this.title   = this.title.replace(tagsRe, "");

    // This is a reblogged post, cut out the reblogged markup
    if (/reblogged-content/.test(this.summary)) {
      this.summary = this.summary.slice(this.summary.indexOf("reblogged-content") + 20);
      this.summary.replace(/<\/div><p class="reblog-source">View original<\/p><\/div><\/div>/, "");
    }

    // Get the index of the nearest punctuation mark
    var charLimit = this.charLimit,
        noPuncRe  = /[.?;:!]/;
    if (!noPuncRe.test(this.summary.charAt(charLimit))) {
      while (!noPuncRe.test(this.summary.charAt(charLimit))) {
        charLimit += 1;
      }
    }

    // Display only the first bit of the news
    this.summary = this.summary.substr(0, charLimit) + "...";
    return true;
  };


  // Number of posts depending to display
  var posts    = [],
      postsNum = 6;

  /**
   * Display post details.
   * @returns {Boolean} true.
   */
  function displayNews() {
    var $container = $("#news-feed");
    posts.forEach(function(value) {
      $container.append(value.container);
      $(value.selector).append("<a class='post-url post-title' target='_blank' href='#'></a>");
      $(value.selector).append("<div class='post-summary'></div>");
      $(value.selector + " .post-title").html(value.title);
      $(value.selector + " .post-url").attr("href", value.url);
      $(value.selector + " .post-summary").html(value.summary);
    });
    return true;
  }


  // Poll the WordPress.com API
  $.ajax({
    dataType: "json",
    url: "//public-api.wordpress.com/rest/v1/sites/legouniversenews.wordpress.com/posts/?number=" + postsNum + "&callback=?",
    success: [
      function(data) {
        console.log("Fetching news feed from LEGOUniverseNews.WordPress.com");
        data.posts.forEach(function(post) {

          // Create the post object
          var newsPost = new BlogPost(post.ID, post.title, post.short_URL, post.content);
          newsPost.summarize();
          posts.push(newsPost);
        });
      }, displayNews],

    error: function() {
      var message = "<p>The news feed could not be loaded. " +
          "Please visit the <a style='color: #CEC2C2;' href='https://legouniversenews.wordpress.com' target='_blank'>" +
          "LEGO Universe News!</a> blog directly.</p>";
      $("#news-feed").html(message);
    }
  });
})(jQuery);
