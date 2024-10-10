const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Computer', 'Server', 'Printer', 'Projector', 'Scanner', 'UPS', 'Router', 'Switch'],
        required: true
    },
    operatingSystem: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    area: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Area',
        required: true
    }
});

const EquipmentModel = mongoose.model('Equipment', EquipmentSchema);

module.exports = EquipmentModel;
