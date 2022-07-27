const Joi = require('@hapi/joi');

module.exports.resourceJoiSchema = Joi.object({
    name: Joi.string().required(),
    emp_id: Joi.string().required(),
    email: Joi.string().email().lowercase().required(),
    totalWorkExp: Joi.number(),
    totalExpinFission: Joi.number(),
    primarySkills: Joi.array().items(
        Joi.object({
            skillName: Joi.string(),
            totalExp: Joi.number()
        })
    ),
    reportingManager: Joi.string(),
    teamLead: Joi.string(),
    notes: Joi.string()
}).unknown();

module.exports.filterSchema = Joi.object({
    totalWorkExp: Joi.number().allow(0, null),
    totalExpinFission: Joi.number().allow(0, null),
    reportingManager: Joi.string().allow('', null),
    primarySkills: Joi.array().items(Joi.string()),
    pageSize: Joi.number().allow(0, null),
    pageNum: Joi.number().allow(0, null)
});
