
const { query } = require('express');
const pool = require('../db');

const newClient = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    try {
        const newclient = await pool.query(
            'INSERT INTO clients (name, user_id) VALUES ($1, $2) RETURNING *',
            [name, id]
        );

        res.status(201).json(newclient.rows[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAllClient = async (req, res) => {
    const { id } = req.params;
    try {
        const getAllClient = await pool.query('SELECT * FROM clients WHERE user_id = $1', [id]);
        res.json(getAllClient.rows);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

};

const getClient = async (req, res) => {
    const { id } = req.params;

    try {
        const getClient = await pool.query('SELECT * FROM clients WHERE id = $1',[id])
        if( getClient.rows.length === 0){
            return res.status(404).json({ mesagge: "Client not find"});
        }
        res.json(getClient.rows);

    } catch (error) {
        return res.status(500).json({ mesagge: error.mesagge })
    }
};

const deleteClient = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteNotebooks = await pool.query('DELETE FROM notebooks WHERE client_id = $1 RETURNING *',[id]);
        const deleteClientResult = await pool.query('DELETE FROM clients WHERE id = $1 RETURNING *', [id]);
        
        if(deleteClientResult.rows.length === 0 || deleteNotebooks.rows.length === 0){
            return res.status(404).json({ message: "Client not Found"});
        }
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


const updateClient = async (req, res) => {
    const {id } = req.params;
    const { name } = req.body;

    try{
        const updateClient = await pool.query('UPDATE clients SET name = $1 WHERE id = $2 RETURNING*', [name, id]);
        if( updateClient.rows.length === 0){
            res.status(404).json({ message: "Client not found" });
        }
        res.json(updateClient.rows);

    }catch(error){
        return res.status(500).json({ message: error.message });
    }
};

module.exports = {
    newClient,
    getAllClient,
    getClient,
    deleteClient,
    updateClient
};
