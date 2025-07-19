import React, { useEffect, useState } from "react";
import TextInp from "./Input";

const API_BASE = "https://silver-succotash-g46jgv9qj4jx2pp-5000.app.github.dev/";

const Home = () => {
  const [listArray, setListArray] = useState([]);

  useEffect(() => {
    fetchAnimeList();
  }, []);

  // Fetch all anime items
  const fetchAnimeList = () => {
    fetch(`${API_BASE}/anime_list`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setListArray(data);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  // Add new item
  const addItem = (label) => {
    if (!label.trim()) return;

    fetch(`${API_BASE}/anime_list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ label: label.trim(), done: false }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add item");
        return res.json();
      })
      .then(() => {
        fetchAnimeList();
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
        fetchAnimeList();
      })
      .catch((error) => {
        console.error("Delete error:", error);
      });
  };

  // Clear all items
  const clearAll = () => {
    Promise.all(
      listArray.map((item) =>
        fetch(`${API_BASE}/anime_list/${item.id}`, { method: "DELETE" })
      )
    )
      .then(() => fetchAnimeList())
      .catch((error) => console.error("Clear all error:", error));
  };

  return (
    <div className="text-center">
      <h1>
        <strong>My Anime List</strong>
      </h1>
      <div className="backgroundBox">
        <TextInp onAdd={addItem} />

        <ul>
          {listArray.map((item) => (
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

        <p>{listArray.length} Items</p>

        <button className="btn btn-danger" onClick={clearAll}>
          Clear All
        </button>
      </div>
    </div>
  );
};

export default Home;