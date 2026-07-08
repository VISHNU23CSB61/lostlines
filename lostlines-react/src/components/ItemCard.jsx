function ItemCard({ item, onEditItem, onDeleteItem }) {
    return (
        <div
            style={{
                border: "1px solid #ccc",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "15px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
            }}
        >
            <h3> {item.name}</h3>

            <p>
                <strong> Location:</strong> {item.location}
            </p>

            <p>
                <strong>Status:</strong>{" "}
                <span
                    style={{
                        color: item.status === "Lost" ? "red" : "green",
                        fontWeight: "bold"
                    }}
                >
                    {item.status}
                </span>
            </p>

            <div
                style={{
                    marginTop: "10px",
                    display: "flex",
                    gap: "10px"
                }}
            >
                <button
                    onClick={() => onEditItem(item)}
                    style={{
                        backgroundColor: "#0d6efd",
                        color: "white",
                        border: "none",
                        padding: "8px 15px",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                     Edit
                </button>

                <button
                    onClick={() => onDeleteItem(item._id)}
                    style={{
                        backgroundColor: "#dc3545",
                        color: "white",
                        border: "none",
                        padding: "8px 15px",
                        borderRadius: "5px",
                        cursor: "pointer"
                    }}
                >
                     Delete
                </button>
            </div>
        </div>
    );
}

export default ItemCard;