function atualizarData() {
    debugger

    let hoje = new Date()
    let dia = parseInt(hoje.getDate())
    let mes = parseInt(hoje.getMonth() + 1)
    let ano = parseInt(hoje.getFullYear())

    let data = ano

    if (mes < 10) {
        data += "-" + "0" + mes + "-"
    } else {
        data += "-" + mes + "-"
    }
    if (dia < 10) {
        data += "0" + dia
    } else {
        data += dia
    }

    let contas = JSON.parse(localStorage.getItem("contas"))
    let i = parseInt(JSON.parse(localStorage.getItem("posicao")))

    if (contas[i].dataInferior == "" || contas[i].dataSuperior != data) {

        contas[i].dataInferior = data
        contas[i].dataSuperior = data
        document.getElementById("dataDeHoje").innerText = contas[i].dataInferior

        localStorage.setItem("contas", JSON.stringify(contas))
    } else {
        if (contas[i].dataInferior == contas[i].dataSuperior) {
            document.getElementById("dataDeHoje").innerText = contas[i].dataInferior
        } else {
            document.getElementById("dataDeHoje").innerText = contas[i].dataInferior + " / " + contas[i].dataSuperior
        }
    }
}

function mostrarCardPeriodo() {
    document.querySelector('.periodo').classList.remove('escondido')
    limparCor('.campoData1')
    limparCor('.campoData2')
}

function adcionarPeriodo() {

    let inputDataInicial = document.getElementById("dataInicial").value
    let inputDataFinal = document.getElementById("dataFinal").value

    if (inputDataInicial == "") {
        adcionarBorda('.campoData1', 'ativacao-red')
    }
    if (inputDataFinal == "") {
        adcionarBorda('.campoData2', 'ativacao-red')
    }

    if (inputDataInicial != "" && inputDataFinal != "") {
        if (inputDataInicial <= inputDataFinal) {
            adcionarBorda('.campoData1', 'ativacao-green')
            adcionarBorda('.campoData2', 'ativacao-green')

            let contas = JSON.parse(localStorage.getItem("contas"))
            let i = parseInt(JSON.parse(localStorage.getItem("posicao")))

            contas[i].dataInferior = inputDataInicial
            contas[i].dataSuperior = inputDataFinal

            localStorage.setItem("contas", JSON.stringify(contas))

            if (inputDataFinal == inputDataInicial) {
                document.getElementById("dataDeHoje").innerText = contas[i].dataInferior
            } else {
                document.getElementById("dataDeHoje").innerText = contas[i].dataInferior + " / " + contas[i].dataSuperior
            }
            atualizarSaldo()
        } else {
            adcionarBorda('.campoData1', 'ativacao-red')
            adcionarBorda('.campoData2', 'ativacao-red')
        }
    }
}

function xPeriodo() {
    document.querySelector('.periodo').classList.add('escondido')
    document.getElementById("dataInicial").value = ""
    document.getElementById("dataFinal").value = ""
}