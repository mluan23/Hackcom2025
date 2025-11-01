// const userService = require('../services/userService');


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
    const { text, image_link, description, price } = req.body
    const { data, error } = await supabase.from('listings').insert({ text, image_link, description, price })

    if (error) {
        console.error(error);
        return res.status(500).json({error: error.message });
    }

    res.status(201).json(data)
}

export async function deleteListing(req, res) {
    const id = req.params.id 
    const {data, error} = await supabase.from('listing').select('*').eq('id', id).single()
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