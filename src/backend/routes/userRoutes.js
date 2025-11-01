import { Router } from 'express';
const router = Router();

import userController from '../controller/userController.js';

// users
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getSpecificUser);
router.post('/users', userController.addUser);

// listings


export default router;