function exibir(...exibicao: string[]){
    let acumulador: string = "";
    for(let palavras of exibicao){
        acumulador+=palavras;
    };

    console.log(acumulador);
}

exibir("a","b", "c" );
