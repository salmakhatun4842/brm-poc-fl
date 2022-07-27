const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const resourceSchema = new Schema({
    name: {
        type: 'String',
        default: null,
        trim: true
    },
    emp_id: {
        type: 'String',
        default: null
    },
    email: {
        type: 'String',
        format: 'email',
        lowerCase: true
    },
    totalWorkExp: {
        type: Number,
        default: null
    },
    totalExpinFission: {
        type: Number,
        default: null
    },
    primarySkills: [{
        skillName: {
            type: 'String',
            default: null
        },
        totalExp: {
            type: Number,
            default: null
        },
        _id: false
    }],
    reportingManager: {
        type: 'String',
        default: null
    },
    notes: {
        type: 'String',
        default: null
    },
    teamLead: {
        type: 'String',
        default: null
    }
});

module.exports = mongoose.model('BenchResource', resourceSchema, 'Resources');
