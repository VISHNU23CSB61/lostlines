import "./ItemCard.css";

import {
    MapPin,
    CalendarDays,
    Pencil,
    Trash2,
    CircleAlert,
    CircleCheck,
    Package,
    CheckCircle
} from "lucide-react";

import { motion } from "framer-motion";

function ItemCard({
    item,
    onEditItem,
    onDeleteItem,
    onViewItem,
    onRecoverItem,
    deletingId,
    recoveringId
}) {

    function handleView() {
        onViewItem(item);
    }

    function handleEdit(e) {
        e.stopPropagation();
        onEditItem(item);
    }

    function handleDelete(e) {
        e.stopPropagation();
        onDeleteItem(item);
    }

    function handleRecover(e) {
        e.stopPropagation();
        onRecoverItem(item._id);
    }

    const isDeleting = deletingId === item._id;
    const isRecovering = recoveringId === item._id;

    return (

        <motion.div
            className="item-card"
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            whileHover={{ y: -8, scale: 1.02 }}
            onClick={handleView}
        >

            {/* HEADER */}
            <div className="item-header">
                <div className="item-title">
                    <Package size={20} className="item-icon" />
                    <h2>{item.name}</h2>
                </div>

                {/* STATUS */}
                <span
                    className={
                        item.status === "Lost"
                            ? "status lost"
                            : item.status === "Found"
                                ? "status found"
                                : "status recovered"
                    }
                >
                    {item.status === "Lost" && (
                        <>
                            <CircleAlert size={15} />
                            Lost
                        </>
                    )}
                    {item.status === "Found" && (
                        <>
                            <CircleCheck size={15} />
                            Found
                        </>
                    )}
                    {item.status === "Recovered" && (
                        <>
                            <CheckCircle size={15} />
                            Recovered
                        </>
                    )}
                </span>
            </div>

            {/* LOCATION */}
            <p className="item-location">
                <MapPin size={16} />
                <span>{item.location}</span>
            </p>

            {/* DATE */}
            <p className="item-date">
                <CalendarDays size={16} />
                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
            </p>

            {/* ACTION BUTTONS */}
            <div className="item-actions" onClick={(e) => e.stopPropagation()}>

                {/* EDIT */}
                {item.status !== "Recovered" && (
                    <button
                        type="button"
                        className="edit-btn"
                        onClick={handleEdit}
                    >
                        <Pencil size={15} />
                        Edit
                    </button>
                )}

                {/* RECOVER */}
                {item.status === "Lost" && (
                    <button
                        type="button"
                        className="recover-btn"
                        onClick={handleRecover}
                        disabled={isRecovering}
                    >
                        <CheckCircle size={16} />
                        {isRecovering ? "Recovering..." : "Recover"}
                    </button>
                )}

                {/* DELETE */}
                <button
                    type="button"
                    className="delete-btn"
                    onClick={handleDelete}
                    disabled={isDeleting}
                >
                    <Trash2 size={15} />
                    {isDeleting ? "Deleting..." : "Delete"}
                </button>

            </div>

        </motion.div>
    );
}

export default ItemCard;