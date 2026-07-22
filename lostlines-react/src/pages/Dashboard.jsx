import { useEffect, useState } from "react";
import API from "../api/api";

import AddItemForm from "../components/AddItemForm";
import SearchFilter from "../components/SearchFilter";
import StatsCard from "../components/StatsCard";
import ItemCard from "../components/ItemCard";

import { toast } from "react-toastify";

import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import {
    Package,
    CircleAlert,
    CircleCheck,
    TrendingUp
} from "lucide-react";

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

                toast.success("Item updated successfully!");

            } else {

                await API.post("/items", itemData);

                toast.success("Item added successfully!");

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

            toast.success("Item deleted successfully!");

            fetchItems();

            if (editingItem && editingItem._id === id) {

                setEditingItem(null);

            }

        } catch (err) {

            console.log(err);

            toast.error("Something went wrong!");

        }

    }

    // ===============================
    // Dashboard Statistics
    // ===============================

    const totalItems = items.length;

    const lostItems = items.filter(
        item => item.status === "Lost"
    ).length;

    const foundItems = items.filter(
        item => item.status === "Found"
    ).length;

    const successRate =
        totalItems === 0
            ? 0
            : Math.round((foundItems / totalItems) * 100);

    // ===============================
    // Search + Filter + Sort
    // ===============================

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
                Welcome Back
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
                    icon={<Package size={28} />}
                    color="#3B82F6"
                />
                <StatsCard
                    title="Lost"
                    value={lostItems}
                    icon={<CircleAlert size={28} />}      
                    color="#EF4444"
                />
                <StatsCard
                    title="Found"
                    value={foundItems}
                    icon={<CircleCheck size={28} />}
                    color="#10B981"
                />
                <StatsCard
                    title="Success"
                    value={`${successRate}%`}
                    icon={<TrendingUp size={28} />}
                    color="#F59E0B"
                />
            </div>
            <hr style={{ margin: "35px 0" }} />
            
            <div className="dashboard-actions">
                <div className="dashboard-form">
                    <AddItemForm
                        onSaveItem={saveItem}
                        editingItem={editingItem}
                    />
                </div>
                <div className="dashboard-search">
                    <SearchFilter
                        search={search}
                        setSearch={setSearch}
                        filter={filter}
                        setFilter={setFilter}
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                    />
                </div>
            </div>

            <hr style={{ margin: "30px 0" }} />

            {/* ===========================
                Item List
            =========================== */}
            {loading ? (
                <LoadingSpinner />
            ) : filteredItems.length === 0 ? (
                <EmptyState />
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