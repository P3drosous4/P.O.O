let vetor: number[] = [1,2,3];

vetorSomaDobrada = vetor.map((numero)=>{return numero*2}).reduce((num, acumulador)=>{return acumulador+=num}, 0);

console.log(vetorSomaDobrada);