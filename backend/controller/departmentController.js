const express = require("express");
const departmentModel = require("../models/departmentModel");
const userModel = require("../models/userModel");
exports.createDepartment = async (req, res) => {
    try {
        const { name, inCharge, areas } = req.body;

        const existingDepartment = await departmentModel.findOne({ name: name });

        if (existingDepartment) {
            return res.status(400).json({
                status: 'fail',
                message: 'Department already exists'
            });
        }

        const existingUser = await userModel.findById(inCharge);
        if (!existingUser) {
            return res.status(400).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        if(inCharge.role !== 'inCharge'){
           await userModel.findByIdAndUpdate(inCharge, {role: 'inCharge'});
        }

        await departmentModel.create({
            name,
            inCharge,
            areas
        });

        res.status(201).json({
            status: 'success',
        });

    }catch(error){
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}


exports.getDepartments = async (req, res) => {
    try {
        const departments = await departmentModel.find();

        res.status(200).json({
            status: 'success',
            data: departments
        });

    }catch(error){
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}

exports.getDepartmentById = async (req, res) => {
    try {
        const department = await departmentModel.findById(req.params.id);

        if (!department) {
            return res.status(404).json({
                status: 'fail',
                message: 'Department not found'
            });
        }

        res.status(200).json({
            status: 'success',
            data: department
        });

    }catch(error){
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}

exports.addAreasToDepartment = async (req, res) => {
    try {
        const department = await departmentModel.findById(req.params.id);

        if (!department) {
            return res.status(404).json({
                status: 'fail',
                message: 'Department not found'
            });
        }

        const { areas } = req.body;

        department.areas.push(...areas);
        await department.save();

        res.status(200).json({
            status: 'success',
        });

    }catch(error){
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}

exports.getMyBuildings = async (req, res) => {
    try {
        const user = await userModel.findById(req.query.id);

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        const departments = await departmentModel.find({ inCharge: user._id });

        if (!departments) {
            return res.status(404).json({
                status: 'fail',
                message: 'Department not found'
            });
        }

        res.status(200).json({
            status: 'success',
            departments
        });

        
    }catch(error){
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}