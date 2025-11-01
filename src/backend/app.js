import express from "express";
import cors from "cors";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const app = express()
const port = 3000

// optional local uploads (if you use Cloudinary, skip this part)
const upload = multer({ dest: "uploads/" });

// Endpoint to upload photo metadata
app.post("/api/photos", async (req, res) => {
  try {
    const { imageUrl, caption } = req.body;
    const { data, error } = await supabase
      .from("photos")
      .insert([{ image_url: imageUrl, caption }])
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save photo" });
  }
});

// Get all photos
app.get("/api/photos", async (req, res) => {
  const { data, error } = await supabase
    .from("photos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});


app.use(express.json()) // allow for JSON

let users = [
    { id: 1, name: 'Alice'}
]

// root
app.get('/', (req, res) => {
    res.send('test')
})

// get all users
app.get('/users', (req, res) => {
    res.json(users)
})

// array of posts -> name + image link + description + id
// adding new user, user o
app.post('/users', (req, res) => {
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email
    };
    users.push(newUser);
    res.status(201).json(newUser);
})

app.listen(process.env.PORT, () =>
  console.log('testing')
);