import "./StatsCard.css";
import { motion } from "framer-motion";

function StatsCard({ title, value, icon, color }) {
    return (
        <motion.div
            className="stats-card"
            whileHover={{
                y:-8,
                scale:1.03
            }}
            transition={{
                duration:0.25
            }}>
            <div
                className="stats-icon"
                style={{ background: color }}
            >
                {icon}
            </div>
            <div>
                <p className="stats-title">
                    {title}
                </p>
                <h2>{value}</h2>
            </div>
        </motion.div>
    );
}

export default StatsCard;