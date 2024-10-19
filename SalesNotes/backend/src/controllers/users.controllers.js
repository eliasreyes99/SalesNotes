const { query } = require("express");
const pool = require("../db");

const user = async (req, res) => {
  const { id } = req.params;

try {
  const user = await pool.query(
    'SELECT * FROM users WHERE id = $1',
    [id]
  );
  if (user.rows.length === 0) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json(user.rows);
  
} catch (error) {
  return res.status(500).json({ message: error.message });
}
}

const newUser = async (req, res) => {
  const { name, password, company_name } = req.body;
  try {
    const user = await pool.query('SELECT * FROM users WHERE name = $1', [name]);

    if (user.rows.length === 0) {
      const newuser = await pool.query(
        'INSERT INTO users (name, password, company_name) VALUES($1, $2, $3) RETURNING id',
        [name, password, company_name]
      );
      return res.json(newuser.rows);
    } else {
      return res.status(401).json({ message: "El nombre de usuario ya está en uso" });
    }
  } catch (error) {
    console.error('Error en newUser:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

const getUser = async (req, res) => {
  const { name, password } = req.body;

  try {

    const user = await pool.query(
      'SELECT * FROM users WHERE name = $1 AND password = $2',
      [name, password]
    );
    if (user.rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }
    return res.json(user.rows);
    
  } catch (error) {
    res.json(error);
  }
};

module.exports = {
  user,
  newUser,
  getUser
};