"use client";

import { useState } from "react";

export default function InputForm({
  onCalculate,
}: {
  onCalculate: (data: any) => void;
}) {
  const [fixedCost, setFixedCost] = useState("");
  const [variableCost, setVariableCost] = useState("");
  const [price, setPrice] = useState("");
  const [sales, setSales] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const cf = Number(fixedCost);
    const cv = Number(variableCost);
    const p = Number(price);
    const q = Number(sales);

    if (p <= cv) {
      alert("El precio debe ser mayor que el costo variable");
      return;
    }

    const contribution = p - cv;
    const breakEven = cf / contribution;
    const marginSafety = ((q - breakEven) / q) * 100;

    onCalculate({
      cf,
      cv,
      p,
      q,
      contribution,
      breakEven,
      marginSafety,
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      <Input label="Costos fijos totales" value={fixedCost} onChange={setFixedCost} />
      <Input label="Costo variable unitario" value={variableCost} onChange={setVariableCost} />
      <Input label="Precio de venta unitario" value={price} onChange={setPrice} />
      <Input label="Ventas estimadas (unidades)" value={sales} onChange={setSales} />

      <div className="md:col-span-2">
        <button className="w-full bg-black text-white py-3 rounded-lg font-semibold">
          Calcular análisis
        </button>
      </div>
    </form>
  );
}

function Input({ label, value, onChange }: any) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-zinc-700 mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-zinc-300 rounded-lg px-4 py-2 text-black focus:ring-2 focus:ring-black"
      />
    </div>
  );
}
