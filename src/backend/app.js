const app = express();
const port = 3000
import express from "express";
import dotenv from "dotenv";
dotenv.config();


// we are telling express to use our userRoutes for any requests
import userRoutes from './routes/userRoutes.js';

app.use(express.json());
app.use('/', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server running on port ${PORT}');
});