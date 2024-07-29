const router = require("express").Router();
const userRoutes = require("./userRoutes");
const logRoutes = require("./logRoutes");

router.use("/users", userRoutes);
router.use("/logs", logRoutes);

module.exports = router;
