const numeros = [2,4,6,8,10];

let dobro = numeros.map((num) => {return num*2});

console.log("Lista dobrada: ", dobro);

let soma = dobro.reduce((acumulador, numero) => {return acumulador + numero}, 0);

console.log(`soma :${soma}`)