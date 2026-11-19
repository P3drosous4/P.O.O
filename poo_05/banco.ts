// questao

export class Clientes  {
    constructor(public id: number, 
        public nome : string,
         public cpf: string,
          public dataNascimento: Date,
           public contas: Conta[] = []) {};

    
}


export class Conta {
    id: number;
    numero: string;
    saldo: number;
    cliente: Clientes | null// questao


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


export class Banco {
    contas: Conta[];
    clientes: Clientes[];

    constructor() {
        this.contas = [];
        this.clientes = [];
    }

    inserirContas(conta: Conta): void {
        this.contas.push(conta);
    }

    consultar(numero: string): Conta | null {

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
        let contaProcurada: Conta | null = this.consultar(numero);

        if (contaProcurada) {
            contaProcurada.depositar(valor);
        }
    }

    sacar(id: string, valor: number): void {
        let contraProcurada: Conta | null = this.consultar(id);
        
        if (contraProcurada) {
            contraProcurada.sacar(valor);
        }
    }

    transferir(numOrigem: string, numDestino: string, valor: number): void {
        let contaOrigem: Conta | null = this.consultar(numOrigem);
        let contaDestino: Conta | null = this.consultar(numDestino);

        if (contaOrigem && contaDestino) {
            contaOrigem.transferir(contaDestino, valor);
        }
    }


    inserirCliente(cliente: Clientes): void{
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

        let conta = this.consultar(numeroConta)
        let cliente= this.consultarPorcpf(cpfCliente)


        if(!conta || !cliente){
            console.log("não foi possivel encontara conta ou cpf")
            return
        }

        if(conta.cliente!==null){
            console.log("essa conta ja esta associada a um cliente")
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


    atualizar(conta: Conta): void{
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
        let lista:Conta[] = []


        for(let c of this.contas){
            if(c.cliente===null){

                lista = this.contas.filter(c=>c.cliente===null)
                
                return lista
            }
        }
    }
    

    carregarDados(){
        let c1 = new Clientes (1, "carlos", "081.934.567-00",new Date(2000, 3, 27), )
        let c2 = new Clientes (2, "elaine", "081.546.789-00",new Date(2000, 3, 27), )
        let c3 = new Clientes (3, "jose", "081.123.089-00",new Date(2000, 3, 27), )
        let c4 = new Clientes (4, "pedro", "081.687.260-00",new Date(2000, 3, 27), )
        let c5 = new Clientes (5, "ana", "081.274.370-00",new Date(2000, 3, 27), )


        this.inserirCliente(c1)
        this.inserirCliente(c2)
        this.inserirCliente(c3)
        this.inserirCliente(c4)
        this.inserirCliente(c5)


        let con1 = new Conta (11, "111-1", 10000, new Date())
        let con2 = new Conta (12, "111-1", 10000, new Date())
        let con3 = new Conta (13, "111-1", 10000, new Date())
        let con4 = new Conta (14, "111-1", 10000, new Date())
        let con5 = new Conta (15, "111-1", 10000, new Date())


        this.inserirContas(con1)
        this.inserirContas(con2)
        this.inserirContas(con3)
        this.inserirContas(con4)
        this.inserirContas(con5)


        this.associarContaCliente(con1.numero, c1.cpf)
        this.associarContaCliente(con2.numero, c2.cpf)
        this.associarContaCliente(con3.numero, c3.cpf)


    }
}







