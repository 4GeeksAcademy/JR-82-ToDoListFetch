import React, { useEffect, useState } from "react";
import TextInp from "./Input";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

const URI = `https://playground.4geeks.com/todo`


const Home = () => {
   
   let [userName, setUserName] = useState(`morbing`)
   
   
   useEffect(() => {
    CreateUser(userName);
    getUsersToDoList();
}, []); 
// make the create user .then 
function CreateUser(username) {
    fetch(`https://playground.4geeks.com/todo/users/${username}`, {
        method: "POST",
        body: JSON.stringify([]),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log("User created:", data);
    })
    .catch(error => {
        console.error("Error creating user:", error);
    });
}
   
   
function getUsersToDoList() {
    fetch("https://playground.4geeks.com/todo/users/" + userName)
        .then(response => response.json()) 
        .then(data => {
            setListArray(data.todos);      
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
}

   
    const [listArray, setListArray] = useState([]);

    const addItem = (item) => {

        fetch('https://playground.4geeks.com/todo/todos/morbing', {
            method: "POST",
            body: JSON.stringify({ label: item.trim(), done: false}),
            headers: {
                "Content-Type": "application/json"
            }
     })
     .then(resp => {
          console.log(resp.ok); 
          console.log(resp.status); 
                getUsersToDoList();
        console.log("Item added:", item.trim());
          return resp.json();
     })
     .then(data => {
         
          console.log(data); 
     })
     .catch(error => {
          
          console.log(error);
     });

    };

    const removeItem = (itemId) => {

        fetch(`https://playground.4geeks.com/todo/todos/${itemId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (response.ok) {
                console.log("Item deleted successfully");
                getUsersToDoList();
            }
        })
        .catch(error => {
            console.error("Error deleting item:", error);
        });
    };

    return (
        <div className="text-center">
            <h1 className="custom-underline"><strong>My Anime</strong></h1>
            <div className="backgroundBox">
                <TextInp onAdd={addItem} />
                <ul>
                    {listArray.map((item, idx) => (
                        <li key={idx} className="todo-item">
                            {item.label}
                            <span
                                className="delete-btn"
                                onClick={() => removeItem(item.id)}
                                title="Delete"
                            >
                                ❌
                            </span>
						</li>
                    ))}
                </ul>
                <p>{listArray.length} Items Left</p>
                <button
                    className="btn btn-danger"
                    onClick={() => {
                        Promise.all(listArray.map(item => 
                            fetch(`https://playground.4geeks.com/todo/todos/${item.id}`, {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            })
                        ))
                        .then(() => {
                            console.log("All items deleted successfully");
                            getUsersToDoList();
                        })
                        .catch(error => {
                            console.error("Error deleting all items:", error);
                        });
                    }}
                >
                    Clear All
                </button>
            </div>

        </div>
    );
};

export default Home;