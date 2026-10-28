let contas = JSON.parse(localStorage.getItem("contas")) || []

function cadastrar() {
    debugger
    let inputNome = document.getElementById("nome").value;

    if (inputNome == "") {
        document.querySelector('.campoLogin').classList.add('ativacao-red');
    } else {
        document.querySelector('.campoLogin').classList.add('ativacao-green');
        let i = contas.length
        if (i != 0) {
            i--
        }
        contas[i].nome = inputNome

        localStorage.setItem("contas", JSON.stringify(contas))
        carregarLocalStorage()
        document.getElementById("nome").value = ""
        document.querySelector('.campoLogin').classList.remove('ativacao-green');
    }
}

function carregarLocalStorage() {
    debugger

    let i = contas.length
    if (i != 0) {
        i--
    }

    if (contas[i] != null && contas[i] != "") {
        document.querySelector('.Login').classList.add('escondido');
        document.getElementById("bemvindo").textContent = "Olá, " + contas[i].nome;
    } else {

        contas[i] = {}
        contas[i].nome
        contas[i].dataInferior
        contas[i].dataSuperior
        contas[i].categoria = []
        contas[i].meta = []
        contas[i].gasto = []
        contas[i].ganho = []

        document.querySelector('.Login').classList.remove('escondido');
    }

    let totalGasto = 0
    if (contas[i].gasto.length > 0) {
        for (let k = 0; k < contas[i].gasto.length; k++) {
            totalGasto += contas[i].gasto[k].valorGasto
        }
    }
    document.getElementById("despesa").textContent = "R$" + totalGasto;

    let totalGanho = 0
    if (contas[i].ganho.length > 0) {
        for (let k = 0; k < contas[i].ganho.length; k++) {
            totalGanho += contas[i].ganho[k].valorGanho
        }
    }
    document.getElementById("receita").textContent = "R$" + totalGanho;

    if (contas[i].nome != null && contas[i].nome != "") {
        let hoje = new Date()
        let dia = parseInt(hoje.getDate())
        let mes = parseInt(hoje.getMonth() + 1)
        let ano = parseInt(hoje.getFullYear())

        let i = contas.length - 1
        contas[i].dataInferior = ano

        if (mes < 10) {
            contas[i].dataInferior += "-" + "0" + mes + "-"
        } else {
            contas[i].dataInferior += "-" + mes + "-"
        }
        if (dia < 10) {
            contas[i].dataInferior += "0" + dia
        } else {
            contas[i].dataInferior += dia
        }

        document.getElementById("dataDeHoje").innerText = contas[i].dataInferior
        contas[i].dataSuperior = contas[i].dataInferior

        atualizarSaldo()
    }

}

function mostrarCardPeriodo() {
    document.querySelector('.periodo').classList.remove('escondido')
}

function adcionarPeriodo() {
    let inputDataInicial = document.getElementById("dataInicial").value
    let inputDataFinal = document.getElementById("dataFinal").value

    if (inputDataInicial == "") {
        document.querySelector('.campoData1').classList.add('ativacao-red');
    }
    if (inputDataFinal == "") {
        document.querySelector('.campoData2').classList.add('ativacao-red');
    }

    if (inputDataInicial != "" && inputDataFinal != "") {
        if (inputDataInicial <= inputDataFinal) {
            document.querySelector('.campoData1').classList.add('ativacao-green')
            document.querySelector('.campoData2').classList.add('ativacao-green')

            let i = contas.length - 1
            contas[i].dataInferior = inputDataInicial
            contas[i].dataSuperior = inputDataFinal

            if (inputDataFinal == inputDataInicial) {
                document.getElementById("dataDeHoje").innerText = contas[i].dataInferior
            } else {
                document.getElementById("dataDeHoje").innerText = contas[i].dataInferior + " / " + contas[i].dataSuperior
            }
            atualizarSaldo()
        } else {
            document.querySelector('.campoData1').classList.add('ativacao-red');
            document.querySelector('.campoData2').classList.add('ativacao-red');
        }
    }
}

function xPeriodo() {
    document.querySelector('.periodo').classList.add('escondido')
}

function mostarCardGasto() {
    document.querySelector('.gasto').classList.remove('escondido')
}

function adcionarGasto() {
    let inputValor = document.getElementById("valorGasto").value;
    let inputCategoria = document.getElementById("categoriaGasto").value;
    let inputData = document.getElementById("dataGasto").value;

    if (inputValor == "") {
        document.querySelector('.campoGasto1').classList.add('ativacao-red');
    }
    if (inputCategoria == "") {
        document.querySelector('.campoGasto2').classList.add('ativacao-red');
    }
    if (inputData == "") {
        document.querySelector('.campoGasto3').classList.add('ativacao-red');
    }

    if (inputValor != "" && inputCategoria != "" && inputData != "") {
        document.querySelector('.campoGasto1').classList.add('ativacao-green')
        document.querySelector('.campoGasto2').classList.add('ativacao-green')
        document.querySelector('.campoGasto3').classList.add('ativacao-green')

        inputValor = parseFloat(inputValor)

        let i = contas.length - 1
        let k = contas[i].gasto.length
        contas[i].gasto[k] = {}
        contas[i].gasto[k].valorGasto = inputValor
        contas[i].gasto[k].categoriaGasto = inputCategoria
        contas[i].gasto[k].dataGasto = inputData

        localStorage.setItem("contas", JSON.stringify(contas))

        atualizarSaldo()
    }
}

function xGasto() {
    document.querySelector('.gasto').classList.add('escondido');

    document.querySelector('.campoGasto1').classList.remove('ativacao-green')
    document.querySelector('.campoGasto2').classList.remove('ativacao-green')
    document.querySelector('.campoGasto3').classList.remove('ativacao-green')

    document.querySelector('.campoGasto1').classList.remove('ativacao-red')
    document.querySelector('.campoGasto2').classList.remove('ativacao-red')
    document.querySelector('.campoGasto3').classList.remove('ativacao-red')

    document.getElementById("valorGasto").value = ""
    document.getElementById("categoriaGasto").value = ""
    document.getElementById("dataGasto").value = ""
}

function mostarCardGanho() {
    document.querySelector('.ganho').classList.remove('escondido')
}

function adcionarGanho() {
    debugger
    let inputValor = document.getElementById("valorGanho").value;
    let inputCategoria = document.getElementById("categoriaGanho").value;
    let inputData = document.getElementById("dataGanho").value;

    if (inputValor == "") {
        document.querySelector('.campoGanho1').classList.add('ativacao-red');
    }
    if (inputCategoria == "") {
        document.querySelector('.campoGanho2').classList.add('ativacao-red');
    }
    if (inputData == "") {
        document.querySelector('.campoGanho3').classList.add('ativacao-red');
    }

    if (inputValor != "" && inputCategoria != "" && inputData != "") {
        document.querySelector('.campoGanho1').classList.add('ativacao-green')
        document.querySelector('.campoGanho2').classList.add('ativacao-green')
        document.querySelector('.campoGanho3').classList.add('ativacao-green')

        inputValor = parseFloat(inputValor)

        let i = contas.length - 1
        let k = contas[i].ganho.length
        contas[i].ganho[k] = {}
        contas[i].ganho[k].valorGanho = inputValor
        contas[i].ganho[k].categoriaGanho = inputCategoria
        contas[i].ganho[k].dataGanho = inputData

        localStorage.setItem("contas", JSON.stringify(contas))

        atualizarSaldo()
    }
}

function xGanho() {
    document.querySelector('.ganho').classList.add('escondido');

    document.querySelector('.campoGanho1').classList.remove('ativacao-green')
    document.querySelector('.campoGanho2').classList.remove('ativacao-green')
    document.querySelector('.campoGanho3').classList.remove('ativacao-green')

    document.querySelector('.campoGanho1').classList.remove('ativacao-red')
    document.querySelector('.campoGanho2').classList.remove('ativacao-red')
    document.querySelector('.campoGanho3').classList.remove('ativacao-red')

    document.getElementById("valorGanho").value = ""
    document.getElementById("categoriaGanho").value = ""
    document.getElementById("dataGanho").value = ""
}

function atualizarSaldo() {
    debugger
    let totalGanho = 0
    let i = contas.length - 1

    for (let k = 0; k < contas[i].ganho.length; k++) {
        if ((contas[i].ganho[k].dataGanho <= contas[i].dataSuperior) && (contas[i].ganho[k].dataGanho >= contas[i].dataInferior)) {
            totalGanho += contas[i].ganho[k].valorGanho
        }
    }
    document.getElementById("receita").textContent = "R$" + totalGanho;

    let totalGasto = 0
    for (let k = 0; k < contas[i].gasto.length; k++) {
        if ((contas[i].gasto[k].dataGasto <= contas[i].dataSuperior) && (contas[i].gasto[k].dataGasto >= contas[i].dataInferior)) {
            totalGasto += contas[i].gasto[k].valorGasto
        }
    }
    document.getElementById("despesa").textContent = "R$" + totalGasto;

    let saldo = totalGanho - totalGasto
    document.getElementById("saldo").textContent = "R$" + saldo

    let oSaldo = document.getElementById("saldo")
    if (saldo < 0) {
        oSaldo.style.color = "red"
    } else {
        oSaldo.style.color = "white"
    }

    transacoesRecentes()
    AtualizarGrafico()
    AtualizarTabela()
}

function transacoesRecentes() {
    debugger
    let i = contas.length - 1
    let k = contas[i].ganho.length
    if (k >= 1 && contas[i].ganho[k - 1] != "") {
        document.getElementById("categoria-1").textContent = contas[i].ganho[k - 1].categoriaGanho
        document.getElementById("valor-1").textContent = "R$" + contas[i].ganho[k - 1].valorGanho
        let ganho = document.getElementById("tipo-1")
        ganho.textContent = "Ganho"
        ganho.classList.add('verde')
    } else {
        document.getElementById("categoria-1").textContent = "Categoria"
        document.getElementById("valor-1").textContent = "R$0"
        document.getElementById("tipo-1").textContent = "Tipo"
        document.getElementById("tipo-1").classList.remove('verde')
    }

    if (k >= 1 && contas[i].ganho[k - 2] != undefined) {
        document.getElementById("categoria-2").textContent = contas[i].ganho[k - 2].categoriaGanho
        document.getElementById("valor-2").textContent = "R$" + contas[i].ganho[k - 2].valorGanho
        let ganho = document.getElementById("tipo-2")
        ganho.textContent = "Ganho"
        ganho.classList.add('verde')
    } else {
        document.getElementById("categoria-2").textContent = "Categoria"
        document.getElementById("valor-2").textContent = "R$0"
        document.getElementById("tipo-2").textContent = "Tipo"
        document.getElementById("tipo-2").classList.remove('verde')
    }

    k = contas[i].gasto.length
    if (k >= 1 && contas[i].gasto[k - 1] != undefined) {
        document.getElementById("categoria-3").textContent = contas[i].gasto[k - 1].categoriaGasto
        document.getElementById("valor-3").textContent = "R$" + contas[i].gasto[k - 1].valorGasto
        let gasto = document.getElementById("tipo-3")
        gasto.textContent = "Gasto"
        gasto.classList.add('vermelho')
    } else {
        document.getElementById("categoria-3").textContent = "Categoria"
        document.getElementById("valor-3").textContent = "R$0"
        document.getElementById("tipo-3").textContent = "Tipo"
        document.getElementById("tipo-3").classList.remove('vermelho')
    }

    if (k >= 1 && contas[i].gasto[k - 2] != undefined) {
        document.getElementById("categoria-4").textContent = contas[i].gasto[k - 2].categoriaGasto
        document.getElementById("valor-4").textContent = "R$" + contas[i].gasto[k - 2].valorGasto
        let gasto = document.getElementById("tipo-4")
        gasto.textContent = "Gasto"
        gasto.classList.add('vermelho')
    } else {
        document.getElementById("categoria-4").textContent = "Categoria"
        document.getElementById("valor-4").textContent = "R$0"
        document.getElementById("tipo-4").textContent = "Tipo"
        document.getElementById("tipo-4").classList.remove('vermelho')
    }
}

function AtualizarGrafico(periodo) {
    debugger

    if (periodo == undefined) {
        periodo = 2026
    }
    document.querySelector('.grafico-titulo').innerText = "Visão geral de " + periodo

    let valorGanhoTotal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let i = contas.length - 1
    for (let k = 0; k < contas[i].ganho.length; k++) {  //2026-03-23
        let ano = contas[i].ganho[k].dataGanho[0] + contas[i].ganho[k].dataGanho[1] + contas[i].ganho[k].dataGanho[2] + contas[i].ganho[k].dataGanho[3]
        let mes = contas[i].ganho[k].dataGanho[5] + contas[i].ganho[k].dataGanho[6]

        ano = parseInt(ano)
        mes = parseInt(mes)

        if (ano == parseInt(periodo)) {
            valorGanhoTotal[mes] += contas[i].ganho[k].valorGanho
        }
    }

    let valorGastoTotal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (let k = 0; k < contas[i].gasto.length; k++) {   //2026-03-23
        let ano = contas[i].gasto[k].dataGasto[0] + contas[i].gasto[k].dataGasto[1] + contas[i].gasto[k].dataGasto[2] + contas[i].gasto[k].dataGasto[3]
        let mes = contas[i].gasto[k].dataGasto[5] + contas[i].gasto[k].dataGasto[6]

        ano = parseInt(ano)
        mes = parseInt(mes)

        if (ano == parseInt(periodo)) {
            valorGastoTotal[mes] += contas[i].gasto[k].valorGasto
        }
    }

    let saldoAux = []
    for (let i = 1; i <= 12; i++) {
        saldoAux[i] = valorGanhoTotal[i] - valorGastoTotal[i]
    }

    let maior = 0
    for (let i = 1; i <= 12; i++) {
        if (saldoAux[i] < 0) {
            if (saldoAux[i] * (-1) > maior) {
                maior = saldoAux[i] * (-1)
            }
        } else {
            if (saldoAux[i] > maior) {
                maior = saldoAux[i]
            }
        }
    }

    for (let i = 0; i < 5; i++) {
        document.getElementById("eixo-" + (i + 1)).innerText = "R$" + (maior - maior / 4 * i)
    }

    for (let i = 1; i <= 12; i++) {
        let barra = document.getElementById(i);
        barra.classList.remove('azul-barra', 'vermelho-barra')

        if (saldoAux[i] < 0) {
            barra.style.height = saldoAux[i] * -1 / maior * 100 + "%"
            barra.classList.add('vermelho-barra')
        } else {
            if (saldoAux[i] > 0) {
                barra.style.height = saldoAux[i] / maior * 100 + "%"
                barra.classList.add('azul-barra')
            } else {
                barra.style.height = 0 + "%"
            }
        }
    }
}

function AtualizarTabela(tipo, categoria) {
    debugger

    let i = contas.length - 1
    let corpo = document.querySelector('#tabela tbody');
    corpo.innerHTML = ""

    if (tipo == "Ganho") {
        for (let k = 0; k < contas[i].ganho.length; k++) {
            if (contas[i].ganho[k].categoriaGanho == categoria || categoria == "" || categoria == undefined) {
                if ((contas[i].ganho[k].dataGanho <= contas[i].dataSuperior) &&
                    (contas[i].ganho[k].dataGanho >= contas[i].dataInferior)) {
                    let novaLinha = corpo.insertRow()
                    let celulaTipo = novaLinha.insertCell(0)
                    celulaTipo.innerText = "Ganho"
                    celulaTipo.classList.add("verde-filtro")
                    novaLinha.insertCell(1).innerText = contas[i].ganho[k].categoriaGanho
                    novaLinha.insertCell(2).innerText = "R$" + contas[i].ganho[k].valorGanho
                    novaLinha.insertCell(3).innerText = contas[i].ganho[k].dataGanho
                }
            }

        }
    }
    if (tipo == "Gasto") {
        for (let k = 0; k < contas[i].gasto.length; k++) {
            if (contas[i].gasto[k].categoriaGasto == categoria || categoria == "" || categoria == undefined) {
                if ((contas[i].gasto[k].dataGasto <= contas[i].dataSuperior) &&
                    (contas[i].gasto[k].dataGasto >= contas[i].dataInferior)) {
                    let novaLinha = corpo.insertRow()
                    let celulaTipo = novaLinha.insertCell(0)
                    celulaTipo.innerText = "Gasto"
                    celulaTipo.classList.add("vermelho-filtro")
                    novaLinha.insertCell(1).innerText = contas[i].gasto[k].categoriaGasto
                    novaLinha.insertCell(2).innerText = "R$" + contas[i].gasto[k].valorGasto
                    novaLinha.insertCell(3).innerText = contas[i].gasto[k].dataGasto
                }
            }

        }
    }
    if (tipo != "Gasto" && tipo != "Ganho") {
        for (let k = 0; k < contas[i].gasto.length; k++) {
            if (contas[i].gasto[k].categoriaGasto == categoria || categoria == "" || categoria == undefined) {
                if ((contas[i].gasto[k].dataGasto <= contas[i].dataSuperior) &&
                    (contas[i].gasto[k].dataGasto >= contas[i].dataInferior)) {
                    let novaLinha = corpo.insertRow()
                    let celulaTipo = novaLinha.insertCell(0)
                    celulaTipo.innerText = "Gasto"
                    celulaTipo.classList.add("vermelho-filtro")
                    novaLinha.insertCell(1).innerText = contas[i].gasto[k].categoriaGasto
                    novaLinha.insertCell(2).innerText = "R$" + contas[i].gasto[k].valorGasto
                    novaLinha.insertCell(3).innerText = contas[i].gasto[k].dataGasto
                }
            }
        }
        for (let k = 0; k < contas[i].ganho.length; k++) {
            if (contas[i].ganho[k].categoriaGanho == categoria || categoria == "" || categoria == undefined) {
                if ((contas[i].ganho[k].dataGanho <= contas[i].dataSuperior) &&
                    (contas[i].ganho[k].dataGanho >= contas[i].dataInferior)) {
                    let novaLinha = corpo.insertRow()
                    let celulaTipo = novaLinha.insertCell(0)
                    celulaTipo.innerText = "Ganho"
                    celulaTipo.classList.add("verde-filtro")
                    novaLinha.insertCell(1).innerText = contas[i].ganho[k].categoriaGanho
                    novaLinha.insertCell(2).innerText = "R$" + contas[i].ganho[k].valorGanho
                    novaLinha.insertCell(3).innerText = contas[i].ganho[k].dataGanho
                }
            }
        }
    }
}

function cardFiltro() {
    document.querySelector('.filtro').classList.remove('escondido')
}

function adcionarFiltro() {
    debugger
    let inputTipo = document.getElementById("tipoFiltro").value
    let inputCategoria = document.getElementById("categoriaFiltro").value

    document.querySelector('.filtro1').classList.add('escondido')
    document.querySelector('.filtro2').classList.add('escondido')

    if (inputTipo != "0") {
        document.querySelector('.filtro1').classList.remove('escondido')
        let filtro1 = document.querySelector(".filtro1 p")
        filtro1.innerText = inputTipo
        if (inputTipo == "Gasto") {
            filtro1.classList.add('vermelho')
        } else {
            filtro1.classList.add('verde')
        }
        document.querySelector('.Filtro1').classList.add('ativacao-green')
    } else {
        document.querySelector('.Filtro1').classList.add('ativacao-red')
    }

    if (inputCategoria != "") {
        document.querySelector('.filtro2').classList.remove('escondido')
        let filtro2 = document.querySelector(".filtro2 p")
        filtro2.innerText = inputCategoria
        document.querySelector('.Filtro2').classList.add('ativacao-green')
    } else {
        document.querySelector('.Filtro2').classList.add('ativacao-red')
    }
    AtualizarTabela(inputTipo, inputCategoria)

}

function xFiltro() {
    document.querySelector('.filtro').classList.add('escondido');

    document.querySelector('.Filtro1').classList.remove('ativacao-green')
    document.querySelector('.Filtro2').classList.remove('ativacao-green')

    document.querySelector('.Filtro1').classList.remove('ativacao-red')
    document.querySelector('.Filtro2').classList.remove('ativacao-red')

    document.getElementById("tipoFiltro").value = "0"
    document.getElementById("categoriaFiltro").value = ""
}

function cardPeriodoGrafico() {
    document.querySelector('.periodoGrafico').classList.remove('escondido')
}

function adcionarPeriodoGrafico() {
    let inputAno = document.getElementById("tipoPeriodo").value

    if (inputAno != "0") {
        AtualizarGrafico(inputAno)
    }
}

function xPeriodoGrafico() {
    document.querySelector('.periodoGrafico').classList.add('escondido');

    document.querySelector('.Filtro1').classList.remove('ativacao-green')
    document.querySelector('.Filtro2').classList.remove('ativacao-green')

    document.querySelector('.Filtro1').classList.remove('ativacao-red')
    document.querySelector('.Filtro2').classList.remove('ativacao-red')

    document.getElementById(".periodo").value = "0"
}

function mostarCardConifig() {
    document.querySelector('.configuracao').classList.remove('escondido')
}

function atualizarNome() {
    debugger
    let inputNome = document.getElementById("config").value

    if (inputNome != "") {
        document.querySelector('.nomeNovo').classList.add('ativacao-green')
        let i = contas.length - 1
        contas[i].nome = inputNome
        document.getElementById("bemvindo").textContent = "Olá, " + contas[i].nome;

        localStorage.setItem("contas", JSON.stringify(contas))
    } else {
        document.querySelector('.nomeNovo').classList.add('ativacao-red')
    }
}

function limpar() {
    debugger
    contas = []
    let i = contas.length
    contas[i] = {}
    contas[i].nome
    contas[i].categoria = []
    contas[i].meta = []
    contas[i].gasto = []
    contas[i].ganho = []
    localStorage.setItem("contas", JSON.stringify(contas))
    document.querySelector('.configuracao').classList.add('escondido');
    document.querySelector('.Login').classList.remove('escondido');
}

function xConfiguracao() {
    document.querySelector('.configuracao').classList.add('escondido');

    document.querySelector('.nomeNovo').classList.remove('ativacao-green')
    document.querySelector('.nomeNovo').classList.remove('ativacao-red')

    document.getElementById("nomeNovo").value = "0"
}

function tirarVermelho() {
    document.querySelector('.campo').classList.remove('ativacao');
}

function tirarVermelho1() {
    document.querySelector('.campo1').classList.remove('ativacao');
}

function tirarVermelho2() {
    document.querySelector('.campo2').classList.remove('ativacao');
}

function tirarVermelho3() {
    document.querySelector('.campo3').classList.remove('ativacao');
}

// let contas = [
//    
// ]