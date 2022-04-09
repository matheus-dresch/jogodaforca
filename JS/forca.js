let tentativas = 6

export function iniciaJogo() {
    const palavra = (retornaPalavra())
    criaCaixas(palavra)
    console.log(palavra);
    const teclas = document.querySelectorAll('.tecla')

    for (let tecla of teclas) {
        tecla.addEventListener('click', () => {
            checaLetra(tecla, palavra)
        })
    }

    document.addEventListener('keypress', e => {
        checaLetraTeclado(e, palavra)
    })
}

function retornaPalavra() {
    const palavras = ["banana", "carro", "ornitorrinco", "garrafa", "onomatopeia", "cedo", "predio", "sede", "medo", "latim", "verbo", "vesgo", "forte", "sorte", "corte", "morte", "porte", "norte", "pascoa", "natal", "dia", "noite", "escola", "casa", "luz", "vermelho", "amem", "igreja", "elefante", "cachorro", "gato"]

    const randNum = Math.floor(Math.random() * palavras.length)
    const palavraSecreta = palavras[randNum]

    return palavraSecreta
}

function criaCaixas(palavra) {
    const gameContainer = document.querySelector('.game-container')

    for (let i in palavra) {
        let novoElemento = document.createElement('input')
        novoElemento.classList.add('caixa-letra')
        novoElemento.setAttribute('disabled', '')
        gameContainer.appendChild(novoElemento)
    }
}

function checaLetra(tecla, palavra) {
    const letraChutada = (tecla.innerText).toLowerCase()
    const caixas = document.querySelectorAll('.caixa-letra')

    palavra = palavra.split('')

    if (palavra.includes(letraChutada)) {
        acertouLetra(tecla)

        palavra.forEach((letra, index) => {
            if (letraChutada === letra) {
                caixas[index].value = letra.toUpperCase()
            }
        })
    } else {
       errouLetra(tecla, palavra)
    }

    checaVitoria(palavra, caixas)
}

function acertouLetra(tecla) {
    tecla.setAttribute('disabled', '')
    tecla.classList.add('certa')
}

function errouLetra(tecla, palavra) {
    tecla.setAttribute('disabled', '')
    tecla.classList.add('errada')

    tentativas--
    checaDerrota(palavra)
}

function checaVitoria(palavra, caixas) {
    const palavraCaixa = []

    caixas.forEach(caixa => {
        palavraCaixa.push(caixa.value.toLowerCase())
    })

    const palavraCaixaStr = palavraCaixa.join('')
    const palavraStr = palavra.join('')

    if (palavraCaixaStr === palavraStr) {
        jogoTerminou('Parabéns! Você acertou a palavra.')
    }
}

function checaDerrota(palavra) {
    if (tentativas === 0) {
        jogoTerminou(`Enforcou! A palavra era: ${palavra.join('').toUpperCase()}`)
    }
}

function jogoTerminou(msg) {
    desativaBotoes()
    const msgDiv = document.querySelector('.mensagem-final')
    const msgFinal = msgDiv.querySelector('h2')
    msgDiv.classList.toggle('mensagem-final--ativa')

    msgFinal.innerText = msg

    const jogarNovamente = msgDiv.querySelector('button')

    jogarNovamente.onclick = () => {
        resetaJogo()
    }
}

function resetaJogo() {
    window.location = ''
}

function desativaBotoes() {
    const teclas = document.querySelectorAll('.tecla')

    for (let tecla of teclas) {
        tecla.setAttribute('disabled', '')
    }
}

function checaLetraTeclado(e, palavra) {
    const teclaApertada = e.key
    const teclas = document.querySelectorAll('.tecla')
    for (let tecla of teclas) {
        if (tecla.innerText.toLowerCase() === teclaApertada && tentativas > 0) {
            checaLetra(tecla, palavra)
        }
    }
}