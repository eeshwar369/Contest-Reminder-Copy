const express = require('express');
const router = express.Router();
const contestController = require('../controllers/contest.controller');

router.get('/', contestController.getContests);
router.get('/:userId/subscriptions',contestController.getSubscription);
router.post('/:userId/toggle-subscriptions',contestController.ChangeSubscription);


module.exports = router;
