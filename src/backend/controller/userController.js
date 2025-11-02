// import userService from '../services/userService.js';
import supabase from '../app.js'


export async function getAllUsers(req, res) {
    const {data, error} = await supabase.from('users').select('*')
    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
    res.json(data)
}

export async function getSpecificUser(req, res) {
    const id = req.params.id
    const {data, error} = await supabase.from('users').select('*').eq('id', id).single()
    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }

    res.json(data)
}

export async function addUser(req, res) {
    const { first_name, last_name, email, password } = req.body
    const { data, error } = await supabase.from('users')
    .insert({ first_name, last_name, email, password }) 

    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    } 

    res.status(201).json(data);
}

export default {
    getAllUsers,
    getSpecificUser,
    addUser
}