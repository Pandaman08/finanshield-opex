export default function InterpretationPanel({
  situacion,
  riesgo,
  recomendacion,
}: {
  situacion: string;
  riesgo: string;
  recomendacion: string;
}) {
  return (
    <div className="mt-6 bg-white border border-zinc-200 rounded-lg p-6">
      <h3 className="font-semibold mb-3">Interpretación económica</h3>

      <p className="text-sm text-zinc-700 mb-2">{situacion}</p>
      <p className="text-sm text-zinc-700 mb-4">{riesgo}</p>

      <div className="bg-zinc-50 p-4 rounded-md text-sm">
        <strong>Recomendación:</strong> {recomendacion}
      </div>
    </div>
  );
}
