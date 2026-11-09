function carregarLocalStorage() {
    debugger

    if (!localStorage.contas) {
        let contas = []
        localStorage.setItem('contas', JSON.stringify(contas));
    }
    let contas = JSON.parse(localStorage.getItem("contas")) 
    if (!localStorage.posicao) {
        let i = 0
        localStorage.setItem('posicao', JSON.stringify(i));
    }
    let i = parseInt(JSON.parse(localStorage.getItem("posicao"))) 

    if (contas[i]) {
        document.querySelector('.Login').classList.add('escondido');
        document.getElementById("bemvindo").innerText = "Olá, " + contas[i].nome;
        document.getElementById("fotodeperfil").src = contas[i].foto
    
        atualizarData()
        atualizarSaldo()
        atualizarCategoria()

    } else {
        document.querySelector('.Login').classList.remove('escondido');
    }
}

function limparCor(seletor) {
    document.querySelector(seletor).classList.remove('ativacao-red', 'ativacao-green')
}

function adcionarBorda(seletor, cor) {
    document.querySelector(seletor).classList.add(cor)
}