var express = require('express');
const costume_controllers = require('../controllers/costume');
var router = express.Router();

/* GET costumes page */
router.get('/', costume_controllers.costume_view_all_Page);

module.exports = router;