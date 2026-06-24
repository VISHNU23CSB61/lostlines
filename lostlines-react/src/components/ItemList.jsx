function ItemList({ items }) {
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
                </li>
            ))}
        </ul>
    );
}

export default ItemList;