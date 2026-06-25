import { useState } from "react";
import "./App.css";

import Header from "./components/Header";
import ProfileCard from "./components/ProfileCard";
import StatsCard from "./components/StatsCard";
import AddItemForm from "./components/AddItemForm";
import ItemList from "./components/ItemList";

function App() {
    const [items, setItems] = useState([]);

    function addItem(newItem) {
        setItems([...items, newItem]);
    }
    function deleteItem(itemId){
        const updateItems=items.filter(item=>item.id!==itemId);
        setItems(updateItems);
    }

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
                            count={items.filter(item => item.status === "Lost").length}
                        />
                        <StatsCard
                            title="Found"
                            count={items.filter(item => item.status === "Found").length}
                        />
                    </div>

                    <h2>Report Lost Item</h2>

                    <AddItemForm onAddItem={addItem} />

                    <h2>Reported Items</h2>

                    <ItemList items={items}
                    onDeleteItem={deleteItem}
                    />
                </section>
            </main>
        </div>
    );
}

export default App;