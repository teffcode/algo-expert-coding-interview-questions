/*
  Levenshtein distance

  Write a function that takes in two strings and returns the minimum number of
  edit operations that need to be performed on the first string to obtain the
  second string.

  There are three edit operations: insertion of a character, deletion of a
  character, and substitution of a character for another.

  Sample input:

  "str1": "abc",
  "str2": "yabd"

  Sample output: 

  2 // insert "y"; substitute "c" for "d"
*/

function levenshteinDistance(str1, str2) {
  // Crear una matriz para almacenar los resultados intermedios
  const matrix = [];

  // Inicializar la matriz con valores base
  for (let i = 0; i <= str1.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= str2.length; j++) {
    matrix[0][j] = j;
  }

  // Llenar la matriz con los valores de distancia
  for (let i = 1; i <= str1.length; i++) {
    for (let j = 1; j <= str2.length; j++) {
      // Calcular la distancia mínima
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,        // Eliminación
        matrix[i][j - 1] + 1,        // Inserción
        matrix[i - 1][j - 1] + cost  // Sustitución
      );
    }
  }

  // El resultado final está en la esquina inferior derecha de la matriz
  return matrix[str1.length][str2.length];
}

const str1 = "abbbbbbbbb"
const str2 = "bbbbbbbbba"

// const str1 = "abc"
// const str2 = "yabcx"

levenshteinDistance(str1, str2)

/*
  EXPLICACIÓN:

  ¡Por supuesto! La fórmula `matrix[i][j] = Math.min(matrix[i-1][j] + 1, matrix[i][j-1] + 1, matrix[i-1][j-1] + cost)` es esencial para calcular la distancia de Levenshtein y se basa en tres operaciones fundamentales: inserción, eliminación y sustitución. Aquí está el razonamiento paso a paso:

  **Contexto:**
  La idea es construir una matriz donde cada celda `(i, j)` representa la distancia de Levenshtein entre los primeros `i` caracteres de la cadena `str1` y los primeros `j` caracteres de la cadena `str2`. La matriz se llena dinámicamente y se basa en los valores previos de la matriz.
  
  1. **Eliminación (`matrix[i-1][j] + 1`):**
     - `matrix[i-1][j]` representa la distancia hasta el caracter `i-1` de `str1` con respecto a los primeros `j` caracteres de `str2`.
     - Agregar 1 representa el costo de eliminar el caracter en la posición `i-1` de `str1`.
  
  2. **Inserción (`matrix[i][j-1] + 1`):**
     - `matrix[i][j-1]` representa la distancia hasta los primeros `i` caracteres de `str1` con respecto al caracter `j-1` de `str2`.
     - Agregar 1 representa el costo de insertar el caracter en la posición `j-1` de `str2`.
  
  3. **Sustitución (`matrix[i-1][j-1] + cost`):**
     - `matrix[i-1][j-1]` representa la distancia hasta el caracter `i-1` de `str1` con respecto al caracter `j-1` de `str2`.
     - `cost` es 0 si los caracteres en las posiciones `(i-1, j-1)` son iguales (sin costo de sustitución) y 1 si son diferentes.
  
  4. **Selección del Mínimo:**
     - `Math.min(...)` se utiliza para seleccionar el mínimo entre las tres operaciones anteriores.
     - Esto representa la opción más económica entre inserción, eliminación y sustitución para llegar a la configuración `(i, j)` desde las configuraciones anteriores.
  
  **Recorrido de las Cadenas:**
  La idea es llenar la matriz en un bucle doble, donde `i` recorre las filas y `j` recorre las columnas. Cada celda de la matriz representa la distancia de Levenshtein acumulativa entre las subcadenas correspondientes de `str1` y `str2`.
  
  En resumen, la fórmula tiene en cuenta los tres posibles tipos de operaciones (inserción, eliminación y sustitución) y selecciona la opción más económica en términos de distancia de edición. El algoritmo utiliza la programación dinámica para construir eficientemente la matriz de distancias.

  ¡Usemos un ejemplo con las cadenas "kitten" y "sitting" para ilustrar cómo funciona la iteración en cada caso!
  
  **Cadenas de ejemplo:**
  - `str1`: "kitten"
  - `str2`: "sitting"
  
  **Matriz de distancias (inicial):**
  ```
     |   | s | i | t | t | i | n | g |
  ---|---|---|---|---|---|---|---|---|
     | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
   k | 1 |   |   |   |   |   |   |   |
   i | 2 |   |   |   |   |   |   |   |
   t | 3 |   |   |   |   |   |   |   |
   t | 4 |   |   |   |   |   |   |   |
   e | 5 |   |   |   |   |   |   |   |
   n | 6 |   |   |   |   |   |   |   |
  ```
  
  **Iteración 1 (`i = 1`, `j = 1`):**
  - Consideramos la subcadena de `str1` hasta el primer carácter: "k".
  - Consideramos los primeros caracteres de `str2` hasta el primer carácter: "s".
  - Pregunta: ¿Cuántas operaciones son necesarias para hacer que "k" sea igual a "s"?
  - Respuesta: Necesitamos una operación de sustitución (cost = 1).
  - `matrix[1][1] = Math.min(matrix[0][1] + 1, matrix[1][0] + 1, matrix[0][0] + 1) = Math.min(1, Infinity, 1) = 1`
  
  **Matriz después de la iteración 1:**
  ```
     |   | s | i | t | t | i | n | g |
  ---|---|---|---|---|---|---|---|---|
     | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
   k | 1 | 1 |   |   |   |   |   |   |
   i | 2 |   |   |   |   |   |   |   |
   t | 3 |   |   |   |   |   |   |   |
   t | 4 |   |   |   |   |   |   |   |
   e | 5 |   |   |   |   |   |   |   |
   n | 6 |   |   |   |   |   |   |   |
  ```
  
  **Iteración 2 (`i = 2`, `j = 2`):**
  - Consideramos la subcadena de `str1` hasta el segundo carácter: "ki".
  - Consideramos los primeros caracteres de `str2` hasta el segundo carácter: "si".
  - Pregunta: ¿Cuántas operaciones son necesarias para hacer que "ki" sea igual a "si"?
  - Respuesta: Necesitamos una operación de sustitución (cost = 1).
  - `matrix[2][2] = Math.min(matrix[1][2] + 1, matrix[2][1] + 1, matrix[1][1] + 1) = Math.min(3, 2, 2) = 2`
  
  **Matriz después de la iteración 2:**
  ```
     |   | s | i | t | t | i | n | g |
  ---|---|---|---|---|---|---|---|---|
     | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
   k | 1 | 1 | 2 |   |   |   |   |   |
   i | 2 |   |   |   |   |   |   |   |
   t | 3 |   |   |   |   |   |   |   |
   t | 4 |   |   |   |   |   |   |   |
   e | 5 |   |   |   |   |   |   |   |
   n | 6 |   |   |   |   |   |   |   |
  ```
  
  Este proceso continúa hasta que la matriz está completamente llena, y la esquina inferior derecha (`matrix[6][7]`) contendrá la distancia de Levenshtein entre las dos cadenas. Cada celda de la matriz representa la distancia entre las subcadenas correspondientes de `str1` y `str2`.
  
  **Iteración 3 (`i = 3`, `j = 3`):**
  - Consideramos la subcadena de `str1` hasta el tercer carácter: "kit".
  - Consideramos los primeros caracteres de `str2` hasta el tercer carácter: "sit".
  - Pregunta: ¿Cuántas operaciones son necesarias para hacer que "kit" sea igual a "sit"?
  - Respuesta: Necesitamos una operación de sustitución (cost = 1).
  - `matrix[3][3] = Math.min(matrix[2][3] + 1, matrix[3][2] + 1, matrix[2][2] + 1) = Math.min(3, 3, 3) = 3`
  
  **Matriz después de la iteración 3:**
  ```
     |   | s | i | t | t | i | n | g |
  ---|---|---|---|---|---|---|---|---|
     | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
   k | 1 | 1 | 2 | 3 |   |   |   |   |
   i | 2 |   |   |   |   |   |   |   |
   t | 3 |   |   |   |   |   |   |   |
   t | 4 |   |   |   |   |   |   |   |
   e | 5 |   |   |   |   |   |   |   |
   n | 6 |   |   |   |   |   |   |   |
  ```
  
  **Iteración 4 (`i = 4`, `j = 4`):**
  - Consideramos la subcadena de `str1` hasta el cuarto carácter: "kitt".
  - Consideramos los primeros caracteres de `str2` hasta el cuarto carácter: "sitt".
  - Pregunta: ¿Cuántas operaciones son necesarias para hacer que "kitt" sea igual a "sitt"?
  - Respuesta: No necesitamos ninguna operación porque los caracteres son iguales.
  - `matrix[4][4] = Math.min(matrix[3][4], matrix[4][3], matrix[3][3]) = Math.min(4, 4, 3) = 3`
  
  **Matriz después de la iteración 4:**
  ```
     |   | s | i | t | t | i | n | g |
  ---|---|---|---|---|---|---|---|---|
     | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
   k | 1 | 1 | 2 | 3 | 4 |   |   |   |
   i | 2 |   |   |   |   |   |   |   |
   t | 3 |   |   |   |   |   |   |   |
   t | 4 |   |   |   |   |   |   |   |
   e | 5 |   |   |   |   |   |   |   |
   n | 6 |   |   |   |   |   |   |   |
  ```
  
  **Iteración 5 (`i = 5`, `j = 5`):**
  - Consideramos la subcadena de `str1` hasta el quinto carácter: "kitte".
  - Consideramos los primeros caracteres de `str2` hasta el quinto carácter: "sitti".
  - Pregunta: ¿Cuántas operaciones son necesarias para hacer que "kitte" sea igual a "sitti"?
  - Respuesta: Necesitamos una operación de sustitución (cost = 1).
  - `matrix[5][5] = Math.min(matrix[4][5] + 1, matrix[5][4] + 1, matrix[4][4] + 1) = Math.min(5, 5, 4) = 4`
  
  **Matriz después de la iteración 5:**
  ```
     |   | s | i | t | t | i | n | g |
  ---|---|---|---|---|---|---|---|---|
     | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
   k | 1 | 1 | 2 | 3 | 4 | 5 |   |   |
   i | 2 |   |   |   |   |   |   |   |
   t | 3 |   |   |   |   |   |   |   |
   t | 4 |   |   |   |   |   |   |   |
   e | 5 |   |   |   |   |   |   |   |
   n | 6 |   |   |   |   |   |   |   |
  ```
  
  **Iteración 6 (`i = 6`, `j = 6`):**
  - Consideramos la subcadena de `str1` hasta el sexto carácter: "kitten".
  - Consideramos los primeros caracteres de `str2` hasta el sexto carácter: "sittin".
  - Pregunta: ¿Cuántas operaciones son necesarias para hacer que "kitten" sea igual a "sittin"?
  - Respuesta: Necesitamos una operación de eliminación (cost = 1).
  - `matrix[6][6] = Math.min(matrix[5][6] + 1, matrix[6][5] + 1, matrix[5][5] + 1) = Math.min(6, 6, 5) = 5`
  
  **Matriz después de la iteración 6:**
  ```
     |   | s | i | t | t | i | n | g |
  ---|---|---|---|---|---|---|---|---|
     | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
   k | 1 | 1 | 2 | 3 | 4 | 5 | 6 |   |
   i | 2 |   |   |   |   |   |   |   |
   t | 3 |   |   |   |   |   |   |   |
   t | 4 |   |   |   |   |   |   |   |
   e | 5 |   |   |   |   |   |   |   |
   n | 6 |   |   |   |   |   |   |   |
  ```
  
  **Iteración 7 (`i = 6`, `j = 7`):**
  - Consideramos la subcadena de `str1` hasta el sexto carácter: "kitten".
  - Consideramos los primeros caracteres de `str2` hasta el séptimo carácter: "sittin**g**".
  - Pregunta: ¿Cuántas operaciones son necesarias para hacer que "kitten" sea igual a "sitting"?
  - Respuesta: Necesitamos una operación de inserción (cost = 1).
  - `matrix[6][7] = Math.min(matrix[5][7] + 1, matrix[6][6] + 1, matrix[5][6] + 1) = Math.min(7, 6, 6) = 6`
  
  **Matriz después de la iteración 7:**
  ```
     |   | s | i | t | t | i | n | g |
  ---|---|---|---|---|---|---|---|---|
     | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
   k | 1 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
   i | 2 |   |   |   |   |   |   |   |
   t | 3 |   |   |   |   |   |   |   |
   t | 4 |   |   |   |   |   |   |   |
   e | 5 |   |   |   |   |   |   |   |
   n | 6 |   |   |   |   |   |   |   |
  ```

**Resultado final:**
La distancia de Levenshtein entre "kitten" y "sitting" es 6, y este valor se encuentra en la esquina inferior derecha de la matriz (`matrix[6][7]`).

La matriz representa la acumulación de operaciones (inserciones, eliminaciones y sustituciones) necesarias para convertir cada subcadena de `str1` en la correspondiente subcadena de `str2`. Cada celda `matrix[i][j]` representa la distancia de Levenshtein entre las subcadenas de `str1` y `str2` que terminan en los caracteres `i-1` y `j-1` respectivamente.
*/
