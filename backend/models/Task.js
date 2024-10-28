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
    priority: {
        type: String,
        Enum: ['low', 'medium', 'high'],
        required: true
    },
    status: {
        type: String,
        Enum: ['pending', 'inProgress', 'completed'],
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
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