var fwk = require('fwk');
var cfg = fwk.populateConfig(require('../../config.js').config);
var instagram = require('../../lib/instagram.js').instagram();

instagram.use({
  enforce_signed_requests: true,
  client_secret: cfg['INSTAGRAM_CLIENT_SECRET'],
  access_token: cfg['INSTAGRAM_ACCESS_TOKEN']
});

/**
 * Test signed requests with non-ASCII URLs
 */
var tags = (function(spec, my) {
  var _super = {};
  my = my || {};

  // public
  var todo;

  // private

  var that = require('../test_base.js').test_base({ name: 'tags' });

  todo = function() {
    var tests = {
      'tag info (emoji)': function(cb_) {
        var retry = 0;
        instagram.tag('🎃', function(err, result, remaining, limit) {
          var res = {
            ok: true,
            description: 'Retrieves informations about a tag (with emoji)'
          };

          if(result && remaining) {
            return cb_(null, res);
          } else {
            if(retry < 2) {
              that.retry(res.description, ++retry);
              err.retry();
            } else {
              res.ok = false;
              return cb_(null, res);
            }
          }
        });
      },
      'tag search (emoji)': function(cb_) {
        var retry = 0;
        instagram.tag_search('🎃', function(err, result, remaining, limit) {
          var res = {
            ok: true,
            description: 'Search a tag (with emoji)'
          };

          if(result && remaining) {
            return cb_(null, res);
          } else {
            if(retry < 2) {
              that.retry(res.description, ++retry);
              err.retry();
            } else {
              res.ok = false;
              return cb_(null, res);
            }
          }
        });
      },
      'tag media recent (emoji)': function(cb_) {
        var retry = 0;
        instagram.tag_media_recent('🎃', function(err, result, remaining, limit) {
          var res = {
            ok: true,
            description: 'Retrieves recent medias (with emoji)'
          };

          if(result && remaining) {
            return cb_(null, res);
          } else {
            if(retry < 2) {
              that.retry(res.description, ++retry);
              err.retry();
            } else {
              res.ok = false;
              return cb_(null, res);
            }
          }
        });
      }
    };

    return tests;
  };

  fwk.method(that, 'todo', todo, _super);

  return that;
})({});

tags.launch();
