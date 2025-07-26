import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TextInp from "./Input";

const API_BASE = "https://silver-succotash-g46jgv9qj4jx2pp-5000.app.github.dev";

const Thriller = () => {
  const [thrillerList, setThrillerList] = useState([]);

  useEffect(() => {
    // You can add a specific endpoint for thriller anime or filter the existing list
    fetchThrillerList();
  }, []);

  const fetchThrillerList = () => {
    // Fetch only thriller category anime
    fetch(`${API_BASE}/anime_list?category=thriller`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setThrillerList(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  // Add new thriller item
  const addItem = (label) => {
    if (!label.trim()) return;

    fetch(`${API_BASE}/anime_list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ label: label.trim(), done: false, category: "thriller" }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add item");
        return res.json();
      })
      .then(() => {
        fetchThrillerList();
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
        fetchThrillerList();
      })
      .catch((error) => {
        console.error("Delete error:", error);
      });
  };

  return (
    <div className="text-center">
      <h1>
        <strong>Thriller Anime List</strong>
      </h1>
      <div className="backgroundBox">
        <p><strong>{thrillerList.length} Thriller Anime</strong></p>
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
          {thrillerList.map((item) => (
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

export default Thriller;