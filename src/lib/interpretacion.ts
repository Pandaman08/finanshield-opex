export function interpretarCVU(
  volumen: number,
  puntoEquilibrio: number,
  resultadoOperativo: number,
  margenSeguridad: number
) {
  let situacion = "";
  let riesgo = "";

  if (volumen < puntoEquilibrio) {
    situacion =
      "La empresa opera por debajo del punto de equilibrio, generando pérdidas operativas.";
  } else if (volumen === puntoEquilibrio) {
    situacion =
      "La empresa se encuentra en su punto de equilibrio, sin pérdidas ni utilidades.";
  } else {
    situacion =
      "La empresa opera por encima del punto de equilibrio, generando utilidades.";
  }

  if (margenSeguridad < 10) {
    riesgo = "El margen de seguridad es bajo, lo que implica un alto riesgo operativo.";
  } else if (margenSeguridad < 25) {
    riesgo = "El margen de seguridad es moderado, con un riesgo operativo controlado.";
  } else {
    riesgo = "El margen de seguridad es alto, indicando un bajo riesgo operativo.";
  }

  return {
    situacion,
    riesgo,
  };
}
