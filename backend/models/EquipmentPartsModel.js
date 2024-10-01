const mongoose = require('mongoose');

const EquipmentPartsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['GPU', 'CPU', 'RAM', 'SSD', 'HDD', 'Motherboard', 'Power Supply', 'Cooling', 'Other'],
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String
    }
});

const PartModel = mongoose.model('Part', EquipmentPartsSchema);

module.exports = PartModel;