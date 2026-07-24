import "./ProfileCard.css";
import { User, Mail, Calendar } from "lucide-react";

function ProfileCard({ user }) {
    return (

        <div className="profile-card">

            <div className="profile-avatar">

                <User size={60} />

            </div>

            <div className="profile-info">

                <h2>{user.name}</h2>

                <p>

                    <Mail size={18} />

                    {user.email}

                </p>

                <p>

                    <Calendar size={18} />

                    Joined on{" "}
                    {new Date(user.createdAt).toLocaleDateString()}

                </p>

            </div>

        </div>

    );
}

export default ProfileCard;