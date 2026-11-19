import prompt from "prompt-sync"

import { Banco, Conta, Clientes } from "./banco";

const input = prompt()


class App {
    b: Banco

    constructor(){
        this.b = new Banco ()
    }


    menu (){
     this.b.carregarDados()

     let opcao: string = ""

        do{ 
                console.log('\nBem Vindo\n Digite uma opção: ')
                console.log("Contas:\n")
                console.log('01 - Inserir       02 - Consultar      03 - Sacar')
                console.log("04 -Depositar      05 - Excluir        06 - Transferir")
                console.log("07 - Totalizações      08 - Atualizar     09 - Ordem Bancária")
                console.log("10 - Mudar Titular    11 - Contas Sem Clientes\n")


                console.log("Clientes: \n")
                console.log("20 - Inserir       21 - Consultar      22 - Associar")
                console.log("23 - Excluir       24 - Listar Contas      25 - Totalizar Saldo")
                console.log("0 - Sair\n")

                opcao = input("opção: ")


                switch (opcao){
                    case "01": this.inserirConta()
                    case "02": this.ConsultarConta()
                    case "03": this.sacarConta()
                    case "04": this.DepositarConta()
                    case "05": this.ExcluirConta()
                    case "06": this.TransferirConta()
                    case "07": this.TotalizarConta()
                    case "08": this.AtualizarConta()
                    case "09": this.OrdemBancaria()
                    case "10": this.MudarTitular()
                    case "11": this.ContasSem()


                    case "20": this.InserirCliente()
                    case "21": this.ConsultarCliente()
                    case "22": this.AssociarCliente()
                    case "23": this.ExcluirCliente()
                    case "24": this.ListarContasClientes()
                    case "25": this.TotalizarSaldoCliente()


                    case "0": break

                    default: console.log("opção inválida")

                }

                if(opcao!== "0"){
                    input("operação finalizada, digie <ENTER> para continuar...")

                } 



            
             }

      

            while (opcao!=="0"){
            console.log("Aplicação Encerrada")
            }   
    }


    inserirConta(){
        let id= Number (input("id: "))
        let num = input(" Número: ")
        let saldo = Number (input("Saldo: "))

        let conta= new Conta (id, num, saldo, new Date())
        this.b.inserirContas(conta)
        if(conta){  console.log("conta adicionada com sucesso !")}
        else{console.log("conta não adicionada...")}

        return conta
      
    } 


    ConsultarConta(){
        let num = input("numero conta: ")
        let conta = this.b.consultarPorNumero(num)

        if(conta){
            console.log(`a conta com o numero ${conta.numero} foi encontrada.`)

            return conta
        }
        else{
            console.log("a conta não foi encontrada")
        }
    }


    sacarConta(){
        console.log("----- saque -----")

        let id = input("digite seu id: ")
        let valor= Number (input("Digite o valoor a ser sacado: "))
        this.b.sacar(id, valor)
    }


    DepositarConta(){
        console.log("---- Depósito ----")

        let num = input("numero conta: ")
        let valor = Number (input("valor depositado: "))
        this.b.depositar(num , valor)
        console.log("valor depositado...")
    }


    ExcluirConta(){

        let cpf = input("CPF: ")
        let num = input("num: ")
        this.b.excluirConta(cpf , num)

        console.log("Conta excluida")
    }


    TransferirConta(){

        let numOrigem = input("numero conta origem: ")
        let numDestino = input("numero conta destino: ")
        let valor = Number(input("valor da transferência: "))


        this.b.transferir(numOrigem, numDestino, valor)
    }


    TotalizarConta(){
        console.log(`total de contas: ${this.b.retornarQtdeContas()}\ntotal de saldo: ${this.b.retornarSaldo()}`)
    }


    AtualizarConta(){

        let conta= this.ConsultarConta()
        if(conta){
            this.b.atualizar(conta)
        }
        else{
            console.log("existe algum problema com a conta...")
        }
    }


    OrdemBancaria(){

        console.log("escolha as contas de destino: ")
        let resp = ""
        let  numDestino: string[] = []
        while(resp =="S"){
            let num = input("num destino : ")

            numDestino.push(num)

            resp = input("continuar ? ").toLocaleUpperCase()
        }
        
        let numOrigem = input("num origem: ")

        let valor = Number(input("valor a ser transferido: "))

        this.b.trasferenciaMulti(numDestino, valor , numOrigem)
    }



    MudarTitular(){
        let cpf = input("cpf do novo cliente: ")

        let numconta = input("número da conta: ")

        let novoTitulo = this.b.mudancaTitularidade(cpf , numconta)

        if (novoTitulo){
            console.log("a conta mudou de titularidade")
        }
        else{
            console.log("algo deu errado...")
        }
    }


    ContasSem(){
        let lista = this.b.listarSemCliente()

        if (!lista){
            console.log("todas as contas ´possuem clientes...")
        }

        else{
            for(let contas of lista){
                console.log(`---contas`)
            }
        }
    }


    InserirCliente(){
        let id = Number (input("id: "))
        let cpf = input("cpf: ")
        let dataNasc = new Date (input("Data de Nascimento (AAAA-MM-DD)"))
        let nome = input("nome: ")


        let clienteinserido = new Clientes(id , nome , cpf , new Date())
        this.b.inserirCliente(clienteinserido)

        if(this.b.clientes.length===this.b.clientes.length+1){
            console.log("cliente foi inserido com sucesso !")
        }
    }


    ConsultarCliente(){
        let cpf = input("cpf: ")
        let consulta =this.b.consultarPorcpf(cpf)

        return consulta
    }


    AssociarCliente(){
        let num = input("num conta: ")
        let cpf = input("cpf: ")


        this.b.associarContaCliente(num , cpf)

         if(this.b.contas.length===this.b.contas.length+1){
            console.log("cliente foi associado com sucesso !")
        }
    }


    ExcluirCliente(){
        let num = input("num conta: ")
        let cpf = input("cpf cliente: ")


        this.b.excluirCliente(num , cpf )

        console.log("cliente exlcuido com sucesso...")
    }


    ListarContasClientes(){

        let cpf = input("cpf do cliente: ")

        let contasListadas = this.b.listarContasClientes(cpf)

        if(!contasListadas){
            console.log("nenhuma conta foi encontrada...")
        }
        else{
            console.log("contas: \n")
            for (let c of contasListadas){
                console.log("---c")
            }
        }

    }


    TotalizarSaldoCliente(){
        let saldo = this.b.retornarSaldo()

        console.log(`o saldo total do cliente é igual a : ${saldo}`)
    }



}


const app = new App()
app.b.carregarDados()
app.menu()