const pool = require("../db");

const newNote = async (req, res) => {

  try {
    
  const { id } = req.params;
  const { quantity_items, description, unit_price, subtotal_price } = req.body;
    const notebook = await pool.query('SELECT * FROM notebooks WHERE id = $1',[id]);
    
    if (notebook.rows.length === 0 ) {
      return res.status(404).json({ message: "Notebook not found" });
    }

    const newNote = await pool.query(
      "INSERT INTO notes (quantity_items, description, unit_price, subtotal_price, notebook_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [quantity_items, description, unit_price, subtotal_price, id]
    );

    return res.json(newNote.rows[0]);
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getallnotes = async (req, res) => {
  const { id } = req.params
  try {
    const result = await pool.query('SELECT * FROM notebooks WHERE id = $1', [id]);
    if (result.rows.length === 0){
      return res.json({ message: "Not found" });
    }
    const gellAllnotes = await pool.query('SELECT * FROM notes WHERE notebook_id = $1', [id]);
    return res.json(gellAllnotes.rows);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getNote = async (req, res) => {
  const { id } = req.params;

  try {
    const note = await pool.query("SELECT * FROM notes WHERE id = $1", [id]);
    
    if (note.rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.json(note.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteNote = await pool.query("DELETE FROM notes WHERE id = $1 RETURNING *", [id]);
    
    if (deleteNote.rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.json({ message: "Note deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateNote = async (req, res) => {
  const { id } = req.params;
  const { quantity_items, description, unit_price, subtotal_price, notebook_id } = req.body;

  try {
    const result = await pool.query(
      "UPDATE notes SET quantity_items = $1, description = $2, unit_price = $3, subtotal_price = $4, notebook_id = $5 WHERE id = $6 RETURNING *",
      [quantity_items, description, unit_price, subtotal_price, notebook_id, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Note not found" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAllNotes = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteAll = await pool.query('DELETE FROM notes WHERE notebook_id = $1 RETURNING *',[id]);
    if (deleteAll.rows.length === 0 ){
      return res.json({message: 'Not found'});
    }
  } catch (error) {
    return res.json({message: error});
  }
};

module.exports = {
  newNote,
  getallnotes,
  getNote,
  deleteNote,
  updateNote,
  deleteAllNotes
};
