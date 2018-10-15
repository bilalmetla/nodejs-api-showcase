'use strict';

const debug = require('debug')('EndpointValidator class');

module.exports = class EndpointValidator {
  constructor() {
    debug('constract EndpointValidator starts');
    this._settings = {
      customValidators: {
        isInArray(item, array) {
          return array.includes(item);
        },
        isMongoObjectID(param) {
          return new RegExp('^[0-9a-fA-F]{24}$').test(param);
        },
      },
    };
    debug('constract EndpointValidator ends');
  }

  get settings() {
    return this._settings;
  }

  set settings(newSettings) {
    this._settings = newSettings;
  }


  requireValidUserBody(req, res, next) {
    req.checkBody('email', 'add a valid email.').notEmpty().isEmail();
    req.checkBody('name', 'name in body required.').notEmpty();
    req.checkBody('surname', 'surname in body required.').notEmpty();
    req.checkBody('password', 'password in body required.').notEmpty();
    req.getValidationResult().then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).jerror(400, `${result.array({ onlyFirstError: true })[0].msg}`);
      }
      return next();
    });
  }


  requireBodyParamsForLogin(req, res, next) {
    req.checkBody('email', 'add a valid email.').notEmpty().isEmail();
    req.checkBody('password', 'password in query required.').notEmpty();
    req.getValidationResult().then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).jerror(400, `${result.array({ onlyFirstError: true })[0].msg}`);
      }
      return next();
    });
  }


  requireValidTweetId(req, res, next) {
    req.checkParams('tweetId', 'add a valid tweet id.').isMongoObjectID();
    req.getValidationResult().then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).jerror(400, `${result.array({ onlyFirstError: true })[0].msg}`);
      }
      return next();
    });
  }


  requireValidUserCreateBody(req, res, next) {
    req.checkBody('email', 'add a valid email.').notEmpty().isEmail();
    req.checkBody('name', 'name in body required.').notEmpty();
    req.checkBody('surname', 'surname in body required.').notEmpty();
    req.getValidationResult().then((result) => {
      if (!result.isEmpty()) {
        return res.status(400).jerror(400, `${result.array({ onlyFirstError: true })[0].msg}`);
      }
      return next();
    });
  }
};