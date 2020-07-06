const express = require("express");
const router = express.Router();
const watchController = require("../controllers/watches");
router.post('/addwatch',watchController.postAddWatch);
router.get('/watches',watchController.getWatches);
module.exports = router;