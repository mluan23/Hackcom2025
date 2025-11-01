const userService = require('../services/userService');

exports.getAllUsers = async (req, res) => {
    const {data, error} = await supabase.from('users').select('*')
    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
    res.json(data)
}

exports.getSpecificUser = async (req, res) => {
    const id = req.params.id
    const {data, error} = await supabase.from('users').select('*').eq('id', id).single()
    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }

    res.json(data)
}

exports.addUser = async (req, res) => {
    const { username, email } = req.body
    const { data, error } = await supabase.from('users')
    .insert({ username, email }) 

    if (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    } 

    res.status(201).json(data);
}