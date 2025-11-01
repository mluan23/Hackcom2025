const app = express()
const port = 3000
import express from "express";
import cors from "cors";
import multer from "multer";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_SERVICE_KEY;


const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// dotenv.config();

app.use(express.json()) // allow for JSON
app.use(cors()) // what is cors


// root
app.get('/', (req, res) => {
    res.send('test')
})

// get all users
app.get('/users', async (req, res) => {
    const {data, error} = await supabase.from('users').select('*')
    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
    res.json(data)
})

// get a specific user
app.get('/users/:id', async (req, res) => {
    const id = req.params.id
    const {data, error} = await supabase.from('users').select('*').eq('id', id).single()
    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }

    res.json(data)
})

// get all listings corresponding to a user
app.get('/users/:id/listings', async (req, res) => {
    const userId = req.params.id
    const {data, error} = await supabase.from('listings').select('*').eq('user_id', userId)
    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
    return res.json(data)
})

// array of posts -> name + image link + description + id
// do not need array of posts

// adding new user, user o
app.post('/users', async (req, res) => {
    const { username, email } = req.body
    const { data, error } = await supabase.from('users')
    .insert({ username, email }) 

    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    } 

    res.status(201).json(data);
})

// add a listing to the table for listings
app.post('/listing', async (req, res) => {
    const { title, image_url, description, creation_time } = req.body
    const {data, error} = await supabase.from('listings')
    .insert({ title, image_url, description, creation_time})

    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
})

app.listen(port, () => {
    console.log('server started')
})