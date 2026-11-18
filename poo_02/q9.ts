function sortearNomes(vetor:string[]) : void{
    let indice: number = Math.floor(Math.random() * vetorNomes.length);
    console.log(`Nome sorteado> ${vetorNomes[indice]}`);
}


let vetorNomes: string[] = ["Ana", "Bruno", "Carlos"];

sortearNomes(vetorNomes);