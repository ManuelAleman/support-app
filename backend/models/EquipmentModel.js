const mongoose = require('mongoose');

const EquipmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        Enum : ['Computer', 'Server', 'Printer', 'Projector', 'Scanner', 'UPS', 'Router', 'Switch'],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    parts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Part'
    }]
});

const EquipmentModel = mongoose.model('Equipment', EquipmentSchema);

module.exports = EquipmentModel;