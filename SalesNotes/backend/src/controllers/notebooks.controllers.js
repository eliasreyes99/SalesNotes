const { query } = require('express');
const pool = require('../db');

const newNotebook = async (req, res) => {
    const { id } = req.params;
    const { name, created_date } = req.body;
    try {
        const client = await pool.query('SELECT * FROM clients WHERE id = $1', [id]);
        if (client.rows.length === 0) {
            return res.status(404).json({ message: "Client not found" });
        }
        const newNotebook = await pool.query(
            'INSERT INTO notebooks (name, client_id, created_date) VALUES ($1, $2, $3) RETURNING *',
            [name, id, created_date]
        );
        return res.status(201).json(newNotebook.rows[0]);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getAllNotebook = async (req, res) => {
    const { id } = req.params;
    try {
        const client = await pool.query('SELECT * FROM clients WHERE id = $1', [id]);
        if (client.rows.length === 0) {
            return res.status(404).json({ message: "Client not found" });
        }
        const getAllNotebook = await pool.query('SELECT * FROM notebooks WHERE client_id = $1', [id]);
        return res.status(200).json(getAllNotebook.rows);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const getNotebook = async (req, res) => {
    const { id } = req.params;

    try {
        const getNote = await pool.query('SELECT * FROM notebooks WHERE id = $1', [id]);
        if (getNote.rows.length === 0) {
            return res.status(404).json({ message: "Notebook not found" });
        }
        return res.status(200).json(getNote.rows[0]);

    } catch (error) {
        return res.status(500).json({ massage: error.message })
    }
};

const updateNotebook = async (req, res) => {
    const { id } = req.params;
    const { name, total_price, created_date } = req.body;

    try {
        const updateNotebook = await pool.query(
            'UPDATE notebooks SET name = $1, total_price = $2, created_date = $3 WHERE id = $4',
            [name, total_price, created_date, id]
        );
        
        if (updateNotebook.rowCount === 0) {
            return res.status(404).json({ message: "Notebook not found" });
        }
        res.status(200).json({ message: "Notebook updated successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


const deleteNotebook = async (req, res) => {
    const { id } = req.params;

    try {
        const res = await pool.query('DELETE from notebooks WHERE id = $1 RETURNING *', [id]);
        return res.status(202).json({ message: "Successfully deleted notebook"});
    } catch (error) {
        return res.status(500).json({ message: error.message });
        
    }
};

module.exports = {
    newNotebook,
    getAllNotebook,
    getNotebook,
    updateNotebook,
    deleteNotebook
};