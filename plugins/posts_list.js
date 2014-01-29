module.exports = function(params, callback) {
  'use strict';

  var assemble = params.assemble;
  var grunt    = params.grunt;
  var options  = assemble.options;
  var pages    = options.pages;

  var list     = [];

  if (options.export_posts_list_as) {
    for (var i = 0; i < pages.length; i++) {
      var page = pages[i];
      if (/\.md$/i.test(page.src)) {
        list.push({
          title: page.data.title,
          permalink: page.data.permalink,
          date: page.data.date,
          type: page.data.type
        });
      }
    }

    list.sort(function(a, b) {
      return a.permalink < b.permalink ? 1 : -1;
    });

    var posts_list = grunt.config('assemble.options.posts_list');
    if (posts_list instanceof Array || typeof(posts_list) !== 'object') posts_list = {};
    posts_list[options.export_posts_list_as] = list;
    grunt.config('assemble.options.posts_list', posts_list);
  }

  callback();
};

module.exports.options = {
  stage: 'render:pre:pages'
};
