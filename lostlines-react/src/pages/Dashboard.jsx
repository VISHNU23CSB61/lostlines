import { useEffect, useState } from "react";
import API from "../api/api";
import AddItemForm from "../components/AddItemForm";
import ItemCard from "../components/ItemCard";
import SearchFilter from "../components/SearchFilter";

function Dashboard() {
    const [items, setItems] = useState([]);
    const [search,setSearch]=useState("");

    const [filter,setFilter]=useState("All");

    const [sortOrder,setSortOrder]=useState("Newest");
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
                alert(" Item Updated Successfully");
            } else {
                await API.post("/items", itemData);
                alert(" Item Added Successfully");
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

            alert("🗑 Item Deleted Successfully");

            fetchItems();

            if (editingItem && editingItem._id === id) {
                setEditingItem(null);
            }

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div
            style={{
                maxWidth: "700px",
                margin: "30px auto",
                padding: "20px"
            }}
        >
            <h1>LostLines Dashboard</h1>

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
            setSortOrder={setSortOrder}/>

            <hr />

            {loading ? (
                <h3>Loading...</h3>
            ) : items.length === 0 ? (
                <h3>No Lost/Found Items Available.</h3>
            ) : (
              items
             .filter((item)=>{
              const matchesSearch=item.name
            .toLowerCase().includes(
            search.toLowerCase()

             );

    const matchesFilter=
        filter==="All"
        ||
        item.status===filter;
    return matchesSearch && matchesFilter;

        })
        .sort((a,b)=>{
            if(sortOrder==="Newest")
                return new Date(b.createdAt)-new Date(a.createdAt);
            return new Date(a.createdAt)-new Date(b.createdAt);
        })

        .map((item)=>(
            <ItemCard
                key={item._id}
                item={item}
                onEditItem={editItem}
                onDeleteItem={deleteItem}
            />
        ))
            )}
        </div>
    );
}

export default Dashboard;