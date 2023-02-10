const express = require("express");
const multer = require("multer");
const { upload, list } = require("../controllers/controller");

const router = express.Router();

// Config Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./_temp");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const uploadFile = multer({ storage: storage });

router.post("/upload", uploadFile.single("file"), upload);
router.get("/records", list);

module.exports = router;
