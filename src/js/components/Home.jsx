import React, { useState } from "react";
import TextInp from "./Input";

//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {
    const [listArray, setListArray] = useState([]);

    const addItem = (item) => {
        if (item.trim() !== "") {
            setListArray([...listArray, item.trim()]);
        }
    };

    const removeItem = (idxToRemove) => {
        setListArray(listArray.filter((_, idx) => idx !== idxToRemove));
    };

    return (
        <div className="text-center">
            <h1><strong>To Do List</strong></h1>
            <div className="backgroundBox">
                <TextInp onAdd={addItem} />
                <ul>
                    {listArray.map((item, idx) => (
                        <li key={idx} className="todo-item">
                            {item}
                            <span
                                className="delete-btn"
                                onClick={() => removeItem(idx)}
                                title="Delete"
                            >
                                ❌
                            </span>
						</li>
                    ))}
                </ul>
                <p>{listArray.length} Items Left</p>
            </div>
        </div>
    );
};

export default Home;