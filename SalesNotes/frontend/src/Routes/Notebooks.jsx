import { useCallback, useEffect, useState } from "react";
import "../Styles/Notebooks.css";
import IconNotes from "../Icons/IconNotes";
import SimplePopover from "../components/SimplePopover";
import Alerts from "../components/Alerts";
import IconDelete from "../Icons/IconDelet";
import { Link } from "react-router-dom";

export default function Notes() {
  const idClient = JSON.parse(localStorage.getItem("idClient"));
  const [name, setName] = useState("");
  const [created_date, setCreated_date] = useState("");
  const [alert, setAlert] = useState({ description: "", status: "" });
  const [notebooksData, setNotebooksData] = useState(
    JSON.parse(localStorage.getItem("notebooksClients")) || []
  );

  const loadNotebooks = useCallback(async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/getAllNotebook/${idClient}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch clients");
      }
      const data = await res.json();
      setNotebooksData(data);
      localStorage.setItem("notebooksClients", JSON.stringify(data));
    } catch (error) {
      console.error(error);
      setAlert({ description: "Error", status: "alert-error" });
      resetAlert();
    }
  },[]); 

  const newNotebook = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/newNotebook/${idClient}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, created_date }),
      });
      if (res.ok) {
        const data = await res.json();
        setNotebooksData([...notebooksData, data]);
        localStorage.setItem(
          "notebooksClients",
          JSON.stringify([...notebooksData, data])
        );
        setName("");
        setCreated_date("");
        setAlert({
          description: "Nota creada exitosamente",
          status: "alert-success",
        });
        resetAlert();
      } else {
        setAlert({ description: "Error", status: "alert-error" });
        resetAlert();
        throw new Error("Error");
      }
    } catch (error) {
      console.error(error);
      setAlert({
        description: "Error creating notebook",
        status: "alert-error",
      });
    }
  };

  const deleteNotebook = async (id) => {
    try {
      const del = await fetch(`http://localhost:3000/deleteAllNotes/${id}`, {
        method: "DELETE",
      });
      if (del.ok) {
        const res = await fetch(`http://localhost:3000/deleteNotebook/${id}`, {
          method: "DELETE",
        });
        if (res.ok) {
          const updatedNotebooks = notebooksData.filter(
            (notebook) => notebook.id !== id
          );
          setNotebooksData(updatedNotebooks);
          localStorage.setItem(
            "notebooksClients",
            JSON.stringify(updatedNotebooks)
          );
          setAlert({
            description: "Nota eliminada exitosamente",
            status: "alert-success",
          });
          resetAlert();
        }
      } else {
        setAlert({ description: "Error", status: "alert-error" });
        resetAlert();
      }
    } catch (error) {
      console.error(error);
      setAlert({ description: "Error", status: "alert-error" });
      resetAlert();
    }
  };

  useEffect(() => {
    loadNotebooks();
  }, [loadNotebooks]);

  const handleNote = (id) => {
    localStorage.setItem("idNote", JSON.stringify(id));
  };

  const resetAlert = () => {
    setTimeout(() => {
      setAlert({ description: "", status: "" });
    }, 500);
  };

  const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <div className="notas-card">
      {alert.description && (
        <Alerts
          description={alert.description}
          status={alert.status}
          resetAlert={resetAlert}
        />
      )}
      <div className="iconplus">
        <h3>Notas</h3>
        <SimplePopover>
          <div className="newNotbook">
            <form onSubmit={newNotebook}>
              <p>Nueva nota</p>
              <input
                required
                value={name}
                onChange={(e) => setName(capitalizeFirstLetter(e.target.value))}
                placeholder="Nombre"
                type="text"
              />
              <input
                required
                value={created_date}
                onChange={(e) => setCreated_date(e.target.value)}
                type="date"
              />
              <button type="submit">Crear</button>
            </form>
          </div>
        </SimplePopover>
      </div>
      <div className="notas">
        {notebooksData &&
          notebooksData.map((notebook) => (
            <div key={notebook.id} className="notebooks">
              <p>{notebook.name}</p>
              <div className="date">
                
              <p>
                  {new Date(notebook.created_date).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </p>
                <button
                  onClick={() => deleteNotebook(notebook.id)}
                  className="delete"
                >
                  <IconDelete width={"20px"} height={"20px"} />
                </button>
                <button onClick={() => handleNote(notebook.id)}>
                  <Link to={"/note"}>
                    <IconNotes width={"20px"} height={"20px"} color={"black"} />
                  </Link>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
