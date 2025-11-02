// const userService = require('../services/userService');
import supabase from '../app.js'


export async function getAllListings(req, res) {
    const {data, error} = await supabase.from('listings').select('*')
    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message});
    }
    res.json(data)
}

export async function getSpecificListing(req, res) {
    const id = req.params.id
    const {data, error} = await supabase.from('listings').select('*').eq('id', id).single()
    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }

    res.json(data)
}

export async function addListing(req, res) {
    const { title, image_link, description, price, location } = req.body
    const { data, error } = await supabase.from('listings').insert({ title, image_link, description, price, location })

    if (error) {
        console.error(error);
        return res.status(500).json({error: error.message });
    }

    res.status(201).json(data)
}

export async function deleteListing(req, res) {
    const id = req.params.id 
    const {data, error} = await supabase.from('listings').delete('*').eq('id', id).single()
    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }

    res.json(data)
}

export default {
    getAllListings,
    getSpecificListing,
    addListing,
    deleteListing
}