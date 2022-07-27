const Boom = require('@hapi/boom');
const workLogModel = require('../models/workLogModel');

module.exports.create = async req => {
    try {
        let workLogData = req.payload;
        workLogData.resourceId = req.params.resourceId;
        //TODO : authorise user for resourceid
        await workLogModel.create(workLogData);
        return { success: true, message: 'Successful', data: {}, statusCode: 200 }
    } catch (err) {
        console.log(err.message);
        return Boom.badImplementation();
    }
}

module.exports.getById = async req => {
    try {
        //TODO : authorise user for worklogid
        let data = await workLogModel.findOne(req.params)
        return { success: true, message: 'Successful', data: data, statusCode: 200 }
    } catch (err) {
        console.log(err.message);
        return Boom.badImplementation();
    }
};

module.exports.filter = async req => {
    try {
        //TODO : authorise user for resourceid
        let filterParams = { resourceId: req.params.resourceId };
        req.payload.logDate ? filterParams.logDate = req.payload.logDate : ''
        req.payload.duration ? filterParams.duration = req.payload.duration : ''
        let limit = req.payload.pageSize ? req.payload.pageSize : 10; // by default 10 limit
        let skip = req.payload.pageNum ? req.payload.pageSize * (req.payload.pageNum - 1) : 0; // by default 0 skip
        let data = await workLogModel.find(filterParams).skip(skip).limit(limit);
        return { success: true, message: 'Successful', data: data, statusCode: 200 }
    } catch (err) {
        console.log(err.message);
        return Boom.badImplementation();
    }
};

module.exports.update = async req => {
    try {
        let workLogData = req.payload;
        //TODO : authorise user for worklogid
        await workLogModel.findOneAndUpdate({ _id: req.params.worklogid }, workLogData);
        return { success: true, message: 'Successful', data: {}, statusCode: 200 }
    } catch (err) {
        console.log(err.message);
        return Boom.badImplementation();
    }
}

module.exports.delete = async req => {
    try {
        //TODO : authorise user for worklogid
        await workLogModel.findOneAndDelete(req.params);
        return { success: true, message: 'Successful', data: {}, statusCode: 200 }
    } catch (err) {
        console.log(err.message);
        return Boom.badImplementation();
    }
}
