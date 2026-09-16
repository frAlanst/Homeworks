let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
let array2d = [[1, 2, 3],[4, 5, 6],[7, 8, 9]];

//Funcion every(), esta recorrerá el array y verificará si todos los elementos cumplen con la condición, si es así, retornará true, de lo contrario retornará false.
function esMenorQueDiez(array) {
    if(array.every(element => element < 10)) {
        return true;
    }else{
        return false;
    }
}

//Funcion some(), esta recorrerá el array y verificará si al menos un elemento cumple con la condición, si es así, retornará true, de lo contrario retornará false.
function esAlgunoMayorQueOcho(array) {
    if(array.some(element => element > 8)){
        return true;
    }else{
        return false;
    }
}

//Funcion shift(), esta eliminará el primer elemento del array y retornará dicho elemento.
function borrarElementoInicio(array){
    let elementoEliminado = array.shift();
    return elementoEliminado;
}

//funcion pop(), esta eliminará el último elemento del array y retornará dicho elemento.
function borrarElementoFinal(array){
    let elementoEliminado = array.pop();
    return elementoEliminado;
}

//funcion unshift(), esta agregará un elemento al inicio del array y retornará el array modificado.
function agregarElementoInicio(array, elemento){
    array.unshift(elemento);
    return array;
}

//funcion push(), esta agregará un elemento al final del array y retornará el array modificado.
function agregarElementoFinal(array, elemento){
    array.push(elemento);
    return array;
}

//funcion find(), esta recorrerá el array y retornará el primer elemento que cumpla con la condición, si no encuentra ningún elemento que cumpla con la condición, retornará undefined.
function encontrarElementoIgualAValor(array, numero) {
    let elementoEncontrado = array.find(element => element === numero);
    return elementoEncontrado;
}

//funcion concat(), esta concatenará dos arrays y retornará el array resultante.
function concatenarArray(array1,array2){
    let arrayConcatenado = array1.concat(array2);
    return arrayConcatenado;
}

//funcion at(), esta retornará el elemento del array que se encuentra en la posición indicada, si la posición es negativa, contará desde el final del array.
function encontrarElementoPorPosicion(array, posicion) {
    let elementoEncontrado = array.at(posicion);
    return elementoEncontrado;
}

//funcion copyWithin(), esta copiará una secuencia de elementos del array y los pegará en otra posición del mismo array, retornando el array modificado.
function copiarSecuencia(array, inicio, fin) {
    let arrayModificado = array.copyWithin(inicio, fin);
    return arrayModificado; 
}

//funcion entries(), esta retornará un objeto iterador que contiene los pares clave-valor de cada elemento del array.
function listaPares(array){
    let pares = [...array.entries()]; // Convertimos el iterador a un arreglo
    return pares;
}

//funcion findIndex(), esta recorrerá el array y retornará el índice del primer elemento que cumpla con la condición, si no encuentra ningún elemento que cumpla con la condición, retornará -1.
function findIndex(array, numero) {
    let indice = array.findIndex(element => element === numero);
    return indice;
}

//funcion findLastIndex(), esta recorrerá el array y retornará el índice del último elemento que cumpla con la condición, si no encuentra ningún elemento que cumpla con la condición, retornará -1.
function findLastIndex(array, numero) {
    let indice = array.findLastIndex(element => element === numero);
    return indice;
}

//funcion findLast(), esta recorrerá el array y retornará el último elemento que cumpla con la condición, si no encuentra ningún elemento que cumpla con la condición, retornará undefined.
function findLast(array, numero) {
    let elementoEncontrado = array.findLast(element => element === numero);
    return elementoEncontrado;
}

//funcion fill(), esta llenará el array con un valor específico desde el índice de inicio hasta el índice de fin, retornando el array modificado.
function fill(array, valor, inicio, fin) {
    let arrayModificado = array.fill(valor, inicio, fin);
    return arrayModificado;
}   

//funcion flat(), esta aplanará un array multidimensional hasta la profundidad especificada, retornando un nuevo array.
function flat(array, profundidad) {
    let arrayAplanado = array.flat(profundidad);
    return arrayAplanado;
    console.log(flat(array2d, 1)); // Output: [1, 2, 3, 4, 5, 6, 7, 8, 9]
}

//funcion flatMap(), esta aplicará una función a cada elemento del array y luego aplanará el resultado en un nuevo array.
function flatmap(array, profundidad) {
    let resultado = array.flatMap(fila => fila.map(num => num * 2));
    console.log(resultado); // Output: [2, 4, 6, 8, 10, 12, 14, 16, 18]
}

//funcion forEach(), esta ejecutará una función para cada elemento del array, pero no retornará ningún valor.
function forEach(array) {
    array.forEach(element => {
        console.log(element); 
    });
}

//forEach(array); Output: 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20

//funcion includes(), esta verificará si un elemento específico se encuentra en el array, retornando true si lo encuentra y false si no.
function includes(array, numero) {
    let resultado = array.includes(numero);
    return resultado; 
}

//funcion map(), aplica una función a cada elemento y retorna un nuevo array; con [1,2,3] y f=x*2 retornará [2,4,6]
function mapearArray(array) {
    return array.map(x => x * 2);
}

//funcion filter(), devuelve un nuevo array con los elementos que cumplen la condición; con [1,2,3,4] y condición par retornará [2,4]
function filtrarArray(array) {
    return array.filter(x => x % 2 === 0);
}

//funcion reduce(), reduce todos los elementos a un único valor usando un acumulador; con [1,2,3] y suma retornará 6
function reducirArray(array) {
    return array.reduce((acc, cur) => acc + cur, 0);
}

//funcion reduceRight(), igual que reduce pero itera de derecha a izquierda; con [1,2,3] y suma retornará 6
function reducirDerechaArray(array) {
    return array.reduceRight((acc, cur) => acc + cur, 0);
}

//funcion slice(), devuelve una porción (no muta el array original); con [1,2,3,4] slice(1,3) retornará [2,3]
function cortarArray(array, inicio, fin) {
    return array.slice(inicio, fin);
}

//funcion splice(), modifica el array removiendo e insertando elementos y retorna los elementos eliminados; con [1,2,3,4] splice(1,2) retornará [2,3] y el array quedará [1,4]
function usarSplice(array, inicio, cuantos, ...items) {
    return array.splice(inicio, cuantos, ...items);
}

//funcion indexOf(), retorna el índice de la primera aparición o -1 si no existe; con [1,2,3] indexOf(2) retornará 1
function indiceDe(array, elemento) {
    return array.indexOf(elemento);
}

//funcion lastIndexOf(), retorna el índice de la última aparición o -1 si no existe; con [1,2,1] lastIndexOf(1) retornará 2
function ultimoIndiceDe(array, elemento) {
    return array.lastIndexOf(elemento);
}

//funcion join(), une los elementos en una cadena usando el separador; con [1,2,3] join('-') retornará "1-2-3"
function unirArray(array, separador = ',') {
    return array.join(separador);
}

//funcion sort(), ordena los elementos (lexicográficamente por defecto); con [3,1,2] retornará [1,2,3]
function ordenarArray(array) {
    return array.slice().sort((a, b) => a - b);
}

//funcion reverse(), devuelve una copia del array invertida (no muta el original en este ejemplo); con [1,2,3] retornará [3,2,1]
function invertirArray(array) {
    return array.slice().reverse();
}

//funcion keys(), retorna un array con las claves (índices) del array; con ['a','b'] retornará [0,1]
function clavesArray(array) {
    return [...array.keys()];
}

//funcion values(), retorna un array con los valores del array; con [1,2] retornará [1,2]
function valoresArray(array) {
    return [...array.values()];
}

//funcion toString(), convierte el array a cadena; con [1,2,3] retornará "1,2,3"
function arrayAString(array) {
    return array.toString();
}

//funcion isArray(), determina si el valor es un array (método estático); con [1,2] retornará true
function esArray(valor) {
    return Array.isArray(valor);
}

//funcion from(), crea un array a partir de un objeto iterable; con 'hola' retornará ['h','o','l','a']
function crearDesde(iterable) {
    return Array.from(iterable);
}

//funcion of(), crea un nuevo array a partir de los argumentos dados; con (1,2,3) retornará [1,2,3]
function crearConOf(...elementos) {
    return Array.of(...elementos);
}

