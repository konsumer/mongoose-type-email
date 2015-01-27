# mongoose-type-email
An email field-type for Mongoose schemas

[![npm version](https://badge.fury.io/js/mongoose-type-email.svg)](http://badge.fury.io/js/mongoose-type-email)
[![Build Status](https://travis-ci.org/konsumer/mongoose-type-email.svg?branch=master)](https://travis-ci.org/konsumer/mongoose-type-email)
[![Code Climate](https://codeclimate.com/github/konsumer/mongoose-type-email/badges/gpa.svg)](https://codeclimate.com/github/konsumer/mongoose-type-email)

## installation

    npm install mongoose-type-email


## usage

This will validate email, correctly:

```
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

```javascript
var UserSchema = new mongoose.Schema({
    email: {
        work: {type: mongoose.SchemaTypes.Email, required: true},
        home: {type: mongoose.SchemaTypes.Email, required: true},
    }
});
```
