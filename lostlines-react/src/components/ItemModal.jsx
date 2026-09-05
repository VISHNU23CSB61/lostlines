import "./ItemModal.css";

import {
    X,
    MapPin,
    CalendarDays,
    Package,
    CircleAlert,
    CircleCheck,
    CheckCircle
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

function ItemModal({
    item,
    onClose
}) {

    return (

        <AnimatePresence>

            {item && (

                <motion.div
                    className="modal-overlay"

                    initial={{
                        opacity: 0
                    }}

                    animate={{
                        opacity: 1
                    }}

                    exit={{
                        opacity: 0
                    }}

                    onClick={onClose}
                >

                    <motion.div
                        className="modal-content"

                        initial={{
                            opacity: 0,
                            scale: 0.8,
                            y: 20
                        }}

                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0
                        }}

                        exit={{
                            opacity: 0,
                            scale: 0.8,
                            y: 20
                        }}

                        transition={{
                            duration: 0.25
                        }}

                        onClick={(e) =>
                            e.stopPropagation()
                        }
                    >

                        {/* Close */}

                        <button
                            className="close-btn"
                            onClick={onClose}
                        >

                            <X size={20} />

                        </button>


                        {/* Title */}

                        <h2>

                            <Package
                                size={22}
                            />

                            {item.name}

                        </h2>


                        {/* Status */}

                        <p>

                            {item.status === "Lost" && (
                                <CircleAlert
                                    size={20}
                                    color="red"
                                />
                            )}

                            {item.status === "Found" && (
                                <CircleCheck
                                    size={20}
                                    color="green"
                                />
                            )}

                            {item.status === "Recovered" && (
                                <CheckCircle
                                    size={20}
                                    color="#10B981"
                                />
                            )}

                            {item.status}

                        </p>


                        {/* Location */}

                        <p>

                            <MapPin
                                size={18}
                            />

                            {item.location}

                        </p>


                        {/* Date */}

                        <p>

                            <CalendarDays
                                size={18}
                            />

                            {new Date(
                                item.createdAt
                            ).toLocaleDateString()}

                        </p>

                    </motion.div>

                </motion.div>

            )}

        </AnimatePresence>

    );

}

export default ItemModal;