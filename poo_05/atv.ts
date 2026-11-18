// questao

class Clientes  {
    constructor(public id: number, 
        public nome : string,
         public cpf: string,
          public dataNascimento: Date,
           public contas: Conta[]) {};

    
}


class Conta {
    id: number;
    numero: string;
    saldo: number;
    cliente: Clientes| null// questao


    constructor(id: number, numero: string, saldo: number, public dataAbertura: Date) {
        this.id = id;
        this.numero = numero;
        this.saldo = saldo;
        this.cliente = null
    }

    depositar(valor: number): void {
        this.saldo = this.saldo + valor;
    }

    sacar(valor: number): void {
        this.saldo = this.saldo - valor;
    }

    transferir(contaDestino: Conta, valor: number): void {
        /* this.saldo = this.saldo - valor;
        contaDestino.saldo = contaDestino.saldo + valor;*/
        this.sacar(valor);
        contaDestino.depositar(valor);
    }

    consultarSaldo(): number {
        return this.saldo;
    }
}


class Banco {
    contas: Conta[];
    clientes: Clientes[];

    constructor() {
        this.contas = [];
        this.clientes = [];
    }

    inserirContas(conta: Conta): void {
        this.contas.push(conta);
    }

    consultar(id: number): Conta | null {

        for (let conta of this.contas) {
            if (conta.id == id) {
                return conta;
            }
        }

        return null;
    }

    consultarIndice(id: number): number {

        for (let i = 0; i < this.contas.length; i++) {
            let conta = this.contas[i];
            if (conta && conta.id == id) {
                return i;
            }
        }

        return -1;
    }

    excluir(id: number): void {
        let indice = this.consultarIndice(id);

        if (indice != -1) {
            for (let i = indice; i < this.contas.length - 1; i++) {
                this.contas[i] = this.contas[i + 1]!;
            }

            this.contas.pop();
        }

        
    }

    depositar(id: number, valor: number): void {
        let contaProcurada: Conta | null = this.consultar(id);

        if (contaProcurada) {
            contaProcurada.depositar(valor);
        }
    }

    sacar(id: number, valor: number): void {
        let contraProcurada: Conta | null = this.consultar(id);
        
        if (contraProcurada) {
            contraProcurada.sacar(valor);
        }
    }

    transferir(idOrigem: number, idDestino: number, valor: number): void {
        let contaOrigem: Conta | null = this.consultar(idOrigem);
        let contaDestino: Conta | null = this.consultar(idDestino);

        if (contaOrigem && contaDestino) {
            contaOrigem.transferir(contaDestino, valor);
        }
    }


    inserirCliente(cliente: Clientes): void{
        this.clientes.push(cliente) //questao
    }


    consultarCliente(cpf:string) {
        for (let escolhido of this.clientes){
            if( escolhido.cpf=== cpf){
                return escolhido
            }
        }
        // let result = this.clientes.find(c=> c.cpf === cpf);
        // return result ? result.nome : undefined;

        
    }


    consultarPorcpf(cpf: string){
        for(let cadastro of this.clientes ){
            if(cadastro.cpf===cpf){
                console.log(`o cliente ${cadastro.nome} foi encontrado`)
                return cadastro
            }
        }
        console.log("não foi possivel encontrar o cliente")
        return 
    }


    consultarPorNumero(numero:string): Conta | null{
        for(let num of this.contas){
            if (num.numero===numero){
                console.log("numero encontrado com suceso !")
                return num
            }
        }

        console.log("o numero nao foi encontrado")
        return null
    }


    associarContaCliente(numeroConta: string, cpfCliente:string){

        let conta = this.consultarPorNumero(numeroConta)
        let cliente= this.consultarPorcpf(cpfCliente)


        if(!conta || !cliente){
            console.log("não foi possivel encontara conta ou cpf")
            return
        }

        if(conta.cliente!==null){
            console.log("essa cinta ja esta associada a um cliente")
            return 
        }

        for(let buscas of cliente.contas){
            if(buscas.numero===numeroConta){
                console.log("Esse cliente ja esta associadoa a essa conta !")
                return 
            }   
        }


        conta.cliente=cliente
        cliente.contas.push(conta);

    
        
    }


    listarContasClientes(cpf:string){
        let result = this.consultarCliente(cpf)
        if(result){
            return result.contas
        }
        else{
            console.log("sem contas existentes")
        }
    }
    
}



