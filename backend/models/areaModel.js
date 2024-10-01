const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us the area name!']
    },
    equipment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Equipment'
    },
    tasks: {
        type: Array,
        default: []
    },
}, {
    timestamps: true
});

const Area = mongoose.model('Area', areaSchema);

module.exports = Area;