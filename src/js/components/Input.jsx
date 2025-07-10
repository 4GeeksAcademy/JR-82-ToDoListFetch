import React, {useState} from "react";

const TextInp = ({ onAdd }) => {
    const [inputValue, setInputValue] = useState("");

    const handleChange = (e) => setInputValue(e.target.value);

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            onAdd(inputValue);
            setInputValue("");
        }
    };

    return (
        <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Add a new task"
        />
    );
};

export default TextInp;