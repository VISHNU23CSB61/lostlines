function ItemList({ items, onEditItem, onDeleteItem }) {
    if (items.length === 0) {
        return <p>No items reported yet.</p>;
    }

    return (
        <ul>
            {items.map((item) => (
                <li key={item._id}>
                    <h3>{item.name}</h3>

                    <p>
                        <strong>Location:</strong> {item.location}
                    </p>

                    <p>
                        <strong>Status:</strong> {item.status}
                    </p>

                    <div className="button-group">
                        <button
                            type="button"
                            className="edit-btn"
                            onClick={() => onEditItem(item)}
                        >
                            Edit
                        </button>

                        <button
                            type="button"
                            className="delete-btn"
                            onClick={() => onDeleteItem(item._id)}
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export default ItemList;