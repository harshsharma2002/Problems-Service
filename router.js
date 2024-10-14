const express = require("express");
const router = express.Router();

const problems = require("./routers/problems.router");

router.use("/problems", problems);

module.exports = router;