const formIdade = document.getElementById('dataInput')


function verificarIdade (e) {
    e.preventDefault()

    if(inputEstaVazio ()) {
        console.log('sim')
        return
    }

    verificarDatas(mostrarIdade)   
}

function inputEstaVazio () {

    let estaVazio = false

    for(let i = 0; i <= 2; i++) {
        let input = document.forms[0][i]
        const label = input.parentElement
        const span = input.nextElementSibling
    
        if(input.value === '') {
            input.classList.add('error')
            label.classList.add('error')
            span.classList.add('visible')
            estaVazio = true
        } else {
            input.classList.remove('error')
            label.classList.remove('error')
            span.classList.remove('visible')
        }
    }

    return estaVazio
}

function verificarDatas (callback) {
    const data = new Date
    const data_ano = data.getFullYear()

    const inputDia = document.forms['dataInput']['dia']
    const inputMes = document.forms['dataInput']['mes']
    const inputAno = document.forms['dataInput']['ano']

    const labelDia = inputDia.parentElement
    const labelMes = inputMes.parentElement
    const labelAno = inputAno.parentElement

    const spanDia = inputDia.nextElementSibling
    const spanMes = inputMes.nextElementSibling
    const spanAno = inputAno.nextElementSibling

    let maximoDeDias = 0
    let dataEstaCorreta = true


    if(inputAno.value > data_ano) {
        inputAno.classList.add('error')
        labelAno.classList.add('error')
        spanAno.classList.add('visible')
        spanAno.innerText = 'Insira um ano válido!'
        dataEstaCorreta = false
    } else  {
        inputAno.classList.remove('error')
        labelAno.classList.remove('error')
        spanAno.classList.remove('visible')
    }


    if(inputMes.value < 1 || inputMes.value > 12) {
        inputMes.classList.add('error')
        labelMes.classList.add('error')
        spanMes.classList.add('visible')
        spanMes.innerText = 'Insira um mês válido!'
        dataEstaCorreta = false
    } else {
        inputMes.classList.remove('error')
        labelMes.classList.remove('error')
        spanMes.classList.remove('visible')

        //Verifica o mês digitado pelo usuário e retorna o número de dias correspondente ao respectivo mês
        switch (parseInt(inputMes.value)) {
            case 1:
               maximoDeDias = 31
               break
            case 2:
                maximoDeDias = 28
                break
            case 3:
                maximoDeDias = 31
                break
            case 4:
                maximoDeDias = 30
                break
            case 5:
                maximoDeDias = 31
                break
            case 6:
                maximoDeDias = 30
                break
            case 7:
                maximoDeDias = 31
                break
            case 8:
                maximoDeDias = 31
                break
            case 9:
                maximoDeDias = 30
                break
            case 10:
                maximoDeDias = 31
                break
            case 11:
                maximoDeDias = 30
                break
            case 12:
                maximoDeDias = 31
                break
            
        }
    }

    

    if(inputDia.value < 1 || inputDia.value > maximoDeDias) {
        inputDia.classList.add('error')
        labelDia.classList.add('error')
        spanDia.classList.add('visible')
        spanDia.innerText = 'Insira um dia válido!'
        dataEstaCorreta = false
    } else {
        inputDia.classList.remove('error')
        labelDia.classList.remove('error')
        spanDia.classList.remove('visible')
    }


    if (dataEstaCorreta) {
        callback(inputDia.value, inputMes.value, inputAno.value)
    }
    
}

function mostrarIdade (dia, mes, ano) {
    
    const $idade = document.getElementById('idade')
    const $meses = document.getElementById('meses')
    const $dias = document.getElementById('dias')

    const data = new Date
    const data_mes = (data.getMonth()) + 1
    const data_ano = data.getFullYear()
    const data_dia = data.getDate()

    const idadeOutput = data_ano - ano
    const mesesOutput = Math.abs(data_mes - mes)
    const diaOutput = Math.abs(data_dia - dia)


    //Tratativa para formatar o texto no singular
    if (idadeOutput === 1) {
        $idade.parentElement.innerHTML = `
        <li>
            <span id="idade">${idadeOutput}</span>
            ano
        </li>
        `
    }

    if(mesesOutput === 1) {
        $meses.parentElement.innerHTML = `
        <li>
            <span id="meses">${mesesOutput}</span>
            mês
        </li>
        `
    }

    if(diaOutput === 1) {
        $dias.parentElement.innerHTML = `
        <li>
            <span id="dias">${diaOutput}</span>
            dia
        </li>
        `
    }
    
    $idade.innerHTML = idadeOutput
    $meses.innerHTML = mesesOutput
    $dias.innerHTML = diaOutput

}

formIdade.onsubmit = verificarIdade