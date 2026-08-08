import "./AnalyticsChart.css";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
} from "chart.js";

import { Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement
);

function AnalyticsChart({
    lost,
    found,
    recovered,
    items
}) {

    // ==========================
    // Doughnut Chart
    // ==========================

    const doughnutData = {

        labels: [
            "Lost",
            "Found",
            "Recovered"
        ],

        datasets: [
            {
                data: [
                    lost,
                    found,
                    recovered
                ],

                backgroundColor: [
                    "#EF4444",
                    "#3B82F6",
                    "#10B981"
                ],

                borderWidth: 0
            }
        ]
    };


    // ==========================
    // Reports By Date
    // ==========================

    const dateCounts = {};

    items.forEach(item => {

        const date = new Date(
            item.createdAt
        ).toLocaleDateString();

        dateCounts[date] =
            (dateCounts[date] || 0) + 1;

    });

    const sortedDates =
        Object.keys(dateCounts).sort(
            (a, b) =>
                new Date(a) - new Date(b)
        );


    const lineData = {

        labels: sortedDates,

        datasets: [
            {
                label: "Reports",

                data: sortedDates.map(
                    date => dateCounts[date]
                ),

                borderColor: "#3B82F6",

                backgroundColor:
                    "rgba(59,130,246,.15)",

                tension: 0.4,

                fill: true
            }
        ]
    };


    const doughnutOptions = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {
                position: "bottom"
            }

        }

    };


    const lineOptions = {

        responsive: true,

        maintainAspectRatio: false,

        plugins: {

            legend: {
                display: true
            }

        },

        scales: {

            y: {
                beginAtZero: true,

                ticks: {
                    precision: 0
                }
            }

        }

    };


    return (

        <div className="analytics-grid">

            {/* Doughnut */}

            <div className="analytics-card">

                <h2>Item Analytics</h2>

                <div className="chart-container">

                    <Doughnut
                        data={doughnutData}
                        options={doughnutOptions}
                    />

                </div>

            </div>


            {/* Line Chart */}

            <div className="analytics-card">

                <h2>Reports Over Time</h2>

                <div className="chart-container">

                    <Line
                        data={lineData}
                        options={lineOptions}
                    />

                </div>

            </div>

        </div>

    );

}

export default AnalyticsChart;