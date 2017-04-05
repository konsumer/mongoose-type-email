var mongoose = require('mongoose');

function Email (path, options) {
	mongoose.SchemaTypes.String.call(this, path, options);
	function validateEmail (val) {
		var required = (typeof options.required === 'function') ? options.required() : options.required;
		if (options.allowBlank && val === '' && !required) {
			return true;
		}

		// http://www.w3.org/TR/html5/forms.html#valid-e-mail-address
		return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(val);
	}
	this.validate(validateEmail, 'invalid email address');
}

Email.prototype.__proto__ = mongoose.SchemaTypes.String.prototype;

Email.prototype.cast = function (val) {
	return val.toLowerCase();
};

mongoose.SchemaTypes.Email = module.exports = Email;
mongoose.Types.Email = String;
