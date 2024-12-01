'use client'

import {
    Chart as chartjs,
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

chartjs.register(
    CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, LineElement
)

export default function LineChart({
    labels, dataValues
}: {
    labels: string[], dataValues: number[] | null;
}) {
    const data = {
        labels: labels,
        datasets:
            [
                {
                    label: "Daily",
                    data: dataValues || [300, 400, 200, 500, 700, 600, 800],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.6)',
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(153, 102, 255, 0.6)',
                        'rgba(255, 159, 64, 0.6)',
                    ],
                    borderWidth: 2
                }
            ]
    }

    const options = {
        responsive: true,
        scales: {
            y: {
                type: "linear" as const,
                beginAtZero: true,
                ticks: {
                    stepSize: 20
                }
            }
        },
        plugins: {
            legend: {
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Counting Chatting room"
            }
        }
    };

    return <Line data={data} options={options} />
}