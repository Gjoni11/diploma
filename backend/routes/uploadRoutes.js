const express = require("express");
const router = express.Router();
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const streamifier = require("streamifier");

cloudinary.config({
  cloud_name: "ddwotwq0a", // zëvendësoje nëse ndryshon
  api_key: "667428429697277",
  api_secret: "sxnK5A25R-wMr-MkhxzgDy4GigA",
});

const upload = multer();

router.post("/images", upload.array("images"), async (req, res) => {
  try {
    const urls = [];

    for (const file of req.files) {
      const stream = cloudinary.uploader.upload_stream(
        { folder: "dress_rental" },
        (error, result) => {
          if (error) throw error;
          urls.push(result.secure_url);
          if (urls.length === req.files.length) {
            return res.status(200).json({ images: urls });
          }
        }
      );

      streamifier.createReadStream(file.buffer).pipe(stream);
    }
  } catch (err) {
    console.error("Gabim gjatë upload-it:", err);
    res.status(500).json({ message: "Gabim gjatë ngarkimit të fotove" });
  }
});

module.exports = router;
