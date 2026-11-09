function mostarCardConifig() {
    document.querySelector('.configuracao').classList.remove('escondido')
}

function cardAdcionarCategoria() {
    document.querySelector('.adcionarCategoria').classList.remove('escondido')
}

function adcionarCategoria() {
    debugger
    limparCor('.Categoria1')
    limparCor('.Categoria2')

    let inputTipo = document.getElementById("tipoCategoria").value
    let inputNome = document.getElementById("nomeCategoria").value

    if (inputTipo != "0" && inputNome != "") {
        let contas = JSON.parse(localStorage.getItem("contas"))
        let i = parseInt(JSON.parse(localStorage.getItem("posicao")))

        let r = 0
        for (let k = 0; k < contas[i].categoria.length; k++) {
            if (inputNome == contas[i].categoria[k].nome) {
                r = 1
            }
        }

        if (r == 0) {
            adcionarBorda('.Categoria1', 'ativacao-green')
            adcionarBorda('.Categoria2', 'ativacao-green')

            let k = contas[i].categoria.length
            contas[i].categoria[k] = {}
            contas[i].categoria[k].nome = inputNome
            contas[i].categoria[k].tipo = inputTipo

            localStorage.setItem("contas", JSON.stringify(contas))
            atualizarCategoria()

        } else {
            adcionarBorda('.Categoria1', 'ativacao-red')
            adcionarBorda('.Categoria2', 'ativacao-red')
            alert("Categoria ja existente")
        }
    } else {
        adcionarBorda('.Categoria1', 'ativacao-red')
        adcionarBorda('.Categoria2', 'ativacao-red')
    }

}

function xCategoria() {
    document.querySelector('.adcionarCategoria').classList.add('escondido')

    document.getElementById("tipoCategoria").value = "0"
    document.getElementById("nomeCategoria").value = ""
}

function atualizarCategoria() {
    debugger
    let contas = JSON.parse(localStorage.getItem("contas"))
    let i = parseInt(JSON.parse(localStorage.getItem("posicao")))

    if (contas[i].categoria.length > 0) {
        document.getElementById("categoriaGastoOPT").innerHTML = ""
        document.getElementById("categoriaGanhoOPT").innerHTML = ""
        document.getElementById("grupoGasto").innerHTML = ""
        document.getElementById("grupoGanho").innerHTML = ""

        for (let k = 0; k < contas[i].categoria.length; k++) {
            let option = '<option value="' + contas[i].categoria[k].nome + '">' + contas[i].categoria[k].nome + '</option>'

            if (contas[i].categoria[k].tipo == "Gasto") {
                document.getElementById("categoriaGastoOPT").innerHTML += option
                document.getElementById("grupoGasto").innerHTML += option
            } else {
                document.getElementById("categoriaGanhoOPT").innerHTML += option
                document.getElementById("grupoGanho").innerHTML += option
            }
        }
    } else {
        let nomes = [
            "Alimentação", "Moradia", "Transporte", "Saúde e medicamentos", "Lazer e entretenimento",
            "Salário", "Freelances", "Venda de produtos", "Rendimentos de poupança", "Mesada"
        ]

        for (let k = 0; k < nomes.length; k++) {
            contas[i].categoria[k] = {}
            contas[i].categoria[k].nome = nomes[k]
            if (k < 5) {
                contas[i].categoria[k].tipo = "Gasto"
            } else {
                contas[i].categoria[k].tipo = "Ganho"
            }
        }
        localStorage.setItem("contas", JSON.stringify(contas))
        atualizarCategoria()
    }
}

function mostrarCardExcluir() {
    document.querySelector('.excluir').classList.remove('escondido')
    xConfiguracao()
}

function excluir() {
    debugger
    limparCor('.Codigo1')

    let inputCodigo = document.getElementById("codigo").value

    if (inputCodigo != "") {
        let contas = JSON.parse(localStorage.getItem("contas"))
        let i = parseInt(JSON.parse(localStorage.getItem("posicao")))

        let r = verificarExistencia(inputCodigo)

        if (r != -1) {
            document.querySelector('.Codigo1').classList.add('ativacao-green')

            let aux = []
            aux[i] = {}
            aux[i].gasto = []
            aux[i].ganho = []

            let j = 0
            for (let k = 0; k < contas[i].gasto.length; k++) {
                if (contas[i].gasto[k].codigo != inputCodigo) {
                    aux[i].gasto[j] = {}
                    aux[i].gasto[j].valorGanho = contas[i].gasto[k].valorGasto
                    aux[i].gasto[j].categoriaGanho = contas[i].gasto[k].categoriaGasto
                    aux[i].gasto[j].dataGanho = contas[i].gasto[k].dataGasto
                    aux[i].gasto[j].codigo = contas[i].gasto[k].codigo
                    j++
                }
            }

            j = 0
            for (let k = 0; k < contas[i].ganho.length; k++) {
                if (contas[i].ganho[k].codigo != inputCodigo) {
                    aux[i].ganho[j] = {}
                    aux[i].ganho[j].valorGanho = contas[i].ganho[k].valorGanho
                    aux[i].ganho[j].categoriaGanho = contas[i].ganho[k].categoriaGanho
                    aux[i].ganho[j].dataGanho = contas[i].ganho[k].dataGanho
                    aux[i].ganho[j].codigo = contas[i].ganho[k].codigo
                    j++
                }
            }

            contas[i].gasto = []
            for (let k = 0; k < aux[i].gasto.length; k++) {
                contas[i].gasto[k] = {}
                contas[i].gasto[k].valorGasto = aux[i].gasto[k].valorGanho
                contas[i].gasto[k].categoriaGasto = aux[i].gasto[k].categoriaGanho
                contas[i].gasto[k].dataGasto = aux[i].gasto[k].dataGanho
                contas[i].gasto[k].codigo = aux[i].gasto[k].codigo
            }

            contas[i].ganho = []
            for (let k = 0; k < aux[i].ganho.length; k++) {
                contas[i].ganho[k] = {}
                contas[i].ganho[k].valorGanho = aux[i].ganho[k].valorGanho
                contas[i].ganho[k].categoriaGanho = aux[i].ganho[k].categoriaGanho
                contas[i].ganho[k].dataGanho = aux[i].ganho[k].dataGanho
                contas[i].ganho[k].codigo = aux[i].ganho[k].codigo
            }
            localStorage.setItem("contas", JSON.stringify(contas))
            atualizarSaldo()
        } else {
            document.querySelector('.Codigo1').classList.add('ativacao-red')
        }
    } else {
        document.querySelector('.Codigo1').classList.add('ativacao-red')
    }
}

function verificarExistencia(codigo) {
    debugger
    let contas = JSON.parse(localStorage.getItem("contas"))
    let i = parseInt(JSON.parse(localStorage.getItem("posicao")))
    let r = -1
    for (let k = 0; k < contas[i].gasto.length; k++) {
        if (contas[i].gasto[k].codigo == codigo) {
            r = k
        }
    }
    for (let k = 0; k < contas[i].ganho.length; k++) {
        if (contas[i].ganho[k].codigo == codigo) {
            r = k
        }
    }
    return r
}

function xExcluir() {
    document.getElementById("codigo").value = ""
    mostarCardConifig()
    document.querySelector('.excluir').classList.add('escondido')
    document.querySelector('.Codigo1').classList.remove('ativacao-green')
    document.querySelector('.Codigo1').classList.remove('ativacao-red')
}

function xConfiguracao() {
    document.querySelector('.configuracao').classList.add('escondido');
}