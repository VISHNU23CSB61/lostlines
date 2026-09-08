import { useState, useEffect } from "react";

import "./AnalyticsChart.css";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler
);

function AnalyticsChart({
    lost,
    found,
    recovered,
    items
}) {

    // Re-render when the theme is toggled so colors stay in sync
    const [, setThemeTick] = useState(0);

    useEffect(() => {

        const onThemeChange = () => setThemeTick((t) => t + 1);

        window.addEventListener("themechange", onThemeChange);

        return () => window.removeEventListener("themechange", onThemeChange);

    }, []);

    // Read design tokens so the chart follows the active theme
    const styles = getComputedStyle(document.body);

    const cssVar = (name, fallback) =>
        styles.getPropertyValue(name).trim() || fallback;

    const accent = cssVar("--accent", "#3B82F6");

    const accentSoft = cssVar("--accent-soft", "rgba(59,130,246,.14)");

    const tickColor = cssVar("--chart-tick", "#94A3B8");

    const gridColor = cssVar("--chart-grid", "rgba(148,163,184,.14)");

    const labels = [
        "Lost",
        "Found",
        "Recovered"
    ];

    const data = {
        labels,

        datasets: [
            {
                label: "Items",

                data: [
                    lost,
                    found,
                    recovered
                ],

                borderColor: accent,

                backgroundColor: accentSoft,

                pointBackgroundColor: accent,

                borderWidth: 3,

                tension: 0.4,

                fill: true,

                pointRadius: 5,

                pointHoverRadius: 7
            }
        ]
    };

    const options = {
        responsive: true,

        maintainAspectRatio: false,

        plugins: {
            legend: {
                display: true,

                labels: {
                    color: tickColor
                }
            }
        },

        scales: {
            x: {
                ticks: {
                    color: tickColor
                },

                grid: {
                    color: gridColor
                }
            },

            y: {
                beginAtZero: true,

                ticks: {
                    precision: 0,

                    color: tickColor
                },

                grid: {
                    color: gridColor
                }
            }
        }
    };

    return (
        <div className="analytics-chart">

            <div className="analytics-header">

                <div>
                    <h2>Analytics</h2>

                    <p>
                        Overview of your reported items
                    </p>
                </div>

                <span>
                    {items.length} Total
                </span>

            </div>

            <div className="chart-container">

                <Line
                    data={data}
                    options={options}
                />

            </div>

        </div>
    );
}

export default AnalyticsChart;