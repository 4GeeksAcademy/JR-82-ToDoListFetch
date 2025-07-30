import React, { useEffect, useState, } from "react";
import TextInp from "./Input";
import {Link} from "react-router-dom";
import PowerImage from "../../img/PowerImage.webp"; // Ensure the path is correct based on your project structure
import ZeroTwo from "../../img/ZeroTwo.webp"; // Ensure the path is correct based on your project structure

const API_BASE = "https://silver-succotash-g46jgv9qj4jx2pp-5000.app.github.dev";

const Home = () => {
  const [listArray, setListArray] = useState([]);

  useEffect(() => {
    fetchAnimeList();
  }, []);

  // Fetch all anime items
  const fetchAnimeList = () => {
    fetch(`${API_BASE}/anime_list?category=general`)
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
      body: JSON.stringify({ label: label.trim(), done: false, category: "general" }),
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

  return (
    <div className="text-center">
      <img src={PowerImage} id="power-image"  alt="" />
      <img src={ZeroTwo} id="zeroTwo" alt="" />
      <h1>
        <strong>My Anime List</strong>
      </h1>
      <div className="backgroundBox">
        <p><strong>{listArray.length} Anime</strong></p>
        <p>
                    <Link to="/shounen">
          <button>
            <strong>
              Go to Shounen List
            </strong>
          </button>
          </Link>
                    <Link to="/isekai">
          <button>
<strong>
  Go to Isekai List
</strong>
          </button>
          </Link>
          <Link to="/thriller">
          <button>
<strong>
  Go to Thriller List
</strong>
          </button>
          </Link>
          <br />
          <br />
          <Link to="/fantasy">
          <button>
<strong>
  Go to Fantasy List
</strong>
          </button>
          </Link>
          <Link to="/sliceOfLife">
          <button>
<strong>
  Go to Slice of Life List
</strong>
          </button>
          </Link>
          <Link to="/top10">
          <button>
<strong>
  Go to Top 10 List
</strong>
          </button>
          </Link>
          <br />
          <br />
          <Link to="/movies">
          <button>
<strong>
  Go to Movies List
</strong>
          </button>
        </Link>
          <Link to="/dropped">
          <button>
<strong>  Go to Dropped List
</strong>
          </button>   
        </Link>
        </p>
        <TextInp onAdd={addItem} />

        <ul>
          {listArray.sort((a, b) => a.label.localeCompare(b.label)).map((item) => (
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
          <br />
        </ul>
      </div>
    </div>
  );
};

export default Home;