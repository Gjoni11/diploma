const express = require("express");
const router = express.Router();
const {
  getReservations,
  createReservation,
  createClientReservation,
} = require("../controllers/reservationController");
const auth = require("../middleware/authMiddleware");

// ==============================
//        ADMIN ROUTES
// ==============================

// Merr të gjitha rezervimet (vetëm për admin të autentikuar)
router.get("/", auth, getReservations);

// Krijon një rezervim të thjeshtë (vetëm admin)
router.post("/", auth, createReservation);

// ==============================
//       KLIENT ANONIM
// ==============================

// Rezervim nga klient anonim me:
// - emër, email
// - datë rezervimi
// - foto të ID-së për verifikim
// - vërtetim të pagesës (60%)
router.post("/client", createClientReservation);

module.exports = router;
