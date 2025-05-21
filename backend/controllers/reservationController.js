const Reservation = require("../models/reservationModel");
const Product = require("../models/productModel");

// Rezervim nga admin (me autentikim)
exports.createReservation = async (req, res) => {
  try {
    const { productId, date } = req.body;

    if (!productId || !date) {
      return res.status(400).json({ message: "Të dhënat mungojnë." });
    }

    const newReservation = new Reservation({
      product: productId,
      date,
    });

    const saved = await newReservation.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Gabim në krijimin e rezervimit:", err);
    res.status(500).json({ message: "Gabim serveri." });
  }
};

// Merr të gjitha rezervimet (për admin)
exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate("product");
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: "Gabim gjatë marrjes së rezervimeve." });
  }
};

// Rezervim nga klient anonim (me ID dhe pagesë)
exports.createClientReservation = async (req, res) => {
  try {
    const { productId, date, fullName, email, idPhoto, paymentProof } = req.body;

    if (!productId || !date || !fullName || !email || !idPhoto || !paymentProof) {
      return res.status(400).json({ message: "Të gjitha fushat janë të detyrueshme." });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Produkti nuk u gjet." });

    const reservation = new Reservation({
      product: productId,
      date,
      fullName,
      email,
      idPhoto,
      paymentProof,
    });

    await reservation.save();
    res.status(201).json({ message: "Rezervimi u ruajt me sukses." });
  } catch (err) {
    console.error("Gabim në rezervimin e klientit:", err);
    res.status(500).json({ message: "Gabim në server." });
  }
};
