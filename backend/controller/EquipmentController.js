const equipmentModel = require('../models/EquipmentModel');
const areaModel = require('../models/areaModel');

exports.createEquipment = async (req, res) => {
    try {
        const { name, type, operatingSystem, description, areaId } = req.body;

        const area = await areaModel.findById(areaId);
        if (!area) {
            return res.status(400).json({ message: 'Area not found' });
        }

        const equipment = new equipmentModel({
            name,
            type,
            operatingSystem,
            description,
            area: areaId
        });

        await equipment.save();


        area.equipments.push(equipment._id); 
        await area.save();

        res.status(201).json({
            message: 'Equipment created successfully',
            data: equipment
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
