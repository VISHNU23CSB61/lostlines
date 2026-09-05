import { useEffect, useState } from "react";
import API from "../api/api";

import AddItemForm from "../components/AddItemForm";
import SearchFilter from "../components/SearchFilter";
import StatsCard from "../components/StatsCard";
import ItemCard from "../components/ItemCard";
import EmptyState from "../components/EmptyState";
import ItemModal from "../components/ItemModal";
import SkeletonCard from "../components/SkeletonCard";
import AnalyticsChart from "../components/AnalyticsChart";
import RecentActivity from "../components/RecentActivity";
import ConfirmModal from "../components/ConfirmModal";

import { toast } from "react-toastify";
import { motion } from "framer-motion";

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
    const [selectedItem, setSelectedItem] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [recoveringId, setRecoveringId] = useState(null);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);


    // =========================
    // FETCH ITEMS
    // =========================

    useEffect(() => {
        fetchItems();
    }, []);


    async function fetchItems() {
        try {
            setLoading(true);
            const response = await API.get("/items");
            setItems(response.data);
        } catch (error) {
            handleApiError(error, "Unable to load items");
        } finally {
            setLoading(false);
        }
    }


    // =========================
    // ERROR HANDLER
    // =========================

    function handleApiError(error, defaultMessage) {
        const status = error.response?.status;
        const serverMessage = error.response?.data?.message;

        if (status === 401) {
            toast.error("Session expired. Please log in again.");
        } else if (status === 404) {
            toast.error(serverMessage || "Item not found");
        } else if (status === 500) {
            toast.error("Server error. Please try again later.");
        } else {
            toast.error(serverMessage || defaultMessage);
        }
    }


    // =========================
    // VIEW ITEM
    // =========================

    function openItem(item) {
        setSelectedItem(item);
    }


    // =========================
    // EDIT ITEM
    // =========================

    function editItem(item) {
        setSelectedItem(null);
        setEditingItem(item);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }


    // =========================
    // SAVE ITEM
    // =========================

    async function saveItem(itemData) {
        try {
            if (editingItem) {
                await API.put(`/items/${editingItem._id}`, itemData);
                toast.success("Item updated successfully");
            } else {
                await API.post("/items", itemData);
                toast.success("Item added successfully");
            }
            setEditingItem(null);
            await fetchItems();
        } catch (error) {
            handleApiError(error, "Failed to save item");
        }
    }


    // =========================
    // DELETE ITEM
    // =========================

    function requestDelete(item) {
        if (!item || !item._id) {
            toast.error("Invalid item");
            return;
        }
        setItemToDelete(item);
        setShowDeleteConfirm(true);
    }


    async function confirmDelete() {
        if (!itemToDelete || !itemToDelete._id) return;

        const id = itemToDelete._id;

        if (deletingId) return;

        setDeletingId(id);
        setShowDeleteConfirm(false);

        try {
            await API.delete(`/items/${id}`);
            setItems(prev => prev.filter(item => item._id !== id));
            toast.success("Item deleted successfully");
        } catch (error) {
            handleApiError(error, "Unable to delete item");
        } finally {
            setDeletingId(null);
            setItemToDelete(null);
        }
    }


    function cancelDelete() {
        setShowDeleteConfirm(false);
        setItemToDelete(null);
    }


    // =========================
    // RECOVER ITEM
    // =========================

    async function recoverItem(id) {
        if (!id) return;
        if (recoveringId) return;

        setRecoveringId(id);

        try {
            await API.put(`/items/recover/${id}`);
            toast.success("Item recovered successfully");
            await fetchItems();
        } catch (error) {
            handleApiError(error, "Unable to recover item");
        } finally {
            setRecoveringId(null);
        }
    }


    // =========================
    // STATISTICS
    // =========================

    const totalItems = items.length;
    const lostItems = items.filter(item => item.status === "Lost").length;
    const foundItems = items.filter(item => item.status === "Found").length;
    const recoveredItems = items.filter(item => item.status === "Recovered").length;
    const successRate = totalItems === 0 ? 0 : Math.round((recoveredItems / totalItems) * 100);


    // =========================
    // FILTER & SORT
    // =========================

    const filteredItems = items
        .filter(item => {
            const itemName = item.name?.toLowerCase() || "";
            const searchText = search.toLowerCase();
            const matchesSearch = itemName.includes(searchText);
            const matchesFilter = filter === "All" || item.status === filter;
            return matchesSearch && matchesFilter;
        })
        .sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            if (sortOrder === "Newest") return dateB - dateA;
            return dateA - dateB;
        });


    return (

        <motion.div
            className="page-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >

            {/* TITLE */}
            <h1 className="section-title">Dashboard</h1>

            {/* STATISTICS */}
            <div className="stats-grid">
                <StatsCard title="Total Items" value={totalItems} icon={<Package size={28} />} color="#3B82F6" />
                <StatsCard title="Lost" value={lostItems} icon={<CircleAlert size={28} />} color="#EF4444" />
                <StatsCard title="Found" value={foundItems} icon={<CircleCheck size={28} />} color="#10B981" />
                <StatsCard title="Success" value={`${successRate}%`} icon={<TrendingUp size={28} />} color="#F59E0B" />
            </div>

            {/* ANALYTICS */}
            <div className="analytics-section">
                <AnalyticsChart lost={lostItems} found={foundItems} recovered={recoveredItems} items={items} />
            </div>

            <hr />

            {/* ADD / EDIT FORM */}
            <AddItemForm onSaveItem={saveItem} editingItem={editingItem} />

            {/* SEARCH */}
            <SearchFilter
                search={search}
                setSearch={setSearch}
                filter={filter}
                setFilter={setFilter}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />

            <hr />

            {/* ITEMS */}
            {loading ? (
                <div className="items-grid">
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            ) : filteredItems.length === 0 ? (
                <EmptyState />
            ) : (
                <div className="items-grid">
                    {filteredItems.map(item => (
                        <ItemCard
                            key={item._id}
                            item={item}
                            onEditItem={editItem}
                            onDeleteItem={requestDelete}
                            onViewItem={openItem}
                            onRecoverItem={recoverItem}
                            deletingId={deletingId}
                            recoveringId={recoveringId}
                        />
                    ))}
                </div>
            )}

            {/* ITEM VIEW MODAL */}
            <ItemModal
                item={selectedItem}
                onClose={() => setSelectedItem(null)}
            />

            {/* DELETE CONFIRMATION MODAL */}
            <ConfirmModal
                isOpen={showDeleteConfirm}
                title="Delete Item?"
                message="Are you sure you want to delete this item? This action cannot be undone."
                confirmLabel="Delete"
                cancelLabel="Cancel"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
                isLoading={!!deletingId}
                type="danger"
            />

            {/* RECENT ACTIVITY */}
            <RecentActivity items={items} />

        </motion.div>
    );
}

export default Dashboard;