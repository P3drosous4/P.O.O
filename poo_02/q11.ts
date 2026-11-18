class Sorteio{
    possibilidades:string[];

    constructor(){
        this.possibilidades = [];
    };

    adicionar(nome:string):void{
        this.possibilidades.push(nome);
    }

    sortear(): string{
        let indice = Math.floor(Math.random() * this.possibilidades.length);
        
        return `Nome sorteado: ${this.possibilidades[indice]}`;
    };
};


let sorteioone = new Sorteio();

sorteioone.adicionar("pedro");
sorteioone.adicionar("maria");
sorteioone.adicionar("eduarda");
sorteioone.adicionar("josé");

console.log(sorteioone.sortear());