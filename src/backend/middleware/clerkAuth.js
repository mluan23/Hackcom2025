import { Clerk } from '@clerk/clerk-sdk-node';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env' }); // Make sure it finds your .env

const clerk = new Clerk({ secretKey: process.env.CLERK_SECRET_KEY });

export const clerkAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No authorization header' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Invalid auth header' });
  }

  try {
    // Verify the token using Clerk
    const payload = await clerk.sessions.verifyToken(token);
    
    // Attach the user's ID to the request object
    req.auth = { userId: payload.sub };
    
    // Continue to the controller
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: 'Invalid token' });
  }
};