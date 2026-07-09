function ItemCard({ item, onEditItem, onDeleteItem }) {

    return (

        <div
            style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "20px",
                marginBottom: "20px",
                boxShadow: "0px 3px 8px rgba(0,0,0,0.1)"
            }}
        >

            <h2>

                 {item.name}

            </h2>

            <p>

                 <strong>Location:</strong> {item.location}

            </p>

            <p>

                Status :

                <span
                    style={{
                        color:
                            item.status==="Lost"
                                ? "red"
                                : "green",

                        fontWeight:"bold"
                    }}
                >

                    {item.status}

                </span>

            </p>

            <small>

                Created :

                {new Date(item.createdAt).toLocaleString()}

            </small>

            <br/>

            <br/>

            <button
                onClick={()=>onEditItem(item)}
            >

                 Edit

            </button>

            <button
                style={{
                    marginLeft:"10px"
                }}
                onClick={()=>onDeleteItem(item._id)}
            >

                 Delete

            </button>

        </div>

    );

}

export default ItemCard;