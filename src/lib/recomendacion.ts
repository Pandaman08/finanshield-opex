export function recomendarAccion(
  resultadoOperativo: number,
  margenSeguridad: number
) {
  if (resultadoOperativo < 0) {
    return "Se recomienda revisar la estructura de costos y evaluar estrategias para incrementar el volumen de ventas o el margen de contribución.";
  }

  if (margenSeguridad < 15) {
    return "Se recomienda aumentar el margen de seguridad mediante reducción de costos variables o incremento del precio de venta.";
  }

  return "La estructura actual de costos y ventas es adecuada; se recomienda mantener la estrategia operativa.";
}
