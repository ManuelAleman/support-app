const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us the task name!']
    },
    description: {
        type: String,
        required: [true, 'Please tell us the task description!']
    },
    area: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Area',
        required: [true, 'Please tell us the task area!']
    },
    equipments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipment'
    }],
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    dueDate: {
        type: Date,
        required: [true, 'Please tell us the task due date!']
    },
    finishedAt: {
        type: Date
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please tell us the task assignee!']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);

