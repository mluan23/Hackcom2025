import { Router } from 'express';
const router = Router();

import userController from '../controller/userController.js';
import listingsController from '../controller/listingsController.js';
import audioController from '../controller/generateRecipe.js';
// import { generateAudio } from '../generateRecipe.js';
// users
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getSpecificUser);
router.post('/users', userController.addUser);

// listings
router.get('/listings', listingsController.getAllListings);
router.get('/listings/:id', listingsController.getSpecificListing);
router.post('/listings', listingsController.addListing);
router.delete('/listings/:id', listingsController.deleteListing);

// for the ai stuff
router.get('/speak', audioController.audioGen);
// router.post('/generate-audio', generateAudio);

export default router;
