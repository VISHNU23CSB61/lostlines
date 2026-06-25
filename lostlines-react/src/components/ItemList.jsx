function ItemList({ items,onDeleteItem }) {
    if (items.length === 0) {
        return <p>No items reported yet.</p>;
    }

    return (
        <ul>
            {items.map(item => (
                <li key={item.id}>
                    <strong>{item.name}</strong>
                    <p>Location: {item.location}</p>
                    <p>Status: {item.status}</p>
                    <button onClick={()=>onDeleteItem(item.id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
}

export default ItemList;