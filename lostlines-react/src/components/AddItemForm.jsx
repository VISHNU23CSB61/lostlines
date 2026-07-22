import { useEffect, useState } from "react";
import { PlusCircle, Package, MapPin, Save } from "lucide-react";
import "./AddItemForm.css";

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

        if (editingItem) {
            itemData._id = editingItem._id;
        }

        onSaveItem(itemData);

        setItemName("");
        setLocation("");
        setStatus("Lost");
    }

    return (
        <div className="add-item-card">

            <h2 className="form-title">
                {editingItem ? "Update Item" : "Add New Item"}
            </h2>

            <form
                className="add-item-form"
                onSubmit={handleSubmit}
            >

                <div className="input-group">

                    <Package size={18} />

                    <input
                        type="text"
                        placeholder="Item Name"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />

                </div>

                <div className="input-group">

                    <MapPin size={18} />

                    <input
                        type="text"
                        placeholder="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                    />

                </div>

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Lost">Lost</option>
                    <option value="Found">Found</option>
                </select>

                <button
                    className="submit-btn"
                    type="submit"
                >
                    {editingItem ? (
                        <>
                            <Save size={18} />
                            Update Item
                        </>
                    ) : (
                        <>
                            <PlusCircle size={18} />
                            Add Item
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
export default AddItemForm;