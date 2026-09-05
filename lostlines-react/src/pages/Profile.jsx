import "./Profile.css";

import API from "../api/api";
import ProfileCard from "../components/ProfileCard";
import ProfileSkeleton from "../components/ProfileSkeleton";

import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import { toast } from "react-toastify";

function Profile() {

    const [user, setUser] = useState(null);
    const [items, setItems] = useState([]);

    const [editing, setEditing] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [saving, setSaving] = useState(false);

    const { updateUser } = useContext(AuthContext);

    useEffect(() => {

        fetchProfile();
        fetchItems();

    }, []);

    async function fetchProfile() {

        try {

            const res = await API.get("/users/profile");

            setUser(res.data);

            setName(res.data.name);

            setEmail(res.data.email);

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

   async function updateProfile() {

    if (saving) return;

    setSaving(true);

    const toastId = toast.loading("Updating Profile...");

    try {

        const res = await API.put("/users/profile", {
            name,
            email
        });

        setUser(res.data.user);

        updateUser(res.data.user);

        toast.update(toastId, {
            render: "Profile Updated Successfully",
            type: "success",
            isLoading: false,
            autoClose: 2500
        });

        setEditing(false);

    } catch (err) {

        console.error(err);

        toast.update(toastId, {
            render: "Unable to update profile",
            type: "error",
            isLoading: false,
            autoClose: 2500
        });

    } finally {

        setSaving(false);

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

            <button
                className="primary-btn"
                onClick={() => setEditing(!editing)}
            >

                {editing ? "Cancel" : "Edit Profile"}

            </button>

            {editing && (

                <>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        placeholder="Name"
                    />

                    <input
                        type="email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        placeholder="Email"
                    />

                    <button
    className="primary-btn"
    onClick={updateProfile}
    disabled={saving}
>
    {saving ? "Saving..." : "Save Changes"}
</button>

                </>

            )}

        </div>

    );

}

export default Profile;