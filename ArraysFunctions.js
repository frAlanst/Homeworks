let array = [1, 2, 3, 4, 5];

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