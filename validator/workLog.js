const Joi = require('@hapi/joi');

module.exports.create = Joi.object({
    duration: Joi.number().allow(0, null),
    taskDescription: Joi.string().allow('', null),
    taskDetails: Joi.string().allow('', null),
    logDate: Joi.date().required()
})

module.exports.update = Joi.object({
    duration: Joi.number().allow(0, null),
    taskDescription: Joi.string().allow('', null),
    taskDetails: Joi.string().allow('', null),
    logDate: Joi.date()
})

module.exports.filter = Joi.object({
    duration: Joi.number().allow(0, null),
    logDate: Joi.date(),
    pageSize: Joi.number().allow(0, null),
    pageNum: Joi.number().allow(0, null)
})