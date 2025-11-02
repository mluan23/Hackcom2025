// const userService = require('../services/userService');
import supabase from '../app.js'

import multer from 'multer'

const upload = multer({storage: multer.memoryStorage()})


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

export const addListing = [
    upload.single('file'),
    async (req, res) => {
        try {
            const {title, description, price} = req.body
            const file = req.file

            if (!file) {
                return res.status(400).json({error: 'File is required'})
            }

            // upload file to supabase storage
            const filepath = `${Date.now()}_${file.originalname}`
            const {data: uploadData, error: uploadError} = await supabase.storage
            .from('listings_photos')
            .upload(filepath, file.buffer, {
                contentType: file.mimetype,
            })

            if (uploadError) {
                console.error(uploadError)
                return res.status(500).json({ error: uploadError.message })
            }

            // get the public url of uploaded file
            const {data:urlData} = supabase.storage.from('listings_photos').getPublicUrl(filepath)

            const image_link = urlData.publicUrl

            // insert listing into database with image link 
            const { data: listingData, error:dbError } = await supabase.from('listings')
            .insert({ title, image_link, description, price }).select()

            if (dbError) {
                console.error(dbError)
                return res.status(500).json({ error: dbError.message })
            }

            res.status(201).json({message: 'listing created', listing: listingData})
        }
        catch (err) {
            console.error(err)
            res.status(500).json({ error: "internal server error"})
        }
    }
]


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