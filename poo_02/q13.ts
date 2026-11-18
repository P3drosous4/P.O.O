class TradutorEmojis {
    dicionario: { [palavra: string]: string } = {
        "amor": "❤️",
        "futebol": "⚽",
        "cachorro": "🐶",
        "gato": "🐈‍"
    };

    TraduzirEmoji(frase:string): string{
        let fraseSeparada = frase.split(" ");

        let fraseMOdificada = fraseSeparada.map((palavra)=>{if(palavra in this.dicionario)
            palavra = this.dicionario[palavra]
            return palavra
        })
        return fraseMOdificada.join(" ");
    }
}


let frase01 = new TradutorEmojis();

console.log(frase01.TraduzirEmoji("eu tenho muito amor por futebol, meu cachorro e meu gato"))
