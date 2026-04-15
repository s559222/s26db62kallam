var express = require('express');
var router = express.Router();

// Require controller modules.
var api_controller = require('../controllers/api');
var costume_controller = require('../controllers/costume');

/// API ROUTE ///
router.get('/', api_controller.api);

/// COSTUME API ROUTES ///
router.post('/costumes', costume_controller.costume_create_post);
router.delete('/costumes/:id', costume_controller.costume_delete);
router.put('/costumes/:id', costume_controller.costume_update_put);
router.get('/costumes/:id', costume_controller.costume_detail);
router.get('/costumes', costume_controller.costume_list);
router.get('/update', costume_controller.costume_update_Page);
router.get('/delete', costume_controller.costume_delete_Page);

module.exports = router;