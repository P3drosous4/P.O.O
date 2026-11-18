class JogoImparPar{
    Numerojogador:number;
    Numeromaquina:number;


    constructor(Numerojogador:number){
        this.Numerojogador = Numerojogador;
        this.Numeromaquina = 0;
    };

    sortearMaquina(){
        let aleatorio = Math.floor(Math.random() * 11);

        this.Numeromaquina = aleatorio;

        return this.Numeromaquina;
    }

    resultado(){
        let soma = this.Numeromaquina + this.Numerojogador;

        if (soma%2===0){
            return "Par";
        }
        else if (soma%2!==0){
            return "Ímpar";
        };
    }
    
    vencedor(){
        let soma = this.Numeromaquina + this.Numerojogador;

        if (soma%2===0){
            return "Jogador";
        }
        else if (soma%2!==0){
            return "Máquina";
        };
    // a ativididade condsoder o jogador como par e a máquina como impar
    }
}



let jogo1 = new JogoImparPar(3);

jogo1.sortearMaquina();

console.log(`O resultado foi ${jogo1.resultado()}\n`);
console.log(`O vencedor foi : ${jogo1.vencedor()}`);

