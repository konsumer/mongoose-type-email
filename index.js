var mongoose = require('mongoose')

// http://www.w3.org/TR/html5/forms.html#valid-e-mail-address
var regEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

function validateEmail (val, options) {
  var required = (typeof options.required === 'function') ? options.required() : options.required
  var passedAllowBlank = options.allowBlank && (val === '' || val === null)
  if (passedAllowBlank && !required) {
    return true
  }
  return regEmail.test(val)
}

function Email (path, options) {
  this.options = options;
  this.path = path;
  mongoose.SchemaTypes.String.call(this, path, options)
  this.validate(function (val) { return validateEmail(val, options) }, options.message || Email.defaults.message || 'invalid email address')
}

Email.defaults = {}

Object.setPrototypeOf(Email.prototype, mongoose.SchemaTypes.String.prototype)

Email.prototype.cast = function (val) {
  return val.toLowerCase()
}

Email.prototype.get = function (val) {
    return val.toLowerCase()
}

Email.prototype.checkRequired = function (val) {
    return typeof val === 'string' && validateEmail(val, this.options);
};

mongoose.SchemaTypes.Email = module.exports = Email
mongoose.Types.Email = String
