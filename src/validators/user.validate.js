const Joi = require('joi'); 

exports.loginSchema = Joi.object().keys({ 
    email: Joi.string().email().required(),
    password: Joi.string().required(), 
  }); 