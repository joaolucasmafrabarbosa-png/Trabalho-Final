function cardPeriodoGrafico() {
    limparCor('.periodo1')
    document.querySelector('.periodoGrafico').classList.remove('escondido')
}

function adcionarPeriodoGrafico() {

    let inputAno = document.getElementById("tipoPeriodo").value

    if (inputAno != "0") {
        adcionarBorda('.periodo1', 'ativacao-green')

        let contas = JSON.parse(localStorage.getItem("contas")) 
        let i = JSON.parse(localStorage.getItem("posicao"))

        contas[i].anoGrafico = inputAno
        localStorage.setItem("contas", JSON.stringify(contas))
        AtualizarGrafico(inputAno)
    }else {
        adcionarBorda('.periodo1', 'ativacao-red')
    }
}

function xPeriodoGrafico() {
    document.querySelector('.periodoGrafico').classList.add('escondido');
    document.getElementById("tipoPeriodo").value = "0"
}

function AtualizarGrafico(periodo) {
    debugger

    if (periodo == undefined || periodo == "") {
        let hoje = new Date()
        periodo = parseInt(hoje.getFullYear())
    }
    document.querySelector('.grafico-titulo').innerText = "Visão geral de " + periodo

    let valorGanhoTotal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    let contas = JSON.parse(localStorage.getItem("contas")) 
   let i = parseInt(JSON.parse(localStorage.getItem("posicao"))) 

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
        document.getElementById("eixo-" + (i + 1)).innerText = "R$" + (maior - maior / 4 * i).toFixed(0)
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