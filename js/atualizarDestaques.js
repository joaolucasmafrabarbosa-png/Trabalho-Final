function maioresCategorias(totalGanho, totalGasto) {
    debugger

    let contas = JSON.parse(localStorage.getItem("contas"))
    let i = parseInt(JSON.parse(localStorage.getItem("posicao")))

    let matrizGasto = [[], []]
    let c = 0
    for (let k = 0; k < contas[i].gasto.length; k++) {
        if ((contas[i].gasto[k].dataGasto >= contas[i].dataInferior) &&
            (contas[i].gasto[k].dataGasto <= contas[i].dataSuperior)) {
            let r = 0
            for (let j = 0; j < matrizGasto[0].length; j++) {
                if (contas[i].gasto[k].categoriaGasto == matrizGasto[0][j]) {
                    matrizGasto[1][j] += contas[i].gasto[k].valorGasto
                    r = 1
                }
            }
            if (r == 0) {
                matrizGasto[0][c] = contas[i].gasto[k].categoriaGasto
                matrizGasto[1][c] = contas[i].gasto[k].valorGasto
                c++
            }
        }
    }

    let matrizGanho = [[], []]
    c = 0
    for (let k = 0; k < contas[i].ganho.length; k++) {
        if ((contas[i].ganho[k].dataGanho >= contas[i].dataInferior) &&
            (contas[i].ganho[k].dataGanho <= contas[i].dataSuperior)) {
            let r = 0
            for (let j = 0; j < matrizGanho[0].length; j++) {
                if (contas[i].ganho[k].categoriaGanho == matrizGanho[0][j]) {
                    matrizGanho[1][j] += contas[i].ganho[k].valorGanho
                    r = 1
                }
            }
            if (r == 0) {
                matrizGanho[0][c] = contas[i].ganho[k].categoriaGanho
                matrizGanho[1][c] = contas[i].ganho[k].valorGanho
                c++
            }
        }
    }

    for (let a = 0; a < matrizGasto[0].length; a++) {
        for (let j = 0; j < matrizGasto[0].length - 1; j++) {
            if (matrizGasto[1][j] < matrizGasto[1][j + 1]) {
                ordenarMatriz2(matrizGasto, j)
            }
        }
    }

    for (let a = 0; a < matrizGanho[0].length; a++) {
        for (let j = 0; j < matrizGanho[0].length - 1; j++) {
            if (matrizGanho[1][j] < matrizGanho[1][j + 1]) {
                ordenarMatriz2(matrizGanho, j)
            }
        }
    }

    for (let n = 1; n <= 4; n++) {
        document.getElementById("categoria-" + n).innerText = "Categoria"
        document.getElementById("valor-" + n).innerText = "0%"
        document.getElementById("tipo-" + n).innerText = "Tipo"
        document.getElementById("tipo-" + n).classList.remove('verde', 'vermelho')
    }

    let ls = 2
    if (matrizGanho[0].length < 2) {
        ls = matrizGanho[0].length
    }

    for (let i = 1; i <= ls; i++) {
        document.getElementById("categoria-" + i).innerText = matrizGanho[0][i - 1]
        document.getElementById("valor-" + i).innerText = (matrizGanho[1][i - 1] / totalGanho * 100).toFixed(0) + "%"
        document.getElementById("tipo-" + i).innerText = "Ganho"
        document.getElementById("tipo-" + i).classList.add('verde')
    }

    ls = 2
    if (matrizGasto[0].length < 2) {
        ls = matrizGasto[0].length
    }
    for (let i = 1; i <= ls; i++) {
        document.getElementById("categoria-" + (i + 2)).innerText = matrizGasto[0][i - 1]
        document.getElementById("valor-" + (i + 2)).innerText = (matrizGasto[1][i - 1] / totalGasto * 100).toFixed(0) + "%"
        document.getElementById("tipo-" + (i + 2)).innerText = "Gasto"
        document.getElementById("tipo-" + (i + 2)).classList.add('vermelho')
    }
}

function ordenarMatriz2(matriz, j) {
    let aux
    aux = matriz[0][j]
    matriz[0][j] = matriz[0][j + 1]
    matriz[0][j + 1] = aux

    aux = matriz[1][j]
    matriz[1][j] = matriz[1][j + 1]
    matriz[1][j + 1] = aux
}

