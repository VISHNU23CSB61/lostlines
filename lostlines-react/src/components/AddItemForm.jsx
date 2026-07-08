import { useEffect, useState } from "react";

function AddItemForm({ onSaveItem, editingItem }) {
    const [itemName, setItemName] = useState("");
    const [location, setLocation] = useState("");
    const [status, setStatus] = useState("Lost");

    useEffect(() => {
        if (editingItem) {
            setItemName(editingItem.name);
            setLocation(editingItem.location);
            setStatus(editingItem.status);
        } else {
            setItemName("");
            setLocation("");
            setStatus("Lost");
        }
    }, [editingItem]);

    function handleSubmit(e) {
        e.preventDefault();

        if (itemName.trim() === "" || location.trim() === "") {
            alert("Please fill all fields");
            return;
        }

        const itemData = {
            name: itemName,
            location: location,
            status: status
        };

        // If editing, include the MongoDB _id
        if (editingItem) {
            itemData._id = editingItem._id;
        }

        onSaveItem(itemData);

        setItemName("");
        setLocation("");
        setStatus("Lost");
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                maxWidth: "400px",
                marginBottom: "30px"
            }}
        >
            <input
                type="text"
                placeholder="Item Name"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
            />

            <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="Lost">Lost</option>
                <option value="Found">Found</option>
            </select>

            <button
                type="submit"
                style={{
                    padding: "10px",
                    backgroundColor: editingItem ? "green" : "#0d6efd",
                    color: "white",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "5px"
                }}
            >
                {editingItem ? "Update Item" : "Add Item"}
            </button>
        </form>
    );
}

export default AddItemForm;