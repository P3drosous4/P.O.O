class Autenticacao{
    usuario:string;
    senha:string;

    constructor(usuario:string, senha:string){
        this.usuario = usuario;
        this.senha = senha;
    };

    validar(): boolean {
        if(this.usuario==="admin" && this.senha=="1234"){
            return true;
        }
        return false;
    };
};

let tentativaSenha = new Autenticacao("pedro", "876");

console.log(`Tentativa de senha: ${tentativaSenha.validar()}`);