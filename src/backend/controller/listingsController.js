// const userService = require('../services/userService');

export async function getAllListings(req, res) {
    const {data, error} = await supabase.from('listings').select('*')
    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
    res.json(data)
}

export async function deleteListing(req, res) {
    const {data, error} = await supabase.from('listings').delete().eq('id', req.params.id)
    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
    res.json({ message: 'Listing deleted successfully' });
}

export async function addListing(req, res) {
    const { title, description, price } = req.body
    const { data, error } = await supabase.from('listings')
    .insert({ title, description, price })
    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
    res.status(201).json(data);
}


export default {
    getAllListings,
    deleteListing,
    addListing
}
