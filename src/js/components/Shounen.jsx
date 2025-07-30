import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TextInp from "./Input";
import Goku from "../../img/Goku.png"; // Ensure the path is correct based on your project structure
import Ichigo from "../../img/Ichigo.webp"; // Ensure the path is correct based on your project structure

const API_BASE = "https://silver-succotash-g46jgv9qj4jx2pp-5000.app.github.dev";

const Shounen = () => {
  const [shounenList, setShounenList] = useState([]);

  useEffect(() => {
    // You can add a specific endpoint for shounen anime or filter the existing list
    fetchShounenList();
  }, []);

  const fetchShounenList = () => {
    // Fetch only shounen category anime
    fetch(`${API_BASE}/anime_list?category=shounen`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setShounenList(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  // Add new shounen item
  const addItem = (label) => {
    if (!label.trim()) return;

    fetch(`${API_BASE}/anime_list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ label: label.trim(), done: false, category: "shounen" }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add item");
        return res.json();
      })
      .then(() => {
        fetchShounenList();
      })
      .catch((error) => {
        console.error("Add error:", error);
      });
  };

  // Remove item by ID
  const removeItem = (id) => {
    fetch(`${API_BASE}/anime_list/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to delete item");
        fetchShounenList();
      })
      .catch((error) => {
        console.error("Delete error:", error);
      });
  };

  return (
    <div className="text-center">
      <h1>
        <strong>Shounen Anime List</strong>
      </h1>
      <img src={Goku} alt="Goku" id="Goku" />
      <img src={Ichigo} alt="Ichigo" id="Ichigo" />
      <div className="backgroundBox">
        <p><strong>{shounenList.length} Shounen Anime</strong></p>
        <p>
          <Link to="/">
            <button>
              <strong>
                Back to Main List
              </strong>
            </button>
          </Link>
        </p>
        <TextInp onAdd={addItem} />
        
        <ul>
          {shounenList.map((item) => (
            <li key={item.id} className="todo-item">
              {item.label}
              <span
                className="delete-btn"
                onClick={() => removeItem(item.id)}
                title="Delete"
                style={{ cursor: "pointer", marginLeft: "10px" }}
              >
                ❌
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Shounen;
