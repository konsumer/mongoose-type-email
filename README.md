# mongoose-type-email

An email field-type for Mongoose schemas

[![Code Climate](https://codeclimate.com/github/konsumer/mongoose-type-email/badges/gpa.svg)](https://codeclimate.com/github/konsumer/mongoose-type-email)

[![npm](https://nodei.co/npm/mongoose-type-email.png)](https://www.npmjs.com/package/mongoose-type-email)

## usage

This will validate email, correctly:

```js
var mongoose = require('mongoose');
require('mongoose-type-email');

var UserSchema = new mongoose.Schema({
    email: {
        work: mongoose.SchemaTypes.Email,
        home: mongoose.SchemaTypes.Email
    }
});
```

You can also use the stuff in `String` type:

```js
var UserSchema = new mongoose.Schema({
    email: {
        work: {type: mongoose.SchemaTypes.Email, required: true},
        home: {type: mongoose.SchemaTypes.Email, required: true},
    }
});
```

You can also use it as an array:


```js
var UserSchema = new mongoose.Schema({
    emails: [{type: mongoose.SchemaTypes.Email}]
});
```

You can add 'allowBlank: true' in order to allow empty string ('') when the field is not required

```js
var mongoose = require('mongoose');
require('mongoose-type-email');

var UserSchema = new mongoose.Schema({
    email: {
        work: { type: mongoose.SchemaTypes.Email, allowBlank: true }, // allows '' as a value
        home: mongoose.SchemaTypes.Email // throws when the value is ''
    }
});
```

You can specify a default custom error message by overriding `mongoose.SchemaTypes.Email.defaults.message`

```js
var mongoose = require('mongoose');
require('mongoose-type-email');
mongoose.SchemaTypes.Email.defaults.message = 'Email address is invalid'

var UserSchema = new mongoose.Schema({
    email: {
        work: mongoose.SchemaTypes.Email,
        home: mongoose.SchemaTypes.Email
    }
});
```

By default, this library follows the same validation you see in the [html spec for `type=email`](https://html.spec.whatwg.org/multipage/input.html#valid-e-mail-address) which allows local email addresses, and other non-standard email types. If you want more complete TLD validation (eg `user@host.com`) you can use the `correctTld` options:

```js
var UserSchema = new mongoose.Schema({
    email: {
        work: {type: mongoose.SchemaTypes.Email, correctTld: true},
        home: {type: mongoose.SchemaTypes.Email, correctTld: true},
    }
});
```