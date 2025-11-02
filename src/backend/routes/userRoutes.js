import { Router } from 'express';
const router = Router();

import userController from '../controller/userController.js';
import listingsController from '../controller/listingsController.js';
import audioController from '../controller/generateRecipe.js';
import multer from 'multer'
import agentController from '../controller/agentController.js';

const upload = multer({storage: multer.memoryStorage()})
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
router.put('/listings/:id', listingsController.updateListing);

// for the ai stuff
router.get('/speak', audioController.audioGen);

router.post('/generate', upload.single('file'), async (req, res) => {
  const prompt = req.body.prompt;
  const file = req.file;

  if (!prompt || !file) {
    return res.status(400).json({ error: 'Missing prompt or file' });
  }

  const contents = [
    {
      role: "user",
      parts: [
        { text: prompt },
        {
          inlineData: {
            mimeType: file.mimetype,
            data: file.buffer.toString('base64'),
          },
        },
      ],
    },
  ];

  try {
    const result = await audioController.generateText(contents);
    res.json({ text: result });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ error: "Failed to generate description" });
  }
});

router.post('/createAgent', agentController.createAgent);
router.post('/generate_s', audioController.generateText2)

// router.post('/generate-audio', generateAudio);

export default router;
