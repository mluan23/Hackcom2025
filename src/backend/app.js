import express from "express";
import cors from "cors";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const app = express()
const port = 3000

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

app.listen(port, () => {
    console.log('server started')
})