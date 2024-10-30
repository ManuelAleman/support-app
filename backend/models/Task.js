const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    subject: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    serviceType: {
        type: String,
    },
    priority: {
        type: String,
        Enum: ['low', 'medium', 'high'],
    },
    status: {
        type: String,
        Enum: ['pending', 'inProgress', 'completed'],
        default: 'pending'
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedEquipment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipment',
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    }, 
    completedAt: {
        type: Date
    }
}, {
    timestamps: true

});

module.exports = mongoose.model('Task', TaskSchema);