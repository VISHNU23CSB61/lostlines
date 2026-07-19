import "./ItemCard.css";

function ItemCard({ item, onEdit, onDelete }) {

    return (

        <div className="item-card">

            <div className="item-header">

                <h2>{item.name}</h2>

                <span
                    className={
                        item.status === "Lost"
                            ? "status lost"
                            : "status found"
                    }
                >
                    {item.status}
                </span>

            </div>

            <p className="item-location">

                📍 {item.location}

            </p>

            <p className="item-date">

                Reported

                {

                    new Date(item.createdAt).toLocaleDateString()

                }

            </p>

            <div className="item-actions">

                <button
                    className="primary-btn"
                    onClick={() => onEdit(item)}
                >
                    Edit
                </button>

                <button
                    className="delete-btn"
                    onClick={() => onDelete(item._id)}
                >
                    Delete
                </button>

            </div>

        </div>

    );

}

export default ItemCard;