var express = require('express');
const costume_controllers = require('../controllers/costume');
var router = express.Router();

/* GET costumes home page */
router.get('/', costume_controllers.costume_view_all_Page);

/* GET detail costume page */
router.get('/detail', costume_controllers.costume_view_one_Page);

/* GET create costume page */
router.get('/create', costume_controllers.costume_create_Page);

/* GET update costume page */
router.get('/update', costume_controllers.costume_update_Page);

/* GET delete costume page */
router.get('/delete', costume_controllers.costume_delete_Page);

module.exports = router;