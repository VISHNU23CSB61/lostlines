import "./RecentActivity.css";

import {
    Package,
    CircleAlert,
    CircleCheck,
    RotateCcw
} from "lucide-react";

function RecentActivity({ items }) {

    const recentItems = [...items]
        .sort(
            (a, b) =>
                new Date(b.createdAt) -
                new Date(a.createdAt)
        )
        .slice(0, 5);

    return (

        <div className="recent-activity">

            <div className="recent-header">

                <h2>Recent Activity</h2>

                <span>
                    Latest Reports
                </span>

            </div>

            {recentItems.length === 0 ? (

                <p className="no-activity">
                    No recent activity
                </p>

            ) : (

                <div className="activity-list">

                    {recentItems.map(item => (

                        <div
                            className="activity-item"
                            key={item._id}
                        >

                            <div className="activity-icon">

                                {item.status === "Lost" && (
                                    <CircleAlert
                                        size={20}
                                    />
                                )}

                                {item.status === "Found" && (
                                    <CircleCheck
                                        size={20}
                                    />
                                )}

                                {item.status === "Recovered" && (
                                    <RotateCcw
                                        size={20}
                                    />
                                )}

                            </div>

                            <div className="activity-info">

                                <h3>
                                    {item.name}
                                </h3>

                                <p>
                                    {item.status}
                                    {" • "}
                                    {item.location}
                                </p>

                            </div>

                            <span className="activity-date">

                                {new Date(
                                    item.createdAt
                                ).toLocaleDateString()}

                            </span>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );
}

export default RecentActivity;