import { useEffect, useState } from "react";
import API from "../api/api";
import AddItemForm from "../components/AddItemForm";

function Dashboard() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetchItems();
    }, []);

    async function fetchItems() {
        try {
            const res = await API.get("/items");
            setItems(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    async function saveItem(itemData) {
        try {
            await API.post("/items", itemData);
            fetchItems();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div style={{ padding: "20px" }}>
            <h1>Dashboard</h1>

            <AddItemForm
                onSaveItem={saveItem}
                editingItem={null}
            />

            <hr />

            {items.map((item) => (
                <div
                    key={item._id}
                    style={{
                        border: "1px solid gray",
                        padding: "10px",
                        margin: "10px"
                    }}
                >
                    <h3>{item.name}</h3>

                    <p>Location: {item.location}</p>

                    <p>Status: {item.status}</p>
                </div>
            ))}
        </div>
    );
}

export default Dashboard;