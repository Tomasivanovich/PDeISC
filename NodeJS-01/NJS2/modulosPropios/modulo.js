// Función que calcula el área de un círculo dado su radio
export const areaCirculo = (radio) => {
  const pi = Math.PI;  // Se obtiene el valor de PI desde la clase Math
  return pi * Math.pow(radio, 2);  // Se aplica la fórmula del área del círculo: A = π * r^2
};

// Función que calcula el volumen de un cilindro dado el radio y la altura
export const volumenCilindro = (radio, altura) => {
  const pi = Math.PI;  // Se obtiene el valor de PI desde la clase Math
  return pi * Math.pow(radio, 2) * altura;  // Se aplica la fórmula del volumen del cilindro: V = π * r^2 * h
};

// Función que calcula el área de un triángulo dado los tres lados usando la fórmula de Herón
export const areaTriangulo = (a, b, c) => {
  // Semiperímetro: la mitad del perímetro del triángulo
  const s = (a + b + c) / 2;

  // Fórmula de Herón para el área de un triángulo con lados a, b y c
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

  // Verificación de si los lados proporcionados forman un triángulo válido
  if (isNaN(area) || area <= 0) {
    return { mensaje: "Los lados proporcionados no forman un triángulo válido." };  // Si no es válido, se devuelve un mensaje de error
  }

  return { area };  // Si es válido, se devuelve el área calculada
};
