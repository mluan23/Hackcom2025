import { Router } from 'express';
const router = Router();

import userController from '../controller/userController.js';
import listingController from '../controller/listingController.js'; 

// users
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getSpecificUser);
router.post('/users', userController.addUser);

// listings
router.get('/listings', listingController.getAllListings);
router.post('/listings', listingController.addListing);
router.delete('/listings/:id', listingController.deleteListing);


export default router;