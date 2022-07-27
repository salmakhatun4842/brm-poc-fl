const Boom = require('@hapi/boom');
const ResourceModel = require('../models/resourceModel');

/* Insert Bench Resorce Details */
const createResource = async req => {
  try {
    const resourceFound = await ResourceModel.findOne({ email: req.payload.email.toLowerCase() });
    if (resourceFound) {
      return Boom.conflict('Resource with this email already exists');
    } else {
      let addResourceDetls = new ResourceModel(req.payload)
      console.log(req.payload);
      return await addResourceDetls.save();
    }
  } catch (err) {
    console.log(err.message);
    return Boom.badImplementation();
  }
}

/* Get all Bench Resorce Details */
const getAllResources = async req => {
  try {
    const getResourceDetls = await ResourceModel.find({});
    return { success: true, message: 'Successful', data: getResourceDetls, statusCode: 200 };
  } catch (err) {
    console.log(err.message);
    return Boom.badImplementation();
  }
};

/* Get Resource Details by Id */
const getResourceDetails = async req => {
  try {
    const resourceFound = await ResourceModel.findById({ _id: req.params.resourceId });
    if (!resourceFound) {
      return Boom.notFound("Resource with this id doesn't exists");
    } else {
      return { success: true, message: 'Successful', data: resourceFound, statusCode: 200 };
    }
  } catch (e) {
    console.log(e.message);
    return Boom.badImplementation();
  }
};

/* Update Resorce Details by Id */
const updateResource = async req => {
  try {
    const resourceFound = await ResourceModel.findOne({ _id: req.params.resourceId });
    if (!resourceFound) {
      return Boom.notFound("Resource with this id doesn't exists");
    } else {
      return await ResourceModel.findByIdAndUpdate({ _id: req.params.resourceId }, req.payload, {
        new: true
      });
    }
  } catch (err) {
    console.log(err.message);
    return Boom.badImplementation();
  }
};

/* delete Resorce Details by Id */
const deleteResource = async req => {
  try {
    const resourceFound = await ResourceModel.findOne({ _id: req.params.resourceId });
    if (!resourceFound) {
      return Boom.notFound("Resource with this id doesn't exists");
    } else {
      return await ResourceModel.findByIdAndDelete({ _id: req.params.resourceId });
    }
  } catch (e) {
    console.log(e.message);
    return Boom.badImplementation();
  }
};

/* filter Resource Details */
const filterResource = async req => {
  try {
    let limit = req.payload.pageSize ? req.payload.pageSize : 10; // by default 10 limit
    let skip = req.payload.pageNum ? req.payload.pageSize * (req.payload.pageNum - 1) : 0; // by default 0 skip
    let filter = {};
    ![null, undefined].includes(req.payload.totalWorkExp) ? filter.totalWorkExp = req.payload.totalWorkExp : ''
    ![null, undefined].includes(req.payload.totalExpinFission) ? filter.totalExpinFission = req.payload.totalExpinFission : ''
    ![null, undefined, ''].includes(req.payload.reportingManager) ? filter.reportingManager = req.payload.reportingManager : ''
    req.payload.primarySkills?.length > 0 ? filter["primarySkills.skillName"] = { $in: req.payload.primarySkills } : ''
    let filterData = await ResourceModel.find(filter).skip(skip).limit(limit);
    console.log(req.payload);
    console.log(filterData);
    if (filterData.length === 0) {
      return Boom.notFound("Resource with these details is not available");
    } else {
      return { success: true, message: 'Successful', data: filterData, statusCode: 200 }
    }
  } catch (err) {
    console.log(err.message);
    return Boom.badImplementation();
  }
};

module.exports = { createResource, getAllResources, getResourceDetails, updateResource, deleteResource, filterResource };
