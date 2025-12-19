import Interpretation from "./Interpretation";
import BreakEvenChart from "./BreakEvenChart";

export default function ResultPanel({ data }: { data: any }) {
  if (!data) return null;

  return (
    <div className="mt-8 text-black">
      <div className="grid grid-cols-2 gap-4 text-center">
        <Metric title="Punto de equilibrio" value={`${data.breakEven.toFixed(2)} u`} />
        <Metric title="Margen de seguridad" value={`${data.marginSafety.toFixed(2)} %`} />
      </div>

      <Interpretation data={data} />
      <BreakEvenChart data={data} />
    </div>
  );
}

function Metric({ title, value }: any) {
  return (
    <div className="bg-zinc-100 p-4 rounded-lg">
      <p className="text-sm text-zinc-600">{title}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
