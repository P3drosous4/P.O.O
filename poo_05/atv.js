"use strict";
// questao
class Clientes {
    id;
    nome;
    cpf;
    dataNascimento;
    contas;
    constructor(id, nome, cpf, dataNascimento, contas) {
        this.id = id;
        this.nome = nome;
        this.cpf = cpf;
        this.dataNascimento = dataNascimento;
        this.contas = contas;
    }
    ;
}
class Conta {
    dataAbertura;
    id;
    numero;
    saldo;
    cliente; // questao
    constructor(id, numero, saldo, cliente, dataAbertura) {
        this.dataAbertura = dataAbertura;
        this.id = id;
        this.numero = numero;
        this.saldo = saldo;
        this.cliente = cliente; // questao
    }
    depositar(valor) {
        this.saldo = this.saldo + valor;
    }
    sacar(valor) {
        this.saldo = this.saldo - valor;
    }
    transferir(contaDestino, valor) {
        /* this.saldo = this.saldo - valor;
        contaDestino.saldo = contaDestino.saldo + valor;*/
        this.sacar(valor);
        contaDestino.depositar(valor);
    }
    consultarSaldo() {
        return this.saldo;
    }
}
class Banco {
    contas;
    clientes;
    constructor() {
        this.contas = [];
        this.clientes = [];
    }
    inserir(conta) {
        this.contas.push(conta);
    }
    consultar(id) {
        for (let conta of this.contas) {
            if (conta.id == id) {
                return conta;
            }
        }
        return null;
    }
    consultarIndice(id) {
        for (let i = 0; i < this.contas.length; i++) {
            let conta = this.contas[i];
            if (conta && conta.id == id) {
                return i;
            }
        }
        return -1;
    }
    excluir(id) {
        let indice = this.consultarIndice(id);
        if (indice != -1) {
            for (let i = indice; i < this.contas.length - 1; i++) {
                this.contas[i] = this.contas[i + 1];
            }
            this.contas.pop();
        }
    }
    depositar(id, valor) {
        let contaProcurada = this.consultar(id);
        if (contaProcurada) {
            contaProcurada.depositar(valor);
        }
    }
    sacar(id, valor) {
        let contraProcurada = this.consultar(id);
        if (contraProcurada) {
            contraProcurada.sacar(valor);
        }
    }
    transferir(idOrigem, idDestino, valor) {
        let contaOrigem = this.consultar(idOrigem);
        let contaDestino = this.consultar(idDestino);
        if (contaOrigem && contaDestino) {
            contaOrigem.transferir(contaDestino, valor);
        }
    }
    inserirCliente(cliente) {
        this.clientes.push(cliente); //questao
    }
    consultarCliente(cpf) {
        let result = this.clientes.find(c => c.cpf === cpf);
        return result ? result.nome : undefined;
    }
}
//testes
// let numeros: number[] = [3, 2, 1];
// for (let i = 0; i < numeros.length; i++) {
//     console.log(numeros[i]);
// }
// for (let numero of numeros.reverse()) {
//     console.log(numero);
// }
let contas = [];
let conta1 = new Conta(1, '111-1', 100, "Roberto", new Date());
let conta2 = new Conta(2, '222-2', 200, "Maria", new Date());
contas[0] = conta1;
contas.push(conta2);
// for (let conta of contas) {
//     console.log(conta);
// }
// let banco: Banco = new Banco();
// banco.inserir(conta1);
// banco.inserir(conta2);
// banco.inserir(new Conta(3, '333-3', 300));
// console.log(banco.contas);
// banco.transferir(3,1, 300);
// console.log(banco.consultar(1));
// console.log(banco.consultar(3));
// banco.contas = [];
// conta1.saldo = -10000;
////Codigo do professor ^
