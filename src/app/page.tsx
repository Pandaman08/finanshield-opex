"use client";

import { useState } from "react";

// Lógica académica
import { calcularCVU } from "../lib/cvu";
import { interpretarCVU } from "../lib/interpretacion";
import { recomendarAccion } from "../lib/recomendacion";

// Componentes
import InputForm from "../components/InputForm";
import IndicatorsPanel from "../components/IndicatorsPanel";
import InterpretationPanel from "../components/InterpretationPanel";
import BreakEvenChart from "../components/BreakEvenChart";

export default function Home() {
  const [data, setData] = useState<any>(null);

  function handleCalculate(inputs: {
    cf: number;
    cv: number;
    p: number;
    q: number;
  }) {
    try {
      // 1️⃣ Modelo CVU
      const cvu = calcularCVU(
        inputs.cf,
        inputs.cv,
        inputs.p,
        inputs.q
      );

      // 2️⃣ Interpretación económica
      const interpretacion = interpretarCVU(
        inputs.q,
        cvu.puntoEquilibrio,
        cvu.resultadoOperativo,
        cvu.margenSeguridad
      );

      // 3️⃣ Recomendación
      const recomendacion = recomendarAccion(
        cvu.resultadoOperativo,
        cvu.margenSeguridad
      );

      // 4️⃣ Unir todo
      setData({
        ...inputs,
        ...cvu,
        ...interpretacion,
        recomendacion,
      });
    } catch (error: any) {
      alert(error.message);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-900 flex justify-center px-4 py-10">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-8">
        {/* TÍTULO */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900">
            FinanShield OPEX
          </h1>
          <p className="text-sm text-zinc-600">
            Análisis costo–volumen–utilidad y riesgo operativo
          </p>
        </header>

        {/* INPUTS */}
        <InputForm onCalculate={handleCalculate} />

        {/* RESULTADOS */}
        {data && (
          <>
            <IndicatorsPanel data={data} />

            <InterpretationPanel
              situacion={data.situacion}
              riesgo={data.riesgo}
              recomendacion={data.recomendacion}
            />

            <BreakEvenChart data={data} />
          </>
        )}
      </div>
    </main>
  );
}
