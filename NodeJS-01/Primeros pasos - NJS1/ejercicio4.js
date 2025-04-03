// Importar el archivo 'calculos' que contiene las funciones de operaciones matemáticas
const calculos = require('./calculos');

// Mostrar en consola el resultado de la suma de 5 + 3 utilizando la función suma del módulo 'calculos'
console.log('Suma de 5 + 3: ', calculos.suma(5, 3));

// Mostrar en consola el resultado de la resta de 8 - 6 utilizando la función resta del módulo 'calculos'
console.log('Resta de 8 - 6: ', calculos.resta(8, 6));

// Mostrar en consola el resultado de la multiplicación de 3 * 11 utilizando la función multiplicacion del módulo 'calculos'
console.log('Multiplicación de 3 * 11: ', calculos.multiplicacion(3, 11));

// Mostrar en consola el resultado de la división de 30 / 5 utilizando la función division del módulo 'calculos'
console.log('División de 30 / 5: ', calculos.division(30, 5));
