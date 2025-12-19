export default function IndicatorsPanel({ data }: { data: any }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
      <Card title="Punto de equilibrio" value={`${data.puntoEquilibrio.toFixed(2)} u`} />
      <Card title="Margen contribución unit." value={`S/ ${data.margenContribucionUnitario.toFixed(2)}`} />
      <Card
        title="Resultado operativo"
        value={`S/ ${data.resultadoOperativo.toFixed(2)}`}
        highlight={data.resultadoOperativo >= 0 ? "positive" : "negative"}
      />
      <Card
        title="Margen de seguridad"
        value={`${data.margenSeguridad.toFixed(2)} %`}
        highlight={
          data.margenSeguridad < 10
            ? "negative"
            : data.margenSeguridad < 25
            ? "warning"
            : "positive"
        }
      />
    </div>
  );
}

function Card({
  title,
  value,
  highlight,
}: {
  title: string;
  value: string;
  highlight?: "positive" | "negative" | "warning";
}) {
  const color =
    highlight === "positive"
      ? "text-green-600"
      : highlight === "negative"
      ? "text-red-600"
      : highlight === "warning"
      ? "text-yellow-600"
      : "text-black";

  return (
    <div className="bg-zinc-100 rounded-lg p-4 text-center">
      <p className="text-xs text-zinc-500">{title}</p>
      <p className={`text-xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
