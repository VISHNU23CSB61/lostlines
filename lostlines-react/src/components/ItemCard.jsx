import "./ItemCard.css";

import {
    MapPin,
    CalendarDays,
    Pencil,
    Trash2,
    CircleAlert,
    CircleCheck,
    Package
} from "lucide-react";
import { motion } from "framer-motion";

function ItemCard({
    item,
    onEditItem,
    onDeleteItem,
    onViewItem

}){

    return (

        <motion.div
        className="item-card"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        whileHover={{
            y: -8,
            scale: 1.02
        }}

        onClick={() => onViewItem(item)}>

            {/* Header */}

            <div className="item-header">

                <div className="item-title">

                    <Package
                        size={20}
                        className="item-icon"
                    />

                    <h2>{item.name}</h2>

                </div>

                <span
                    className={
                        item.status === "Lost"
                            ? "status lost"
                            : "status found"
                    }
                >

                    {item.status === "Lost" ? (

                        <>
                            <CircleAlert size={15} />
                            Lost
                        </>

                    ) : (

                        <>
                            <CircleCheck size={15} />
                            Found
                        </>

                    )}

                </span>

            </div>

            {/* Location */}

            <p className="item-location">

                <MapPin size={16} />

                <span>{item.location}</span>

            </p>

            {/* Date */}

            <p className="item-date">

                <CalendarDays size={16} />

                <span>

                    {new Date(item.createdAt).toLocaleDateString()}

                </span>

            </p>

            {/* Buttons */}

            <div className="item-actions">

                <button
                    className="edit-btn"
                    onClick={(e)=>{
                     e.stopPropagation();
                     onEditItem(item);
                    }}
                >

                    <Pencil size={16} />

                    Edit

                </button>

                <button
                    className="delete-btn"
                    onClick={(e)=>{

                        e.stopPropagation();
                        onDeleteItem(item._id);

                    }}>

                    <Trash2 size={16} />

                    Delete

                </button>

            </div>

       </motion.div>

    );

}

export default ItemCard;