# mongoose-type-email

An email field-type for Mongoose schemas

[![npm](https://nodei.co/npm/mongoose-type-email.png)](https://www.npmjs.com/package/mongoose-type-email)

[![Greenkeeper badge](https://badges.greenkeeper.io/konsumer/mongoose-type-email.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/konsumer/mongoose-type-email.svg?branch=master)](https://travis-ci.org/konsumer/mongoose-type-email)
[![Code Climate](https://codeclimate.com/github/konsumer/mongoose-type-email/badges/gpa.svg)](https://codeclimate.com/github/konsumer/mongoose-type-email)

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