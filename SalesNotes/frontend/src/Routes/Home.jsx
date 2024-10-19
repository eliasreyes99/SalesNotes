import React, { useEffect, useState } from "react";
import "../Styles/Home.css";
import IconPlus from "../Icons/IconPlus";
import Navbar from "../components/Navbar";
import Clients from "../components/Clients";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const userData = JSON.parse(localStorage.getItem("user"));

  const loadUser = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/user/` + userData[0].id
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user");
      }
      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  if (isLoading) {
    return <div className="Loading">Loading...</div>;
  }
  return (
    <div className="home">
      <Clients/>
    </div>
  );
}
