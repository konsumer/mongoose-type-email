/* global describe, it, expect */
require('mockingoose')
var mongoose = require('mongoose')
require('../')

mongoose.Promise = Promise

var UserSimple = mongoose.model('UserSimple', new mongoose.Schema({
  email: mongoose.SchemaTypes.Email
}))

var UserAllowBlank = mongoose.model('UserAllowBlank', new mongoose.Schema({
  email: { type: mongoose.SchemaTypes.Email, allowBlank: true }
}))

var UserRequired = mongoose.model('UserRequired', new mongoose.Schema({
  email: {type: mongoose.SchemaTypes.Email, required: true}
}))

var UserNested = mongoose.model('UserNested', new mongoose.Schema({
  email: {
    work: {type: mongoose.SchemaTypes.Email, required: true},
    home: {type: mongoose.SchemaTypes.Email, required: true}
  }
}))

var UserCustomMessage = mongoose.model('UserCustomMessage', new mongoose.Schema({
  email: { type: mongoose.SchemaTypes.Email, message: 'error.email' }
}))

describe('mongoose-type-email', function () {
  it('should enable basic email field-type in schema', function (done) {
    var user = new UserSimple()
    user.save(done)
  })

  it('should not enable blank value', function (done) {
    var user = new UserSimple()
    user.email = ''
    user.validate(function (err) {
      expect(err.errors.email.message).toEqual('invalid email address')
      done()
    })
  })

  it('should enable an empty string value when allowBlank', function (done) {
    var user = new UserAllowBlank()
    user.email = ''
    user.save(done)
  })

  it('should enable a null value when allowBlank', function (done) {
    var user = new UserAllowBlank()
    user.email = null
    user.save(done)
  })

  it('should require email', function (done) {
    var user = new UserRequired()
    user.validate(function (err) {
      expect(err.errors.email.message).toEqual('Path `email` is required.')
      done()
    })
  })

  it('should enable nested required email', function (done) {
    var user = new UserNested()
    user.validate(function (err) {
      expect(err.errors['email.home'].message).toEqual('Path `email.home` is required.')
      expect(err.errors['email.work'].message).toEqual('Path `email.work` is required.')
      done()
    })
  })

  it('should not enable blank value with custom message', function (done) {
    var user = new UserCustomMessage()
    user.email = ''
    user.validate(function (err) {
      expect(err.errors.email.message).toEqual('error.email')
      done()
    })
  })
})
