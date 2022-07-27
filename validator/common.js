const Joi = require('@hapi/joi');

module.exports.checkResourceId = Joi.object({
    resourceId: Joi.string().required()
})

module.exports.checkWorkLogId = Joi.object({
    worklogid: Joi.string().required()
})