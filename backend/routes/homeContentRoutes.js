const express = require("express");
const router = express.Router();

const {
  getHomeContent,
  updateHomeContent
} = require("../controllers/homeContentController");

const auth = require("../middleware/authMiddleware"); // ✅ EMËRIMI I RREGULLT

// Merr përmbajtjen e faqes Home
router.get("/", getHomeContent);

// Përditëso përmbajtjen e faqes Home
router.put("/", updateHomeContent);
 // ✅ middleware si funksion

module.exports = router;
