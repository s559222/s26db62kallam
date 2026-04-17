var express = require('express');
const costume_controller = require('../controllers/costume');
var router = express.Router();

const secured = (req, res, next) => {
  if (req.user) {
    return next();
  }
  res.redirect('/login');
};

/* GET costumes */
router.get('/', costume_controller.costume_view_all_Page);

/* GET detail costume page */
router.get('/detail', costume_controller.costume_view_one_Page);

/* GET create costume page */
router.get('/create', costume_controller.costume_create_Page);

/* GET update costume page */
router.get('/update', secured, costume_controller.costume_update_Page);

/* GET delete costume page */
router.get('/delete', costume_controller.costume_delete_Page);

module.exports = router;