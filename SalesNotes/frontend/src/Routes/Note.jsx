import { useEffect, useState, useCallback } from "react";
import "../Styles/Note.css";
import IconDelete from "../Icons/IconDelet";

export default function Note() {
  const [quantityItems, setQuantityItems] = useState("");
  const [description, setDescription] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [notes, setNotes] = useState([]);
  const [subtotalPrice, setSubtotalPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0); // Nuevo estado para el total
  const id = JSON.parse(localStorage.getItem("idNote"));

  const loadProducts = useCallback(async () => {
    try {
      const res = await fetch(`http://localhost:3000/getAllNote/${id}`);
      const data = await res.json();
      setNotes(data);
    } catch (error) {
      console.error("Error loading products:", error);
    }
  },[id]);

  const newProduct = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/newNote/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quantity_items: quantityItems,
          description: description,
          unit_price: unitPrice,
          subtotal_price: subtotalPrice,
        }),
      });

      if (res.ok) {
        setQuantityItems("");
        setDescription("");
        setUnitPrice("");
        loadProducts();
      }
    } catch (error) {
      console.error("Error creating new product:", error);
    }
  };

  const deleteNote = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/deleteNote/${id}`, {
        method: 'DELETE'
      });
      if (res.ok){
        loadProducts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  
  useEffect(() => {
    setSubtotalPrice(quantityItems * unitPrice);
  }, [quantityItems, unitPrice]);

  useEffect(() => {
    const total = notes.reduce((sum, note) => {
      const price = parseFloat(note.subtotal_price);
      return sum + (isNaN(price) ? 0 : price);
    }, 0);
    setTotalPrice(total);
  }, [notes]);

  return (
    <div className="note-card">
      <div className="newProduct">
        <form onSubmit={newProduct}>
          <table className="table">
            <thead>
              <tr>
                <th>Cantidad</th>
                <th>Descripcion</th>
                <th>Precio unitario</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    value={quantityItems}
                    onChange={(e) =>
                      setQuantityItems(Math.max(0, Number(e.target.value)))
                    }
                    required
                    placeholder="Cantidad"
                    type="number"
                    min="0"
                  />
                </td>
                <td>
                  <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder="Descripcion"
                    type="text"
                  />
                </td>
                <td>
                  <input
                    value={unitPrice}
                    onChange={(e) =>
                      setUnitPrice(Math.max(0, Number(e.target.value)))
                    }
                    required
                    placeholder="Precio Unitario"
                    type="number"
                    min="0"
                  />
                </td>
                <td>
                  <button type="submit">Crear</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      <div className="description"  >
        <div>Cantidad</div>
        <div>Descripcion</div>
        <div>Precio por unidad</div>
        <div>Subtotal</div>
        <div></div>
      </div>
      {notes.length > 0 && (
        <div>
          {notes.map((note) => (
            <div key={note.id} className="noteList">
              <div>{note.quantity_items}</div>
              <div>{note.description}</div>
              <div>{note.unit_price}</div>
              <div>{note.subtotal_price}</div>
              <button onClick={() => deleteNote(note.id)} >
                <IconDelete width={"20px"} height={"20px"} />
              </button>
            </div>
          ))}
          <div className="totalPrice">
            <strong>Total: {totalPrice}</strong>
          </div>
        </div>
      )}
    </div>
  );
}
