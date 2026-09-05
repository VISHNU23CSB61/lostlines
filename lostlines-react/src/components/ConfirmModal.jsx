import "./ConfirmModal.css";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";

function ConfirmModal({
    isOpen,
    title,
    message,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    onConfirm,
    onCancel,
    isLoading = false,
    type = "danger"
}) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="confirm-overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onCancel}
                >
                    <motion.div
                        className="confirm-content"
                        initial={{ opacity: 0, scale: 0.85, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 20 }}
                        transition={{ duration: 0.2 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="confirm-close"
                            onClick={onCancel}
                            type="button"
                            disabled={isLoading}
                        >
                            <X size={18} />
                        </button>

                        <div className={`confirm-icon ${type}`}>
                            <AlertTriangle size={28} />
                        </div>

                        <h3 className="confirm-title">{title}</h3>
                        <p className="confirm-message">{message}</p>

                        <div className="confirm-actions">
                            <button
                                className="confirm-cancel"
                                onClick={onCancel}
                                type="button"
                                disabled={isLoading}
                            >
                                {cancelLabel}
                            </button>
                            <button
                                className={`confirm-delete ${type}`}
                                onClick={onConfirm}
                                type="button"
                                disabled={isLoading}
                            >
                                {isLoading ? "Deleting..." : confirmLabel}
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default ConfirmModal;