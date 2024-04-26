const mongoose = require("mongoose");
const Chatroom = require("../models/Chatroom");
const jwt = require('jsonwebtoken');

exports.createChatroom = async (req, res) => {
    const { name } = req.body;
    const chatroomRegex = /^[A-Za-z\s]+$/;

    if (!chatroomRegex.test(name)) {
        throw new Error("Chatroom can only contain letters and spaces!");
    }

    const chatroomExists = await Chatroom.findOne({ name });

    if (chatroomExists) {
        throw new Error("Chatroom with the name already exists!");
    }

    const chatroom = new Chatroom({
        name
    });

    try {
        await chatroom.save();
        res.json({
            message: "New Chatroom " + name + " created successfully!"
        });
    } catch (error) {
        console.error("Error creating chatroom:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};