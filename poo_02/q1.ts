function saudacao (nome: string, pronome: string = "Sr." )  {
    return `${pronome} ${nome}`;
};


let primeira_saudacao = saudacao("Sávia", "Sra.");

console.log(primeira_saudacao);


