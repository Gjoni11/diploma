const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// ✅ Lidhja me databazën
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB u lidh me sukses"))
.catch((err) => console.error("❌ Gabim në lidhjen me MongoDB:", err));

// ✅ Rrugët
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const reservationRoutes = require("./routes/reservationRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const homeContentRoutes = require("./routes/homeContentRoutes"); // ✅ SHTUAR

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/reservations", reservationRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/home", homeContentRoutes); // ✅ SHTUAR

// ✅ Serveri starton
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
