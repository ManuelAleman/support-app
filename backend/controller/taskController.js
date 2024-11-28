const taskModel = require("../models/Task");
const userModel = require("../models/userModel");
const EquipmentModel = require("../models/equipmentModel");
const departmentModel = require("../models/departmentModel");
const Support = require("../models/Support");
const router = require("../routes/taskRoute");

exports.createTask = async (req, res) => {
  try {
    const { subject, message, createdBy, assignedEquipment, creationDate } =
      req.body;

    if (
      !subject ||
      !message ||
      !createdBy ||
      !assignedEquipment ||
      !creationDate
    ) {
      return res.status(400).send({ error: "All fields are required" });
    }

    const user = await userModel.findById(createdBy);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    const equipment = await EquipmentModel.findById(assignedEquipment);
    if (!equipment) {
      return res.status(404).send({ error: "Equipment not found" });
    }

    const existingTask = await taskModel.findOne({
      assignedEquipment,
      status: { $ne: "completed" },
    });
    if (existingTask) {
      return res
        .status(400)
        .send({ error: "A task with the same equipment already exists" });
    }

    const task = new taskModel({
      subject,
      message,
      createdBy,
      assignedEquipment,
      creationDate,
    });
    await task.save();

    res.status(201).send({
      message: "Task created successfully",
      task,
      assignedUser: user.name,
      assignedEquipment: equipment.name,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "An error occurred while creating the task" });
  }
};
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await taskModel
      .find()
      .populate("createdBy", "name")
      .populate("assignedEquipment", "name")
      .populate("assignedTo", "name");
    res.status(200).send(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while fetching tasks" });
  }
};

exports.authorizeTask = async (req, res) => {
  try {
    console.log(req.body);
    const { taskId, assignedTo, priority, type } = req.body;
    const task = await taskModel.findById(taskId);
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }

    const user = await userModel.findById(assignedTo);
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    task.status = "inProgress";
    task.priority = priority;
    task.assignedTo = assignedTo;
    task.type = type;
    await task.save();

    res
      .status(200)
      .send({
        message: "Task assigned successfully",
        task,
        assignedUser: user.name,
      });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while assigning task" });
  }
};

exports.getUnassignedTasks = async (req, res) => {
  try {
    const tasks = await taskModel
      .find({ assignedTo: null })
      .populate("createdBy", "name")
      .populate("assignedEquipment", "name");
    res.status(200).send(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while fetching tasks" });
  }
};

exports.getMyGeneratedTasks = async (req, res) => {
  try {
    const tasks = await taskModel
      .find({ createdBy: req.body.id })
      .populate({
        path: "createdBy",
        select: "name email role rating phone",
      })
      .populate({
        path: "assignedEquipment",
        select: "name type operatingSystem available",
        populate: {
          path: "parts",
          select: "type model quantity",
        },
      })
      .populate({
        path: "assignedTo",
        select: "name email role rating phone",
      })
      .populate({
        path: "changes",
        select: "message price status",
        populate: {
          path: "piece",
          select: "name type model",
        },
      });
    res.status(200).send(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while fetching tasks" });
  }
};

exports.getMyAssignedTasks = async (req, res) => {
  try {
      const tasks = await taskModel.find({ assignedTo: req.body.id, status: { $ne: 'completed' } })
          .populate({
              path: 'createdBy',
              select: 'name email role rating phone',
          })
          .populate({
              path: 'assignedEquipment',
              select: 'name type operatingSystem available',
              populate: {
                  path: 'parts',
                  select: 'type model quantity',
              }
          })
          .populate({
              path: 'assignedTo',
              select: 'name email role rating phone',
          })
          .populate({
              path: 'changes',
              select: 'message price status',
              populate: {
                  path: 'piece',
                  select: 'name type model'
              }
          });
      
      tasks.sort((a, b) => {
          const priorityOrder = { low: 3, medium: 2, high: 1 };
          return priorityOrder[a.priority] - priorityOrder[b.priority];
      });

      res.status(200).send(tasks);
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'An error occurred while fetching tasks' });
  }
};
exports.getAllBuildingAndEquipmentInfo = async (req, res) => {
  try {
    const departments = await departmentModel.find().populate({
      path: "areas",
      select: "equipments",
      populate: {
        path: "equipments",
        select: "name type available",
      },
    });

    const result = departments.map((department) => ({
      _id: department._id,
      name: department.name,
      inCharge: department.inCharge,
      equipments: department.areas.flatMap((area) => area.equipments),
    }));

    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({
        error: "An error occurred while fetching departments and equipments",
      });
  }
};

exports.finishTask = async (req, res) => {
  try {
    const { id } = req.params;
    const completedAt = new Date();
    const task = await taskModel.findById(id);
    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }

    task.status = "completed";
    task.completedAt = completedAt;
    await task.save();

    res.status(200).send({ message: "Task finished successfully", task });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while finishing task" });
  }
};

exports.getMyCompletedTasks = async (req, res) => {
  try {
    const tasks = await taskModel
      .find({ assignedTo: req.body.id, status: "completed" })
      .populate({
        path: "createdBy",
        select: "name email role rating phone",
      })
      .populate({
        path: "assignedEquipment",
        select: "name type operatingSystem available",
        populate: {
          path: "parts",
          select: "type model quantity",
        },
      })
      .populate({
        path: "assignedTo",
        select: "name email role rating phone",
      })
      .populate({
        path: "changes",
        select: "message price status",
        populate: {
          path: "piece",
          select: "name type model",
        },
      });

    tasks.sort((a, b) => {
      const priorityOrder = { low: 3, medium: 2, high: 1 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    res.status(200).send(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while fetching tasks" });
  }
};


exports.getAllCompletedTasks = async (req, res) => {
  try {
    const tasks = await taskModel
      .find({ status: "completed" })
      .populate({ path: "createdBy", select: "name email role rating phone" })
      .populate({ path: "assignedEquipment", select: "name type operatingSystem available", populate: { path: "parts", select: "type model quantity" } })
      .populate({ path: "assignedTo", select: "name email role rating phone" })
      .populate({ path: "changes", select: "message price status", populate: { path: "piece", select: "name type model" } });

    tasks.sort((a, b) => {
      const priorityOrder = { low: 3, medium: 2, high: 1 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    res.status(200).send(tasks);


  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "An error occurred while fetching tasks" });
  }
};