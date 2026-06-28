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

    function handleSubmit(event) {
        event.preventDefault();

        if (itemName.trim() === "" || location.trim() === "") {
            alert("Please fill all fields");
            return;
        }

        const itemData = {
            name: itemName,
            location: location,
            status: status
        };

        onSaveItem(itemData);

        setItemName("");
        setLocation("");
        setStatus("Lost");
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Item Name"
                value={itemName}
                onChange={(event) => setItemName(event.target.value)}
            />

            <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
            />

            <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
            >
                <option value="Lost">Lost</option>
                <option value="Found">Found</option>
            </select>

            <button type="submit">
                {editingItem ? "Update Item" : "Add Item"}
            </button>
        </form>
    );
}

export default AddItemForm;