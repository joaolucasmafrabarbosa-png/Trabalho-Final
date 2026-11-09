function mostarCardGasto() {
    document.querySelector('.gasto').classList.remove('escondido')
     limparCor('.campoGasto1')
    limparCor('.campoGasto2')
    limparCor('.campoGasto3')
}

function adcionarGasto() {
    debugger

    let inputValor = document.getElementById("valorGasto").value;
    let inputCategoria = document.getElementById("categoriaGasto").value;
    let inputData = document.getElementById("dataGasto").value;

    if (inputValor == "") {
        adcionarBorda('.campoGasto1' , 'ativacao-red')
    }
    if (inputCategoria == "") {
       adcionarBorda('.campoGasto2' , 'ativacao-red')
    }
    if (inputData == "") {
       adcionarBorda('.campoGasto3' , 'ativacao-red')
    }

    if (inputValor != "" && inputCategoria != "" && inputData != "") {

        inputValor = parseFloat(inputValor)
        if (inputValor > 0) {
            adcionarBorda('.campoGasto1' , 'ativacao-green')
            adcionarBorda('.campoGasto2' , 'ativacao-green')
            adcionarBorda('.campoGasto3' , 'ativacao-green')

            let contas = JSON.parse(localStorage.getItem("contas"))
            let i = parseInt(JSON.parse(localStorage.getItem("posicao")))

            let k = contas[i].gasto.length
            contas[i].gasto[k] = {}
            contas[i].gasto[k].valorGasto = inputValor
            contas[i].gasto[k].categoriaGasto = inputCategoria
            contas[i].gasto[k].dataGasto = inputData
            contas[i].gasto[k].codigo = "A-" + contas[i].codigo++

            localStorage.setItem("contas", JSON.stringify(contas))

            atualizarSaldo()
        } else {
            document.querySelector('.campoGasto1').classList.add('ativacao-red');
        }
    }
}

function xGasto() {
    document.querySelector('.gasto').classList.add('escondido');

    document.getElementById("valorGasto").value = ""
    document.getElementById("categoriaGasto").value = ""
    document.getElementById("dataGasto").value = ""
}

function mostarCardGanho() {
    document.querySelector('.ganho').classList.remove('escondido')
    limparCor('.campoGanho1')
    limparCor('.campoGanho2')
    limparCor('.campoGanho3')
}

function adcionarGanho() {
    debugger

    let inputValor = document.getElementById("valorGanho").value;
    let inputCategoria = document.getElementById("categoriaGanho").value;
    let inputData = document.getElementById("dataGanho").value;

    if (inputValor == "") {
        adcionarBorda('.campoGanho1' , 'ativacao-red')
    }
    if (inputCategoria == "") {
        adcionarBorda('.campoGanho2' , 'ativacao-red')
    }
    if (inputData == "") {
        adcionarBorda('.campoGanho3' , 'ativacao-red')
    }

    if (inputValor != "" && inputCategoria != "" && inputData != "") {
        inputValor = parseFloat(inputValor)
        if (inputValor > 0) {
            adcionarBorda('.campoGanho1' , 'ativacao-green')
            adcionarBorda('.campoGanho2' , 'ativacao-green')
            adcionarBorda('.campoGanho3' , 'ativacao-green')

            let contas = JSON.parse(localStorage.getItem("contas"))
            let i = parseInt(JSON.parse(localStorage.getItem("posicao")))
            
            let k = contas[i].ganho.length
            contas[i].ganho[k] = {}
            contas[i].ganho[k].valorGanho = inputValor
            contas[i].ganho[k].categoriaGanho = inputCategoria
            contas[i].ganho[k].dataGanho = inputData
            contas[i].ganho[k].codigo = "A-" + contas[i].codigo++

            localStorage.setItem("contas", JSON.stringify(contas))

            atualizarSaldo()
        } else {
            document.querySelector('.campoGanho1').classList.add('ativacao-red')
        }
    }
}

function xGanho() {
    document.querySelector('.ganho').classList.add('escondido');

    document.getElementById("valorGanho").value = ""
    document.getElementById("categoriaGanho").value = ""
    document.getElementById("dataGanho").value = ""
}

function atualizarSaldo() {
    debugger
    let totalGanho = 0
    let contas = JSON.parse(localStorage.getItem("contas"))
    let i = parseInt(JSON.parse(localStorage.getItem("posicao")))

    for (let k = 0; k < contas[i].ganho.length; k++) {
        if ((contas[i].ganho[k].dataGanho <= contas[i].dataSuperior) &&
            (contas[i].ganho[k].dataGanho >= contas[i].dataInferior)) {
            totalGanho += contas[i].ganho[k].valorGanho
        }
    }
    document.getElementById("receita").textContent = "R$" + totalGanho;

    let totalGasto = 0
    for (let k = 0; k < contas[i].gasto.length; k++) {
        if ((contas[i].gasto[k].dataGasto <= contas[i].dataSuperior) &&
            (contas[i].gasto[k].dataGasto >= contas[i].dataInferior)) {
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

    maioresCategorias(totalGanho, totalGasto)
    AtualizarGrafico()
    AtualizarTabela()
}