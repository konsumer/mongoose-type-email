var mongoose = require('mongoose')

// http://www.w3.org/TR/html5/forms.html#valid-e-mail-address
var regEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/

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
  this.validate(function (val) { return validateEmail(val, options) }, options.message || 'invalid email address')
}

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
