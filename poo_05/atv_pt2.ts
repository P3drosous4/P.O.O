// questao

class Clientes2  {
    constructor(public id: number, 
        public nome : string,
         public cpf: string,
          public dataNascimento: Date,
           public contas: Conta2[]) {};

    
}


class Conta2 {
    id: number;
    numero: string;
    saldo: number;
    cliente: Clientes2| null// questao


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

    transferir(contaDestino: Conta2, valor: number): void {
        /* this.saldo = this.saldo - valor;
        contaDestino.saldo = contaDestino.saldo + valor;*/
        this.sacar(valor);
        contaDestino.depositar(valor);
    }

    consultarSaldo(): number {
        return this.saldo;
    }
}


class Banco2 {
    contas: Conta2[];
    clientes: Clientes2[];

    constructor() {
        this.contas = [];
        this.clientes = [];
    }

    inserirContas(conta: Conta2): void {
        this.contas.push(conta);
    }

    consultar(numero: string): Conta2 | null {

        for (let conta of this.contas) {
            if (conta.numero == numero) {
                return conta;
            }
        }

        return null;
    }

    consultarIndice(numero: string): number {

        for (let i = 0; i < this.contas.length; i++) {
            let conta = this.contas[i];
            if (conta && conta.numero== numero) {
                return i;
            }
        }

        return -1;
    }



    excluir(numero: string ): void {
        let indice = this.consultarIndice(numero);

        if (indice != -1) {
            for (let i = indice; i < this.contas.length - 1; i++) {
                this.contas[i] = this.contas[i + 1]!;
            }

            this.contas.pop();
        }

        
    }

    depositar(numero: string, valor: number): void {
        let contaProcurada: Conta2 | null = this.consultar(numero);

        if (contaProcurada) {
            contaProcurada.depositar(valor);
        }
    }

    sacar(id: string, valor: number): void {
        let contraProcurada: Conta2 | null = this.consultar(id);
        
        if (contraProcurada) {
            contraProcurada.sacar(valor);
        }
    }

    transferir(numOrigem: string, numDestino: string, valor: number): void {
        let contaOrigem: Conta2 | null = this.consultar(numOrigem);
        let contaDestino: Conta2 | null = this.consultar(numDestino);

        if (contaOrigem && contaDestino) {
            contaOrigem.transferir(contaDestino, valor);
        }
    }


    inserirCliente(cliente: Clientes2): void{
        this.clientes.push(cliente) //questao
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


    consultarPorNumero(numero:string): Conta2 | null{
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

        let conta = this.consultar(numeroConta)
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


    atualizar(conta: Conta2): void{
        let indice = this.consultarIndice(conta.numero)

        if(indice!==-1){
            this.contas[indice] = conta
        }
        else{
            console.log("a conta não pode ser encontrada.")
        }
    }


    //Receba um array de contas destino, um valor e realiza transferências para cada uma delas (ordem bancária;
    trasferenciaMulti(numDestino: string[], valor: number, numOrigem: string){
        let conta = this.consultar(numOrigem)

        if(!conta ||!numDestino){
            console.log("não foi possivei encontrar a conta origem ou não existe nenhuma conta para destino ")
            return 
        }

        if(conta.saldo<numDestino.length*valor){
            console.log("saldo isuficiente")
            return 
        }

        for(let destino of numDestino){
            this.transferir(conta.numero, destino, valor)
        }
    }



    listarContasClientes(cpf:string){
        let result = this.consultarPorcpf(cpf)
        if(result){
            return result.contas
        }                     
        else{
            console.log("sem contas existentes")
        }
    }


    retornarQtdeContas(){
        return this.contas.length
    }

    retornarSaldo(){
        let saldo:number = 0

        for(let c of this.contas){
            saldo+=c.saldo
        }

        return saldo
    }

    retornarMedia(){
        let media:number 
        let soma = this.retornarSaldo()
        let qtde = this.retornarQtdeContas()

        media = soma/qtde

        return media
    }


    mudancaTitularidade( cpfNovoCliente: string, numeroConta: string){

        let contaAtribuida = this.consultar(numeroConta)
        let novocliente = this.consultarPorcpf(cpfNovoCliente)

        if(!contaAtribuida || !novocliente){
            console.log("não foi encontrada nenhuma conta ou cliente correspondente.")
            return 
        }

        contaAtribuida.cliente = novocliente

        return contaAtribuida
    }
    

    excluirCliente( numeroConta: string, cpf: string){

        let contaCliente = this.consultar(numeroConta)
        if(!contaCliente){
            console.log("a conta não foi encontrada")
            return 
        }
        for(let c of this.contas){
            if(c.numero===contaCliente.numero){
                c.cliente = null 
                return this.clientes = this.clientes.filter(c=>c.cpf!==cpf)
                
            }
        }
    }
    excluirConta(cpfCliente: string, numeroConta: string){

        let contaexcluida = this.consultar(numeroConta)
        let cliente = this.consultarPorcpf(cpfCliente)


        if(!contaexcluida){
            console.log("a conta ou cliente não foram encontrados")
            return 
        }
        for(let c of this.contas){
            if(c.numero===contaexcluida.numero){
                c.cliente= null

                return this.contas = this.contas.filter(c=> c.numero!==numeroConta)
            }
        }
    }


    listarSemCliente(){
        let lista:Conta2[]


        for(let c of this.contas){
            if(c.cliente===null){

                lista = this.contas.filter(c=>c.cliente===null)
                
                return lista
            }
        }
        //mudança de titularidade
    }
}




