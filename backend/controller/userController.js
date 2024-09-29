const express = require("express");
const userModel = require("../models/userModel");

exports.getUserInfoById = async (req, res) => {
    try {
        const { id } = req.body;

        const user
            = await userModel.findById(id).select('-password');

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            });
        }

        res.status(200).json({
            status: 'success',
            user
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: error.message
        });
    }
}