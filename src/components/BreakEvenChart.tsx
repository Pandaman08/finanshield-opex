"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useRef, useState } from "react";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

/* 🔹 Plugin Crosshair */
const crosshairPlugin = {
  id: "crosshair",
  afterDraw: (chart: any) => {
    if (!chart.tooltip?._active?.length) return;

    const ctx = chart.ctx;
    const x = chart.tooltip._active[0].element.x;
    const topY = chart.scales.y.top;
    const bottomY = chart.scales.y.bottom;

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, topY);
    ctx.lineTo(x, bottomY);
    ctx.lineWidth = 1;
    ctx.setLineDash([5, 5]);
    ctx.strokeStyle = "#9ca3af";
    ctx.stroke();
    ctx.restore();
  },
};

ChartJS.register(crosshairPlugin);

export default function BreakEvenChart({ data }: { data: any }) {
  const lastIndex = useRef<number | null>(null);
  const [hover, setHover] = useState<any>(null);

  const maxUnits = Math.max(data.q, data.breakEven) * 1.2;
  const units = Array.from({ length: 40 }, (_, i) =>
    Math.round((i / 39) * maxUnits)
  );

  const chartData = {
    labels: units,
    datasets: [
      {
        label: "Ingresos",
        data: units.map((u) => u * data.p),
        borderColor: "#2dd4bf",
        borderWidth: 3,
        tension: 0,
        pointRadius: 0,
      },
      {
        label: "Costos Totales",
        data: units.map((u) => data.cf + u * data.cv),
        borderColor: "#fb7185",
        borderWidth: 3,
        tension: 0,
        pointRadius: 0,
      },
      {
        label: "Punto de equilibrio",
        data: units.map(u =>
            Math.abs(u - data.puntoEquilibrio) < maxUnits * 0.01
            ? data.puntoEquilibrio * data.p
            : null
        ),
        pointRadius: 6,
        pointBackgroundColor: "#000",
        showLine: false,
        }

    ],
  };

  const options: any = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        position: "bottom",
      },
    },
    scales: {
      x: { title: { display: true, text: "Unidades" } },
      y: { title: { display: true, text: "Valor monetario" } },
    },
    onHover: (_: any, elements: any[]) => {
      if (!elements.length) return;

      const index = elements[0].index;
      if (lastIndex.current === index) return; // 🔥 clave

      lastIndex.current = index;

      const u = units[index];
      const revenue = u * data.p;
      const cost = data.cf + u * data.cv;

      setHover({
        units: u,
        revenue,
        cost,
        profit: revenue - cost,
      });
    },
  };

  return (
    <div className="relative mt-8">
      {/* Tooltip flotante */}
      {hover && (
        <div className="absolute top-4 left-4 z-10 bg-white shadow-lg rounded-lg p-4 text-sm w-64">
          <h4 className="font-semibold mb-2">Análisis dinámico</h4>
          <p>Unidades: <strong>{hover.units}</strong></p>
          <p>Ingresos: <strong>{hover.revenue.toFixed(2)}</strong></p>
          <p>Costos totales: <strong>{hover.cost.toFixed(2)}</strong></p>
          <p className={hover.profit >= 0 ? "text-green-600" : "text-red-600"}>
            Beneficio operativo: <strong>{hover.profit.toFixed(2)}</strong>
          </p>
        </div>
      )}

      <Line data={chartData} options={options} />
    </div>
  );


  
}
