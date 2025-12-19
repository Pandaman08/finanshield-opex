export function calcularCVU(
  costosFijos: number,
  costoVariableUnitario: number,
  precioVenta: number,
  volumen: number
) {
  const margenContribucionUnitario = precioVenta - costoVariableUnitario;

  if (margenContribucionUnitario <= 0) {
    throw new Error("El margen de contribución debe ser mayor que cero");
  }

  const puntoEquilibrio = costosFijos / margenContribucionUnitario;

  const ingresos = precioVenta * volumen;
  const costosVariablesTotales = costoVariableUnitario * volumen;
  const costosTotales = costosFijos + costosVariablesTotales;
  const resultadoOperativo = ingresos - costosTotales;

  const margenSeguridad =
    volumen > 0 ? ((volumen - puntoEquilibrio) / volumen) * 100 : 0;

  return {
    margenContribucionUnitario,
    puntoEquilibrio,
    ingresos,
    costosVariablesTotales,
    costosTotales,
    resultadoOperativo,
    margenSeguridad,
  };
}
