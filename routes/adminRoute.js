const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const verifyAdmin = require("../middlewares/verifyAdmin");
const {
  getPendingAnnonces,
  approveAnnonce,
  rejectAnnonce,
} = require("../controllers/adminController");

router.get("/pending", verifyToken, verifyAdmin, getPendingAnnonces);
router.post("/approve/:id", verifyToken, verifyAdmin, approveAnnonce);
router.post("/reject/:id", verifyToken, verifyAdmin, rejectAnnonce);

module.exports = router;
