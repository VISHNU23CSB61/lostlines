import "./ItemModal.css";
import { motion } from "framer-motion";
import {
    X,
    MapPin,
    CalendarDays,
    Package,
    CircleAlert,
    CircleCheck
} from "lucide-react";

function ItemModal({ item, onClose }) {
    if (!item) return null;

    return (

    <div className="modal-overlay">

        <motion.div
            className="item-modal"
            initial={{
                opacity:0,
                scale:0.8
            }}
            animate={{
                opacity:1,
                scale:1
            }}
            exit={{
                opacity:0,
                scale:0.8
            }}
            transition={{
                duration:0.25
            }}
        >

            <button
                className="close-btn"
                onClick={onClose}
            >
                <X size={20}/>
            </button>

            <h2>
                <Package size={22}/>
                {item.name}
            </h2>

            <p>
                {item.status === "Lost"
                    ? <CircleAlert color="red"/>
                    : <CircleCheck color="green"/>
                }

                {item.status}
            </p>

            <p>
                <MapPin size={18}/>
                {item.location}
            </p>

            <p>
                <CalendarDays size={18}/>
                {new Date(item.createdAt).toLocaleDateString()}
            </p>

        </motion.div>

    </div>

);
}

export default ItemModal;