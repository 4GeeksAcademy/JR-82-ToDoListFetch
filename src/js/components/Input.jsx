import React, { useState } from "react";

const TextInp = ({ onAdd }) => {
    const [inputValue, setInputValue] = useState("");

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && inputValue.trim()) {
            onAdd(inputValue);
            setInputValue("");
        }
    };

    return (
        <input
            className="form-control"
            type="text"
            placeholder="Add a new anime..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
        />
    );
};

export default TextInp;