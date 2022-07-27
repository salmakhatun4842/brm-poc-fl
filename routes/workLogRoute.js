const workLogController = require('../controllers/workLogController');
const { create, filter, update } = require('../validator/workLog');
const { checkResourceId, checkWorkLogId } = require('../validator/common');

module.exports = [
    {
        method: 'POST',
        path: '/worklog/{resourceId}',
        handler: workLogController.create,
        config: {
            description: 'Create a new worklog',
            tags: ['api', 'worklog'],
            auth: false,
            validate: {
                payload: create,
                params: checkResourceId
            },
        },
    },
    {
        method: 'GET',
        path: '/worklog/{worklogid}',
        handler: workLogController.getById,
        config: {
            description: 'Get worklog by id',
            tags: ['api', 'worklog'],
            auth: false,
            validate: {
                params: checkWorkLogId
            },
        },
    },
    {
        method: 'POST',
        path: '/worklog/filter/{resourceId}',
        handler: workLogController.filter,
        config: {
            description: 'filter worklog',
            tags: ['api', 'resources'],
            auth: false,
            validate: {
                params: checkResourceId,
                payload: filter
            },
        },
    },
    {
        method: 'PUT',
        path: '/worklog/{worklogid}',
        handler: workLogController.update,
        config: {
            description: 'Update worklog',
            tags: ['api', 'resources'],
            auth: false,
            validate: {
                params: checkWorkLogId,
                payload: update
            },
        },
    },
    {
        method: 'DELETE',
        path: '/worklog/{worklogid}',
        handler: workLogController.delete,
        config: {
            description: 'delete worklog',
            tags: ['api', 'resources'],
            auth: false,
            validate: {
                params: checkWorkLogId
            },
        },
    }
];
