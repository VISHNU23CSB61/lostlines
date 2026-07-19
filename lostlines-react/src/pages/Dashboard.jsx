import { useEffect, useState } from "react";
import API from "../api/api";

import AddItemForm from "../components/AddItemForm";
import SearchFilter from "../components/SearchFilter";
import StatsCard from "../components/StatsCard";
import ItemCard from "../components/ItemCard";

function Dashboard() {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");
    const [sortOrder, setSortOrder] = useState("Newest");
    const [editingItem, setEditingItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchItems();
    }, []);

    async function fetchItems() {
        try {
            setLoading(true);

            const res = await API.get("/items");

            setItems(res.data);

        } catch (err) {
            console.log(err);

        } finally {
            setLoading(false);
        }
    }

    async function saveItem(itemData) {
        try {

            if (editingItem) {

                await API.put(`/items/${editingItem._id}`, itemData);

                alert("Item Updated Successfully");

            } else {

                await API.post("/items", itemData);

                alert("Item Added Successfully");
            }

            setEditingItem(null);

            fetchItems();

        } catch (err) {
            console.log(err);
        }
    }

    function editItem(item) {
        setEditingItem(item);
    }

    async function deleteItem(id) {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this item?"
        );

        if (!confirmDelete) return;

        try {

            await API.delete(`/items/${id}`);

            alert("Item Deleted Successfully");

            fetchItems();

            if (editingItem && editingItem._id === id) {
                setEditingItem(null);
            }

        } catch (err) {
            console.log(err);
        }
    }

    // ==========================
    // Dashboard Statistics
    // ==========================

    const totalItems = items.length;

    const lostItems = items.filter(
        (item) => item.status === "Lost"
    ).length;

    const foundItems = items.filter(
        (item) => item.status === "Found"
    ).length;

    const successRate =
        totalItems === 0
            ? 0
            : Math.round((foundItems / totalItems) * 100);

    // ==========================
    // Search + Filter + Sort
    // ==========================

    const filteredItems = items
        .filter((item) => {

            const matchesSearch =
                item.name
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesFilter =
                filter === "All" ||
                item.status === filter;

            return matchesSearch && matchesFilter;

        })
        .sort((a, b) => {

            if (sortOrder === "Newest") {

                return (
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
                );

            }

            return (
                new Date(a.createdAt) -
                new Date(b.createdAt)
            );

        });

    return (

        <div className="page-container">

            <h1 className="section-title">
                Welcome Back 👋
            </h1>

            <p
                style={{
                    marginBottom: "30px",
                    color: "var(--text-muted)"
                }}
            >
                Here's your Lost & Found Overview
            </p>

            <div className="stats-grid">

                <StatsCard
                    title="Total Items"
                    value={totalItems}
                    icon="📦"
                    color="#3B82F6"
                />

                <StatsCard
                    title="Lost"
                    value={lostItems}
                    icon="🔴"
                    color="#EF4444"
                />

                <StatsCard
                    title="Found"
                    value={foundItems}
                    icon="🟢"
                    color="#10B981"
                />

                <StatsCard
                    title="Success"
                    value={`${successRate}%`}
                    icon="⭐"
                    color="#F59E0B"
                />

            </div>

            <hr style={{ margin: "35px 0" }} />

            <AddItemForm
                onSaveItem={saveItem}
                editingItem={editingItem}
            />

            <SearchFilter
                search={search}
                setSearch={setSearch}
                filter={filter}
                setFilter={setFilter}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />

            <hr style={{ margin: "30px 0" }} />

            {loading ? (

                <h3>Loading...</h3>

            ) : filteredItems.length === 0 ? (

                <h3>No Lost/Found Items Available.</h3>

            ) : (

                <div className="items-grid">

                    {filteredItems.map((item) => (

                        <ItemCard
                            key={item._id}
                            item={item}
                            onEditItem={editItem}
                            onDeleteItem={deleteItem}
                        />

                    ))}

                </div>

            )}

        </div>

    );
}

export default Dashboard;