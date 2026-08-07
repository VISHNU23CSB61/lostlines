import { useEffect, useState } from "react";
import API from "../api/api";

import AddItemForm from "../components/AddItemForm";
import SearchFilter from "../components/SearchFilter";
import StatsCard from "../components/StatsCard";
import ItemCard from "../components/ItemCard";

import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import ItemModal from "../components/ItemModal";

import { toast } from "react-toastify";
import { motion } from "framer-motion";
import SkeletonCard from "../components/SkeletonCard";

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

    function openItem(item){

    setSelectedItem(item);

}

    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        console.log("Items State Updated:", items);
    }, [items]);

    async function fetchItems() {

        try {

            setLoading(true);

            const res = await API.get("/items");

            console.log("Backend Response:", res.data);

            setItems(res.data);

        } catch (err) {

            console.error("Fetch Error:", err);

            toast.error("Unable to load items");

        } finally {

            setLoading(false);

        }

    }

    async function saveItem(itemData) {

        try {

            if (editingItem) {

                await API.put(`/items/${editingItem._id}`, itemData);

                toast.success("Item Updated");

            } else {

                await API.post("/items", itemData);

                toast.success("Item Added");

            }

            setEditingItem(null);

            fetchItems();

        } catch (err) {

            console.error(err);

            toast.error("Failed to save item");

        }

    }

    async function deleteItem(id) {

        const confirmDelete = window.confirm(
            "Delete this item?"
        );

        if (!confirmDelete) return;

        try {

            await API.delete(`/items/${id}`);

            toast.success("Item Deleted");

            fetchItems();

        } catch (err) {

            console.error(err);

            toast.error("Delete Failed");

        }

    }

    function editItem(item) {

        setEditingItem(item);

    }

    async function recoverItem(id){

    try{

        await API.put(`/items/recover/${id}`);

        toast.success("Item Recovered");

        fetchItems();

    }

    catch(err){

        toast.error("Unable to recover item");

    }

}

    // ==========================
    // Statistics
    // ==========================

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

    // ==========================
    // Filter + Search + Sort
    // ==========================

    const filteredItems = items
        .filter(item => {

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

                return new Date(b.createdAt) - new Date(a.createdAt);

            }

            return new Date(a.createdAt) - new Date(b.createdAt);

        });

    console.log("Filtered Items:", filteredItems);

    return (

        <motion.div
        className="page-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        >

            <h1 className="section-title">
                Dashboard
            </h1>

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

            <hr />

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

            <hr />

            {loading ? (

<div className="items-grid">

    <SkeletonCard/>
    <SkeletonCard/>
    <SkeletonCard/>
    <SkeletonCard/>

</div>

): filteredItems.length === 0 ? (

                <EmptyState />

            ) : (

                <div className="items-grid">

                    {filteredItems.map(item => (

                       <ItemCard
                            key={item._id}
                            item={item}
                            onEditItem={editItem}
                            onDeleteItem={deleteItem}
                            onViewItem={openItem}
                            onRecoverItem={recoverItem}
                        />

                    ))}

                </div>
                

            )}
            <ItemModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            />

        </motion.div>

    );

}

export default Dashboard;