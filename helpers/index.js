module.exports.register = function(Handlebars, options) {
  Handlebars.registerHelper('obj_val', function(object, property) {
    return object ? object[property] : property;
  });

  Handlebars.registerHelper('json_to_str', function(object) {
    return JSON.stringify(object);
  });

  Handlebars.registerHelper('eachProperty', function(context, options) {
    var content = (function () {
      var results = [], index = 0;
      for (var key in context) {
        var value = context[key];
        results.push(options.fn({
          index: index,
          no: index + 1,
          key: key,
          value: value
        }));
        index++;
      }
      return results;
    })();
    return content.join('');
  });

  Handlebars.registerHelper('randomNumber', function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  });

  Handlebars.registerHelper('startsWith', function(str, substr, content) {
    if (str && substr && str.indexOf(substr) === 0) {
      return content.fn(this);
    } else {
      return content.inverse(this);
    }
  });

  Handlebars.registerHelper('get', function(object, index) {
    return object[index];
  });
};
