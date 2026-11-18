class retangulo{
    base: number;
    altura: number;

    constructor(base:number, altura:number){
        this.base = base;
        this.altura = altura;
    }

    CalcularAreaRetangulo(){
        return this.base * this.altura;
    }

    CalcularPerimetro() : number {
        return 2*(this.base+this.altura);
    }
}


const primeiro_retangulo = new retangulo(2, 5);

console.log("Perímetro: ",primeiro_retangulo.CalcularPerimetro());
console.log("Àrea: ",primeiro_retangulo.CalcularAreaRetangulo() );


class Circulo{
    raio: number;
    pi: number = 3.14;

    constructor(raio:number){
        this.raio = raio;
    }

    CalcularPerimetroCirculo(){
        return this.pi *2 * this.raio;
    }

    CalcularAreaCirculo(){
        return 2 * this.pi * this.raio * this.raio;
    }


}


let circulo1 = new Circulo(6);

console.log(`o perimetro do circulo1 eh:  ${circulo1.CalcularPerimetroCirculo()}`);

console.log(`a area do circulo1 eh ${circulo1.CalcularAreaCirculo()}`);



class SituacaoFinanceira{
    Valorcreditos: number;
    ValorDebitos: number;

    constructor(Valorcreditos: number, ValorDebitos: number ){
        this.Valorcreditos = Valorcreditos;
        this.ValorDebitos = ValorDebitos;
    }

    CalcularSaldo(){
        if (this.Valorcreditos>this.ValorDebitos){
            return this.Valorcreditos-this.ValorDebitos;
        };

        return this.ValorDebitos - this.Valorcreditos;
    }


}


let situacao_financeira = new SituacaoFinanceira(400, 200)

console.log(`situação financeira: ${situacao_financeira.CalcularSaldo()}`);


class Pessoa{
    nome: string;
    idade: number;

    constructor(nome: string, idade: number){
        this.nome = nome;
        this.idade = idade;
    };

    apresentar(){
        return `Meu nome eh ${this.nome} e eu tenho ${this.idade} anos de idade`;
    };


}


let apresentacao = new Pessoa("pedro", 20);

console.log(apresentacao.apresentar());

class Produto{
    nome: string;
    preco: number;
    percentual: number;

    constructor(nome:string, preco: number, percentual: number){
        this.nome = nome;
        this.preco = preco;
        this.percentual = percentual;
    }


    AplicarDesconto(){
        let desconto: number = this.percentual/100;

        return this.preco - (this.preco * desconto);
    }

    EmitirOrcamento(){
        return `Produto: ${this.nome}, Preço: R$ ${this.preco.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}
Desconto: ${this.percentual}% → Novo preço: R$ ${this.AplicarDesconto().toLocaleString("pt-BR",{style: "currency", currency: "BRL"})}`
    }

    
}


let produto1 = new Produto("Arroz", 5.9, 20);

produto1.AplicarDesconto();

console.log(produto1.EmitirOrcamento());


class Numero{
    valor: number;

    constructor(valor:number){
        this.valor = valor;
    }

    ehpar(){
        switch (this.valor%2==0){
            case true:
                return true
            case false:
                return false
        }
    }

    ehimpar(){
        switch (this.valor%2!=0){
            case true:
                return true
            case false:
                return false
        }
    }
}

let num = new Numero(3);

console.log(`o número ${num.valor} é par ? R-> ${num.ehpar()}`)

console.log(`o número ${num.valor} é impar ? R-> ${num.ehimpar()}`)
