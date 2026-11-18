

function teste() {
let x: number = 10;
console.log("Início do programa");
if (x > 5) {
console.log("x é maior que 5");
return;
console.log("Essa linha é inatingível!");
}
console.log("Fim do programa");
}

console.log();

teste();


let valor; // Tipo implícito "any"
valor = 10;
valor = "teste";
console.log(valor);
let outroValor: number; // Tipo declarado
outroValor = 20;
console.log(outroValor);