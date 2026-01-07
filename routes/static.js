const express = require("express");
const router = express.Router();

// Privacy Policy page
router.get("/privacy", (req, res) => {
  res.render("static/privacy");
});

// Terms & Conditions page
router.get("/terms", (req, res) => {
  res.render("static/terms");
});

module.exports = router;
