const resourceController = require('../controllers/resourceController.js');
const { resourceJoiSchema, filterSchema } = require('../validator/resource');
const { checkResourceId } = require('../validator/common');

module.exports = [
  /* Insert Bench Resorce Details */
  {
    method: 'POST',
    path: '/resources',
    handler: resourceController.createResource,
    config: {
      description: 'Create a new Resource',
      tags: ['api', 'resources'],
      auth: false,
      validate: {
        payload: resourceJoiSchema
      },
    },
  },
  /* Get all Bench Resorce Details */
  {
    method: 'GET',
    path: '/resources',
    handler: resourceController.getAllResources,
    config: {
      description: 'Get all Resources',
      tags: ['api', 'resources'],
      auth: false,
    },
  },
  /* Get Resorce Details by Id */
  {
    method: 'GET',
    path: '/resources/{resourceId}',
    handler: resourceController.getResourceDetails,
    config: {
      description: 'Get Resource Details',
      tags: ['api', 'resources'],
      auth: false,
      validate: {
        params: checkResourceId
      },
    },
  },
  /* Update Resorce Details by Id */
  {
    method: 'PATCH',
    path: '/resources/{resourceId}',
    handler: resourceController.updateResource,
    config: {
      description: 'Update Resource details',
      tags: ['api', 'resources'],
      auth: false,
      validate: {
        params: checkResourceId,
        payload: resourceJoiSchema,
      },
    },
  },
  /* delete Resorce Details by Id */
  {
    method: 'DELETE',
    path: '/resources/{resourceId}',
    handler: resourceController.deleteResource,
    config: {
      description: 'Delete Resource details',
      tags: ['api', 'resources'],
      auth: false,
      validate: {
        params: checkResourceId
      },
    },
  },

  {
    method: 'POST',
    path: '/resources/filter',
    handler: resourceController.filterResource,
    config: {
        description: 'filter resources',
        tags: ['api', 'resources'],
        auth: false,
        validate: {
          payload: filterSchema
        },
    },
}
];
