import "./Profile.css";
import { useEffect, useState } from "react";
import API from "../api/api";
import ProfileCard from "../components/ProfileCard";
import ProfileSkeleton from "../components/ProfileSkeleton";

function Profile() {

    const [user, setUser] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {

        fetchProfile();
        fetchItems();

    }, []);

    async function fetchProfile() {

        try {

            const res = await API.get("/users/profile");

            setUser(res.data);

        } catch (err) {

            console.log(err);

        }

    }

    async function fetchItems() {

        try {

            const res = await API.get("/items");

            setItems(res.data);

        } catch (err) {

            console.log(err);

        }

    }

    if (!user) {

        return <ProfileSkeleton />;

    }

    const total = items.length;

    const lost = items.filter(
        item => item.status === "Lost"
    ).length;

    const found = items.filter(
        item => item.status === "Found"
    ).length;

    return (

        <div className="profile-page">

            <h1 className="section-title">

                My Profile

            </h1>

            <ProfileCard user={user} />

            <div className="profile-stats">

                <div className="profile-stat-card">

                    <h2>{total}</h2>

                    <p>Total Reports</p>

                </div>

                <div className="profile-stat-card">

                    <h2>{lost}</h2>

                    <p>Lost Items</p>

                </div>

                <div className="profile-stat-card">

                    <h2>{found}</h2>

                    <p>Found Items</p>

                </div>

            </div>

            <button className="primary-btn">

                Edit Profile

            </button>

        </div>

    );

}

export default Profile;