import "./ProfileSkeleton.css";

function ProfileSkeleton() {
    return (
        <div className="profile-skeleton">

            <div className="skeleton-avatar skeleton"></div>

            <div className="skeleton-name skeleton"></div>

            <div className="skeleton-email skeleton"></div>

            <div className="profile-stats">

                <div className="profile-stat-card">
                    <div className="skeleton-number skeleton"></div>
                    <div className="skeleton-text skeleton"></div>
                </div>

                <div className="profile-stat-card">
                    <div className="skeleton-number skeleton"></div>
                    <div className="skeleton-text skeleton"></div>
                </div>

                <div className="profile-stat-card">
                    <div className="skeleton-number skeleton"></div>
                    <div className="skeleton-text skeleton"></div>
                </div>

            </div>

            <div className="skeleton-button skeleton"></div>

        </div>
    );
}

export default ProfileSkeleton;