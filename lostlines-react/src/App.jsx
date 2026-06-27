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

    const [searchText, setSearchText] = useState("");
    const [filterStatus, setFilterStatus] = useState("All");
    const [sortOrder, setSortOrder] = useState("newest");

    useEffect(() => {
        localStorage.setItem(
            "reactLostItems",
            JSON.stringify(items)
        );
    }, [items]);

    function addItem(newItem) {
        setItems([...items, newItem]);
    }

    function deleteItem(id) {
        const updatedItems =
        items.filter(item => item.id !== id);

        setItems(updatedItems);
    }

    function getFilteredItems() {
        let filteredItems = items.filter(item => {
            const itemName = item.name.toLowerCase();
            const itemLocation = item.location.toLowerCase();

            const matchesSearch =
            itemName.includes(searchText.toLowerCase()) ||
            itemLocation.includes(searchText.toLowerCase());

            const matchesStatus =
            filterStatus === "All" ||
            item.status === filterStatus;

            return matchesSearch && matchesStatus;
        });

        if(sortOrder === "newest"){
            filteredItems.sort((a, b) => b.id - a.id);
        } else {
            filteredItems.sort((a, b) => a.id - b.id);
        }

        return filteredItems;
    }

    const filteredItems = getFilteredItems();

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
                            count={
                                items.filter(
                                    item => item.status === "Lost"
                                ).length
                            }
                        />
                        <StatsCard
                            title="Found"
                            count={
                                items.filter(
                                    item => item.status === "Found"
                                ).length
                            }
                        />
                    </div>

                    <h2>Search & Filter</h2>

                    <div className="controls">
                        <input
                            type="text"
                            placeholder="Search by item or location"
                            value={searchText}
                            onChange={(event) =>
                                setSearchText(event.target.value)
                            }
                        />

                        <select
                            value={filterStatus}
                            onChange={(event) =>
                                setFilterStatus(event.target.value)
                            }
                        >
                            <option value="All">All</option>
                            <option value="Lost">Lost</option>
                            <option value="Found">Found</option>
                        </select>

                        <select
                            value={sortOrder}
                            onChange={(event) =>
                                setSortOrder(event.target.value)
                            }
                        >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                        </select>
                    </div>

                    <h2>Report Lost Item</h2>

                    <AddItemForm onAddItem={addItem} />

                    <h2>Reported Items</h2>

                    <ItemList
                        items={filteredItems}
                        onDeleteItem={deleteItem}
                    />
                </section>
            </main>
        </div>
    );
}

export default App;