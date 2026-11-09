function cadastrar() {
    let contas = JSON.parse(localStorage.getItem("contas"))
    debugger
    limparCor('.campoLogin')
    limparCor('.senha')
    limparCor('.fotoPerfil')

    let inputNome = document.getElementById("nome").value;
    let inputfoto = document.getElementById("config1").value
    let inputSenha = document.getElementById("senha").value

    if (inputNome != "" && inputfoto != "" && inputSenha != "") {

        let k = verificarRepeticao(inputNome)

        if (k == 0) {

            let i = contas.length
            contas[i] = {}
            contas[i].nome = inputNome
            contas[i].senha = inputSenha
            contas[i].foto = inputfoto
            contas[i].dataInferior = ""
            contas[i].dataSuperior = ""
            contas[i].codigo = 1
            contas[i].categoria = []
            contas[i].gasto = []
            contas[i].ganho = []

            localStorage.setItem("contas", JSON.stringify(contas))
            localStorage.setItem("posicao", JSON.stringify(i))

            document.getElementById("nome").value = ""
            document.getElementById("config1").value = ""
            document.getElementById("senha").value = ""

            carregarLocalStorage()
        } else {
            adcionarBorda('.campoLogin', 'ativacao-red')
            adcionarBorda('.fotoPerfil', 'ativacao-red')
            adcionarBorda('.senha', 'ativacao-red')
            alert("Nome ja usado!")
        }
    } else {
        adcionarBorda('.campoLogin', 'ativacao-red')
        adcionarBorda('.fotoPerfil', 'ativacao-red')
        adcionarBorda('.senha', 'ativacao-red')
    }
}

function mostrarCardContas() {
    document.querySelector('.contas').classList.remove('escondido')
    limparCor('.nomeNovo')

    let contas = JSON.parse(localStorage.getItem("contas"))
    let i = parseInt(JSON.parse(localStorage.getItem("posicao")))

    document.getElementById("nomeDoUsuario").innerText = contas[i].nome;
    document.getElementById("fotodeperfil2").src = contas[i].foto
}

function atualizarNome() {
    debugger
    let contas = JSON.parse(localStorage.getItem("contas"))
    let i = parseInt(JSON.parse(localStorage.getItem("posicao")))

    let inputNome = document.getElementById("nomeNovo").value

    if (inputNome != "") {
        let k = verificarRepeticao(inputNome)
        if (k == 0) {
            adcionarBorda('.nomeNovo', 'ativacao-green')

            contas[i].nome = inputNome
            document.getElementById("bemvindo").textContent = "Olá, " + contas[i].nome;

            localStorage.setItem("contas", JSON.stringify(contas))
        } else {
            adcionarBorda('.nomeNovo', 'ativacao-red')
            alert("Nome ja usado!")
        }
    } else {
        adcionarBorda('.nomeNovo', 'ativacao-red')
    }
}

function verificarRepeticao(nome) {
    let contas = JSON.parse(localStorage.getItem("contas"))

    let k = 0
    for (let i = 0; i < contas.length; i++) {
        if (contas[i].nome == nome) {
            k = 1
        }
    }
    return k
}

function criarConta() {
    document.querySelector('.contas').classList.add('escondido')
    document.querySelector('.Login').classList.remove('escondido')
}

function mostrarCardMudarDeConta() {
    document.querySelector('.contas').classList.add('escondido')
    document.querySelector('.mudarDeConta').classList.remove('escondido')
    limparCor('.campoNome')
    limparCor('.campoSenha2')
}

function mudarDeConta() {

    let inputNome = document.getElementById("nome2").value
    let inputSenha = document.getElementById("senha2").value

    if (inputNome != "" && inputSenha != "") {
        let k = verificarNomeSenha(inputNome, inputSenha)

        if (k != -1) {
            localStorage.setItem("posicao", JSON.stringify(k))
            document.getElementById("nome2").value = ""
            document.getElementById("senha2").value = ""

            adcionarBorda('.campoNome', 'ativacao-green')
            adcionarBorda('.campoSenha2', 'ativacao-green')


            xMudarConta()
            xContas()
            carregarLocalStorage()
        } else {
            adcionarBorda('.campoNome', 'ativacao-red')
            adcionarBorda('.campoSenha2', 'ativacao-red')
            alert("Nome ou senha incorretos!")
        }
    } else {
        adcionarBorda('.campoNome', 'ativacao-red')
        adcionarBorda('.campoSenha2', 'ativacao-red')
    }
}

function verificarNomeSenha(nome, senha) {
    let contas = JSON.parse(localStorage.getItem("contas"))
    let k = -1
    for (let i = 0; i < contas.length; i++) {
        if (contas[i].nome == nome && contas[i].senha == senha) {
            k = i
        }
    }
    return k
}


function xMudarConta() {
    document.querySelector('.contas').classList.remove('escondido')
    document.querySelector('.mudarDeConta').classList.add('escondido')

    document.getElementById("nome2").value = ""
    document.getElementById("senha2").value = ""
}

function xContas() {
    document.querySelector('.contas').classList.add('escondido')

    document.getElementById("nomeNovo").value = ""
}


function mostrar() {
    document.querySelector('.campoSenha').type = "text"
    document.getElementById("eye").src = "imagens/eye.svg"
    document.getElementById("trocarFuncao").onclick = ocultar
}

function ocultar() {
    document.querySelector('.campoSenha').type = "password"
    document.getElementById("eye").src = "imagens/eye-slash.svg"
    document.getElementById("trocarFuncao").onclick = mostrar
}

function mostrar2() {
    document.querySelector('.campoSenha2').type = "text"
    document.getElementById("eye2").src = "imagens/eye.svg"
    document.getElementById("trocarFuncao2").onclick = ocultar2
}

function ocultar2() {
    document.querySelector('.campoSenha2').type = "password"
    document.getElementById("eye2").src = "imagens/eye-slash.svg"
    document.getElementById("trocarFuncao2").onclick = mostrar2
}