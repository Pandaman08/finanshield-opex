export default function Interpretation({ data }: { data: any }) {
  let message = "";

  if (data.marginSafety < 10) {
    message =
      "El proyecto presenta un alto riesgo operativo. Pequeñas variaciones en las ventas pueden generar pérdidas.";
  } else if (data.marginSafety < 30) {
    message =
      "El proyecto tiene un riesgo operativo moderado. Se recomienda monitorear el comportamiento de las ventas.";
  } else {
    message =
      "El proyecto presenta un margen de seguridad adecuado y una posición financiera estable.";
  }

  return (
    <div className="mt-6 bg-zinc-50 p-4 rounded-lg">
      <h3 className="font-semibold mb-2">Interpretación inteligente</h3>
      <p className="text-sm text-zinc-700">{message}</p>
    </div>
  );
}
