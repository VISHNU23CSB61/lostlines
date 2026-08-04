import "./SkeletonCard.css";

function SkeletonCard() {
    return (
        <div className="skeleton-card">
            <div className="skeleton skeleton-title"></div>
            <div className="skeleton skeleton-line"></div>
            <div className="skeleton skeleton-line short"></div>
            <div className="skeleton skeleton-btn"></div>
        </div>
    );
}

export default SkeletonCard;