import { useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import ProfileCard from "./components/ProfileCard";
import StatsCard from "./components/StatsCard";
import AddItemForm from "./components/AddItemForm";
import ItemList from "./components/ItemList";

function App() {
    const [items, setItems] = useState(() => {
        const savedItems = localStorage.getItem("reactLostItems");
        return savedItems ? JSON.parse(savedItems) : [];
    });

    const [editingItem, setEditingItem] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [sortOrder, setSortOrder] = useState("newest");

    useEffect(() => {
        localStorage.setItem("reactLostItems", JSON.stringify(items));
    }, [items]);

    function saveItem(itemData) {
        if (editingItem) {
            const updatedItems = items.map((item) =>
                item.id === editingItem.id
                    ? { ...itemData, id: editingItem.id }
                    : item
            );

            setItems(updatedItems);
            setEditingItem(null);
        } else {
            setItems([...items, { ...itemData, id: Date.now() }]);
        }
    }

    function deleteItem(id) {
        const updatedItems = items.filter((item) => item.id !== id);
        setItems(updatedItems);
    }

    function editItem(item) {
        setEditingItem(item);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    const filteredItems = items
        .filter((item) => {
            const name = item.name.toLowerCase();
            const location = item.location.toLowerCase();

            const matchesSearch =
                name.includes(searchText.toLowerCase()) ||
                location.includes(searchText.toLowerCase());

            const matchesStatus =
                filterStatus === "All" || item.status === filterStatus;

            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            if (sortOrder === "newest") {
                return b.id - a.id;
            }

            return a.id - b.id;
        });

    return (
        <div>
            <Header />

            <main>
                <section>
                    <ProfileCard />

                    <h2>Dashboard Stats</h2>

                    <div className="stats">
                        <StatsCard title="Total" count={items.length} />
                        <StatsCard
                            title="Lost"
                            count={items.filter((item) => item.status === "Lost").length}
                        />
                        <StatsCard
                            title="Found"
                            count={items.filter((item) => item.status === "Found").length}
                        />
                    </div>

                    <h2>Search & Filter</h2>

                    <div className="controls">
                        <input
                            type="text"
                            placeholder="Search by item or location"
                            value={searchText}
                            onChange={(event) => setSearchText(event.target.value)}
                        />

                        <select
                            value={filterStatus}
                            onChange={(event) => setFilterStatus(event.target.value)}
                        >
                            <option value="All">All</option>
                            <option value="Lost">Lost</option>
                            <option value="Found">Found</option>
                        </select>

                        <select
                            value={sortOrder}
                            onChange={(event) => setSortOrder(event.target.value)}
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                    </div>

                    <h2>{editingItem ? "Update Item" : "Report Lost Item"}</h2>

                    <AddItemForm
                        onSaveItem={saveItem}
                        editingItem={editingItem}
                    />

                    <h2>Reported Items</h2>

                    <ItemList
                        items={filteredItems}
                        onEditItem={editItem}
                        onDeleteItem={deleteItem}
                    />
                </section>
            </main>
        </div>
    );
}

export default App;