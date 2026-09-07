import "./EmptyState.css";

function EmptyState({
    title = "No Items Found",
    message = "Start by reporting your first lost or found item."
}) {
    return (
        <div className="empty-state">
            <div className="empty-icon">
                📦
            </div>
            <h2>{title}</h2>
            <p>
                {message}
            </p>
        </div>
    );
}

export default EmptyState;