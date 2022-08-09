// accountController.js
const express = require("express");

// In server.js, I called app.use('/api', AccountController);
const router = express.Router();

const handler= async (req, res) => {
    res.status(200).json({msg:"Hello World from server"})
}

export default handler