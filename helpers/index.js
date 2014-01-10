module.exports.register = function(Handlebars, options) {
  Handlebars.registerHelper('obj_val', function(object, property) {
    return object ? object[property] : property;
  });

  Handlebars.registerHelper('json_to_str', function(object) {
    return JSON.stringify(object);
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

  Handlebars.registerHelper('selfIncrementCounter', function(counter, index) {
    counter[index] += 1;
    return counter[index];
  });
};
