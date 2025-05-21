// backend/controllers/homeContentController.js
const HomeContent = require("../models/homeContentModel");

exports.getHomeContent = async (req, res) => {
  try {
    const content = await HomeContent.findOne();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: "Gabim gjatë marrjes së përmbajtjes" });
  }
};

exports.updateHomeContent = async (req, res) => {
  try {
    const { headline, imageUrls } = req.body;

    let content = await HomeContent.findOne();
    if (!content) {
      content = new HomeContent({ headline, imageUrls });
    } else {
      content.headline = headline;
      content.imageUrls = imageUrls;
    }

    await content.save();
    res.json(content);
  } catch (err) {
    console.error("Gabim në përditësim:", err.message);
    res.status(500).json({ message: "Gabim gjatë përditësimit të përmbajtjes", error: err.message });
  }
};
