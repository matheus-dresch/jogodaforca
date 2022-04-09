export function criaTeclado() {
    const alfabeto = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M']
    const teclado = document.querySelector('.teclado')

    for (let letra of alfabeto) {
        let novoElemento = document.createElement('button')
        novoElemento.id = `key_${letra.toLowerCase()}`
        novoElemento.classList.add('tecla')
        novoElemento.innerText = letra
        
        teclado.appendChild(novoElemento)
    }
}