import "./EmptyState.css";

function EmptyState() {
    return (
        <div className="empty-state">
            <div className="empty-icon">
                📦
            </div>
            <h2>No Items Found</h2>
            <p>
                Start by reporting your first lost or found item.
            </p>
        </div>
    );
}

export default EmptyState;