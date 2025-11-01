import { Router } from 'express';
const router = Router();

const userController = require('../controllers/userController');

// users
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getSpecificUser);
router.post('/users', userController.addUser);

// listings
router.get('/users/:id/listings', userController.getUserListings);
router.post('/listing', userController.addListing);


module.exports = router;