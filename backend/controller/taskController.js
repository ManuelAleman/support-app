const taskModel = require('../models/Task');
const userModel = require('../models/userModel');
const equipmentModel = require('../models/EquipmentModel');
const departmentModel = require('../models/departmentModel');

exports.createTask = async (req, res) => {
    try {
        const { subject, message, createdBy, assignedEquipment, creationDate } = req.body;
        
        if (!subject || !message || !createdBy || !assignedEquipment || !creationDate) {
            return res.status(400).send({ error: 'All fields are required' });
        }

        const user = await userModel.findById(createdBy);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        const equipment = await equipmentModel.findById(assignedEquipment);
        if (!equipment) {
            return res.status(404).send({ error: 'Equipment not found' });
        }

        const task = new taskModel({
            subject,
            message,
            createdBy,
            assignedEquipment,
            creationDate
        });
        await task.save();

        res.status(201).send({
            message: 'Task created successfully',
            task,
            assignedUser: user.name,
            assignedEquipment: equipment.name
        });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while creating the task' });
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find().populate('createdBy', 'name').populate('assignedEquipment', 'name').populate('assignedTo', 'name');
        res.status(200).send(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while fetching tasks' });
    }
}

exports.authorizeTask = async (req, res) => {
    try {
        const { taskId, assignedTo, priority, service } = req.body;
        const task = await taskModel.findById(taskId);
        if (!task) {
            return res.status(404).send({ error: 'Task not found' });
        }

        const user = await userModel.findById(assignedTo);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        task.status = 'inProgress';
        task.priority = priority;
        task.service = service;
        task.assignedTo = assignedTo;
        await task.save();

        res.status(200).send({ message: 'Task assigned successfully', task, assignedUser: user.name });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while assigning task' });
    }
}

exports.getUnassignedTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find({ assignedTo: null }).populate('createdBy', 'name').populate('assignedEquipment', 'name');
        res.status(200).send(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while fetching tasks' });
    }
}

exports.getMyGeneratedTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find({ createdBy: req.user._id }).populate('createdBy', 'name').populate('assignedEquipment', 'name').populate('assignedTo', 'name');
        res.status(200).send(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while fetching tasks' });
    }
}

exports.getMyAssignedTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find({ assignedTo: req.user._id }).populate('createdBy', 'name').populate('assignedEquipment', 'name').populate('assignedTo', 'name');
        res.status(200).send(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while fetching tasks' });
    }
}

exports.getAllBuildingAndEquipmentInfo = async (req, res) => {
    try {
        const departments = await departmentModel.find()
            .populate({
                path: 'areas', 
                select: 'equipments', 
                populate: {
                    path: 'equipments',
                    select: 'name type available'
                }
            });

        const result = departments.map(department => ({
            _id: department._id,
            name: department.name,
            inCharge: department.inCharge,
            equipments: department.areas.flatMap(area => area.equipments) // Aplanamos los equipos de todas las áreas
        }));

        res.status(200).send(result);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while fetching departments and equipments' });
    }
};

