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