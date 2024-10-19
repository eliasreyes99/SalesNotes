import React, { useState, useEffect, useCallback } from "react";
import "../Styles/Clients.css";
import { Link } from "react-router-dom";
import IconDelete from "../Icons/IconDelet";
import SimplePopover from "./SimplePopover";
import Alerts from "./Alerts";
import IconNotebooks from "../Icons/IconNotebooks";
import IconEdit from "../Icons/IconEdit";

export default function Clients() {
  const [alert, setAlert] = useState({ description: "", status: "" });
  const [ nameClient, setNameClient ] = useState('');
  const userData = JSON.parse(localStorage.getItem("user"));
  const [clientData, setClientData] = useState(
    JSON.parse(localStorage.getItem("clients")) || []
  );

  const loadClients = useCallback(async () => {
    if (!userData) return;
    try {
      const res = await fetch(
        `http://localhost:3000/getAllClient/${userData[0].id}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch clients");
      }
      const data = await res.json();
      setClientData(data);
      localStorage.setItem("clients", JSON.stringify(data));
    } catch (error) {
      console.error(error);
    }
  }, [userData]);

  const deleteClient = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/deleteClient/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("Failed to delete client");
      }
      const updatedClients = clientData.filter((client) => client.id !== id);
      setClientData(updatedClients);
      localStorage.setItem("clients", JSON.stringify(updatedClients));
      setAlert({description:'Delete successful', status:'alert-success'})
      resetAlert();
    } catch (error) {
      setAlert({description:'El Cliente que desea eliminar contiene notas', status:'alert-error'});
      resetAlert();
      console.error(error);
    }
  };
  const newClient = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(
        `http://localhost:3000/newClient/${userData[0].id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: nameClient }),
        }
      );
      if (res.ok) {
        setAlert({
          description: "Register succesful",
          status: "alert-success",
        });
        const addedClient = await res.json();
        setNameClient('');
        setTimeout(() => {
          const updateClients = [...clientData, addedClient];
          setClientData(updateClients);
          localStorage.setItem("clients", JSON.stringify(updateClients));
          resetAlert();
        }, 500);
      } else {
        setAlert({
          description: "Error en la creación del cliente",
          status: "alert-danger",
        });
        resetAlert();
      }
    } catch (error) {
      console.error(error);
      setAlert({
        description: "Error en la creación del cliente",
        status: "alert-error",
      });
      resetAlert();
    }
  };

  const handleDelete = (id) => {
    deleteClient(id);
  };
  const handleNote = (id) => {
    localStorage.setItem("idClient", JSON.stringify(id));
  };

  useEffect(() => {
    loadClients();
  }, [loadClients]);

  const capitalizeFirstLetter = (str) => {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };
  const resetAlert = () =>{
    setTimeout(() => {
      setAlert({description:'', status:''});

    },1000);
  };

  return (
    <div className="clients-card">
      
      {alert.description && (
        <Alerts
          description={alert.description}
          status={alert.status}
          resetAlert={resetAlert}
        />
      )}
      <div className="iconplus">
        <h3>Clientes</h3>
        <SimplePopover>
          <div className="newClient">
            <form onSubmit={newClient} >
            <p>Nuevo cliente</p>
            <input required type="text" placeholder="Nombre" value={nameClient} onChange={(e) => setNameClient(capitalizeFirstLetter(e.target.value))} />
            <button type="submit">Crear</button>
         </form>
          </div>
          
        </SimplePopover>
      </div>

      {clientData.map((client) => (
        <div key={client.id} className="clients">
          <p>{client.name}</p>
          <div>
            
          <button>
              <IconEdit color="black" width={20} height={20} />
            </button>
            <button className="delete" onClick={() => handleDelete(client.id)}>
              <IconDelete
                className="delete"
                color="black"
                width={20}
                height={20}
              />
            </button>
            
            <button onClick={() => handleNote(client.id)}>
              <Link to={"/notebooks"}>
              <IconNotebooks color="black" width={20} height={20} />
              </Link>
            </button>
          </div>
        </div>
      ))}

    </div>
  );
}
