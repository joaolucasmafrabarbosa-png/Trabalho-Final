function mostrarCardFiltro() {
    document.querySelector('.filtro').classList.remove('escondido')

    limparCor('.Filtro1')
    limparCor('.Filtro2')
    limparCor('.Filtro3')
}

function adcionarFiltro() {
    debugger

    let inputTipo = document.getElementById("tipoFiltro").value
    let inputCategoria = document.getElementById("categoriaFiltro").value
    let inputOrdenacao = document.getElementById("ordenacao").value

    document.querySelector('.filtro1').classList.add('escondido')
    document.querySelector('.filtro2').classList.add('escondido')
    document.querySelector('.filtro3').classList.add('escondido')

    if (inputTipo != "0") {
        document.querySelector('.filtro1').classList.remove('escondido')
        let filtro1 = document.querySelector(".filtro1 p")
        filtro1.innerText = inputTipo
        if (inputTipo == "Gasto") {
            filtro1.classList.add('vermelho')
        } else {
            filtro1.classList.add('verde')
        }
        adcionarBorda('.Filtro1', 'ativacao-green')
    } else {
        adcionarBorda('.Filtro1', 'ativacao-red')
    }

    if (inputCategoria != "") {
        document.querySelector('.filtro2').classList.remove('escondido')
        let filtro2 = document.querySelector(".filtro2 p")
        filtro2.innerText = inputCategoria
        adcionarBorda('.Filtro2', 'ativacao-green')
    } else {
        adcionarBorda('.Filtro2', 'ativacao-red')
    }

    if (inputOrdenacao != "0") {
        adcionarBorda('.Filtro3', 'ativacao-green')
        document.querySelector('.filtro3').classList.remove('escondido')
        if (inputOrdenacao == "1") {
            document.querySelector('.filtro3').innerText = "Ordem alfabetica (Z-A)"
        } else {
            if (inputOrdenacao == "2") {
                document.querySelector('.filtro3').innerText = "Maior valor"
            } else {
                if (inputOrdenacao == "3") {
                    document.querySelector('.filtro3').innerText = "Mais recente"
                } else {
                    document.querySelector('.filtro3').innerText = inputOrdenacao
                }
            }
        }
    } else {
        adcionarBorda('.Filtro3', 'ativacao-red')
    }

    AtualizarTabela(inputTipo, inputCategoria, inputOrdenacao)

}

function xFiltro() {
    document.querySelector('.filtro').classList.add('escondido');

    document.getElementById("tipoFiltro").value = "0"
    document.getElementById("categoriaFiltro").value = ""
    document.getElementById("ordenacao").value = "0"
}

function AtualizarTabela(tipo, categoria, ordenar) {
    debugger

    let matriz = [[], [], [], [], []]

    let j = 0
    let contas = JSON.parse(localStorage.getItem("contas")) 
   let i = parseInt(JSON.parse(localStorage.getItem("posicao"))) 

    if (tipo == "Ganho") {
        for (let k = 0; k < contas[i].ganho.length; k++) {
            if ((contas[i].ganho[k].dataGanho <= contas[i].dataSuperior) &&
                (contas[i].ganho[k].dataGanho >= contas[i].dataInferior)) {
                if (contas[i].ganho[k].categoriaGanho == categoria ||
                    categoria == "" || categoria == undefined) {
                    matriz[0][j] = "Ganho"
                    matriz[1][j] = contas[i].ganho[k].categoriaGanho
                    matriz[2][j] = contas[i].ganho[k].valorGanho
                    matriz[3][j] = contas[i].ganho[k].dataGanho
                    matriz[4][j] = contas[i].ganho[k].codigo
                    j++
                }
            }
        }
    }
    if (tipo == "Gasto") {
        for (let k = 0; k < contas[i].gasto.length; k++) {
            if ((contas[i].gasto[k].dataGasto <= contas[i].dataSuperior) &&
                (contas[i].gasto[k].dataGasto >= contas[i].dataInferior)) {
                if (contas[i].gasto[k].categoriaGasto == categoria ||
                    categoria == "" || categoria == undefined) {
                    matriz[0][j] = "Gasto"
                    matriz[1][j] = contas[i].gasto[k].categoriaGasto
                    matriz[2][j] = contas[i].gasto[k].valorGasto
                    matriz[3][j] = contas[i].gasto[k].dataGasto
                    matriz[4][j] = contas[i].gasto[k].codigo
                    j++
                }
            }
        }
    }
    if (tipo != "Gasto" && tipo != "Ganho") {
        for (let k = 0; k < contas[i].gasto.length; k++) {
            if ((contas[i].gasto[k].dataGasto <= contas[i].dataSuperior) &&
                (contas[i].gasto[k].dataGasto >= contas[i].dataInferior)) {
                if (contas[i].gasto[k].categoriaGasto == categoria ||
                    categoria == "" || categoria == undefined) {
                    matriz[0][j] = "Gasto"
                    matriz[1][j] = contas[i].gasto[k].categoriaGasto
                    matriz[2][j] = contas[i].gasto[k].valorGasto
                    matriz[3][j] = contas[i].gasto[k].dataGasto
                    matriz[4][j] = contas[i].gasto[k].codigo
                    j++
                }
            }
        }
        for (let k = 0; k < contas[i].ganho.length; k++) {
            if ((contas[i].ganho[k].dataGanho <= contas[i].dataSuperior) &&
                (contas[i].ganho[k].dataGanho >= contas[i].dataInferior)) {
                if (contas[i].ganho[k].categoriaGanho == categoria ||
                    categoria == "" || categoria == undefined) {
                    matriz[0][j] = "Ganho"
                    matriz[1][j] = contas[i].ganho[k].categoriaGanho
                    matriz[2][j] = contas[i].ganho[k].valorGanho
                    matriz[3][j] = contas[i].ganho[k].dataGanho
                    matriz[4][j] = contas[i].ganho[k].codigo
                    j++
                }
            }
        }
    }

    if (ordenar == "1" || ordenar == "2" || ordenar == "3") {
        ordenar = parseInt(ordenar)
        for (let i = 0; i < matriz[0].length - 1; i++) {
            for (let j = 0; j < matriz[0].length - 1; j++) {
                if (matriz[ordenar][j] < matriz[ordenar][j + 1]) {
                    ordenarMatriz(matriz, j)
                }
            }
        }
    }

    let corpo = document.querySelector('#tabela tbody');
    corpo.innerHTML = ""

    for (let i = 0; i < matriz[0].length; i++) {
        let novaLinha = corpo.insertRow()
        let celulaTipo = novaLinha.insertCell(0)
        celulaTipo.innerText = matriz[0][i]
        if (matriz[0][i] == "Gasto") {
            celulaTipo.classList.add("vermelho-filtro")
        } else {
            celulaTipo.classList.add("verde-filtro")
        }
        novaLinha.insertCell(1).innerText = matriz[1][i]
        novaLinha.insertCell(2).innerText = matriz[2][i]
        novaLinha.insertCell(3).innerText = matriz[3][i]
        novaLinha.insertCell(4).innerText = matriz[4][i]
    }
}

function ordenarMatriz(matriz, j) {
    debugger
   let aux

    aux = matriz[0][j]
    matriz[0][j] = matriz[0][j + 1]
    matriz[0][j + 1] = aux

    aux = matriz[1][j]
    matriz[1][j] = matriz[1][j + 1]
    matriz[1][j + 1] = aux

    aux = matriz[2][j]
    matriz[2][j] = matriz[2][j + 1]
    matriz[2][j + 1] = aux

    aux = matriz[3][j]
    matriz[3][j] = matriz[3][j + 1]
    matriz[3][j + 1] = aux

    aux = matriz[4][j]
    matriz[4][j] = matriz[4][j + 1]
    matriz[4][j + 1] = aux
}