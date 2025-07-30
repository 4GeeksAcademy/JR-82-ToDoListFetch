import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TextInp from "./Input";
import berserk from "../../img/berserk.png"; // Ensure the path is correct based on your project structure
import broly from "../../img/broly.webp"; // Ensure the path is correct based on your project structure

const API_BASE = "https://silver-succotash-g46jgv9qj4jx2pp-5000.app.github.dev";

const Movies = () => {
  const [movieList, setMovieList] = useState([]);

  useEffect(() => {
    // You can add a specific endpoint for movie anime or filter the existing list
    fetchMovieList();
  }, []);

  const fetchMovieList = () => {
    // Fetch only movie category anime
    fetch(`${API_BASE}/anime_list?category=movie`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setMovieList(data);
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
      body: JSON.stringify({ label: label.trim(), done: false, category: "movie" }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to add item");
        return res.json();
      })
      .then(() => {
        fetchMovieList();
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
        fetchMovieList();
      })
      .catch((error) => {
        console.error("Delete error:", error);
      });
  };

  return (
    <div className="text-center">
      <h1>
        <strong>Movie Anime List</strong>
      </h1>
      <img src={berserk} alt="Berserk" id="berserk" />
      <img src={broly} alt="Broly" id="broly" />
      <div className="backgroundBox">
        <p><strong>{movieList.length} Movie Anime</strong></p>
        <p><Link to="/">
          <button>
            <strong>
              Back to Main List
            </strong>
          </button>
        </Link>
        </p>
        <TextInp onAdd={addItem} />
        
        <ul>
          {movieList.map((item) => (
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

export default Movies;
