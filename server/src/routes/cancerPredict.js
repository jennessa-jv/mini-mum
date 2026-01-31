import express from "express";
import multer from "multer";
import axios from "axios";
import FormData from "form-data";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    console.log("🔥 HIT cancer-predict route");

    if (!req.file) {
      return res.status(400).json({ error: "NO FILE RECEIVED" });
    }
    const formData = new FormData();
    formData.append("image", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    console.log("📤 Sending image to Python ML API");

    const mlResponse = await axios.post(
      "http://127.0.0.1:5001/predict",
      formData,
      {
        headers: formData.getHeaders(),
        timeout: 20000,
      }
    );

    console.log("✅ ML response:", mlResponse.data);

    res.json(mlResponse.data);
  } catch (error) {
    console.error("❌ Cancer prediction failed:", error.message);
    res.status(500).json({ error: "Cancer prediction failed" });
  }
});

export default router;
