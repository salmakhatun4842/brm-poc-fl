const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const workLogSchema = new Schema({
    duration: {
        type: Number,
        default: 0
    },
    resourceId: {
        type: Schema.Types.ObjectId,
        ref: 'Resources',
        required: true
    },
    taskDetails: String,
    taskDescription: String,
    logDate: {
        type: Date,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('worklogs', workLogSchema, 'worklogs');
