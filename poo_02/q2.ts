function listagem(vetor: number[]) {
    let comprimento = vetor.length;
    
    let resultado = "";

    vetor.forEach((numero, index) => {
        resultado+=numero;

        if (index !== comprimento - 1){
            resultado+="-";
        }
    })

    return resultado

}

let vetor01:number[] = [10,8,9,2,3,4,5,6,7];

console.log(listagem(vetor01))