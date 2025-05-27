function loadProducts (url) {
    fetch(url)
     .then(data => data.json())
     .then(item => {
        setProducts(item.products)

        const nextPage = 'https://' + item.nextPage
        const btnLoadProduct = document.getElementById('moreProducts')
        btnLoadProduct.onclick = () => loadProducts(nextPage)
    
     })
}

function setProducts (products) {
    const $productsList = document.getElementById('productsList')
    let imageId = 0

    products.forEach((product) => {
        $productsList.innerHTML += `
             <div class="product">
                 <div class="productImage">
                     <img src=${images[imageId].url} alt="">
                 </div>

                <div class="productInfo"> 

                    <h4>${product.name}</h3>

                    <p>
                        ${product.description}
                    </p>

                    <ul>
                        <li>De: R$${product.oldPrice},99</li>

                        <li>Por: R$${product.price},99</li>

                        <li>ou ${product.installments.count}x de R$${parseInt(product.installments.value)},99</li>
                    </ul>

                    <button>Comprar</button>
                </div>
             </div>
        `
        imageId++
     })

     
}

function verifyCpf (cpf) {
    
    const cpfNumbers = Array.from(cpf, Number)
    const isDistinct = cpfNumbers.every(function(curr){
        return curr === cpfNumbers[0]
    })
    
    
    if(cpfNumbers.length === 11) {
        if(!isDistinct) {

            let multiply = 10
            let total = 0
            let remainder = 0
            const firstDigit = cpfNumbers[9]
            const secondDigit = cpfNumbers[10]

            const verifyDigits = (remainder, digit) => {
                return remainder === digit ? true : false
            }

            for(let i = 0; i <= 8; i++) {
                total += cpfNumbers[i] * multiply
                multiply--
            }

            remainder = (total * 10) % 11
            if (remainder === 10) {
                remainder = 0
            }
            const isFirstValid = verifyDigits(remainder, firstDigit)

            multiply = 11
            total = 0

            for(let i = 0; i <= 9; i++) {
                total += cpfNumbers[i] * multiply
                multiply--
            }

            remainder = (total * 10) % 11
            if (remainder === 10) {
                remainder = 0
            }
            const isSecondValid = verifyDigits(remainder, secondDigit)

            return isFirstValid && isSecondValid ? true : false

        } else {
            return false
        }


    } else {
        return false
    }
   
}

loadProducts('https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1')

const formRegistration = document.getElementById('formRegistration')

formRegistration.onsubmit = (e) => {
    e.preventDefault()

    const inputName = document.forms['formRegistration']['name']
    const spanName = inputName.nextElementSibling
    let isFormValid = true

    if(inputName.value === '') {
        inputName.classList.add('error')
        spanName.innerText = 'Preencha o campo nome!'
        isFormValid = false
    } else {
        inputName.classList.remove('error')
        spanName.innerText = ''
    }

    const inputEmail = document.forms['formRegistration']['email']
    const spanEmail = inputEmail.nextElementSibling

    if(inputEmail.value === '') {
        inputEmail.classList.add('error')
        spanEmail.innerText = 'Preencha o campo email!'
        isFormValid = false
    } else {
        inputEmail.classList.remove('error')
        spanEmail.innerText = ''
    }
    
    const inputCpf = document.forms['formRegistration']['cpf']
    const spanCpf = inputCpf.nextElementSibling

    

    if(inputCpf.value === '') {
        inputCpf.classList.add('error')
        spanCpf.innerText = 'Preencha o campo CPF!'
        isFormValid = false
    } else {
        if(!verifyCpf(inputCpf.value)) {
            inputCpf.classList.add('error')
            spanCpf.innerText = 'Digite um CPF válido!'
            isFormValid = false
        } else {
            inputCpf.classList.remove('error')
            spanCpf.innerText = ''
        }
        
    }



    const inputSexo = document.forms['formRegistration']['sexo']
    const checkbox = document.querySelector('.checkbox')
    const spanCheckbox = checkbox.nextElementSibling

    if(inputSexo.value === '') {
        checkbox.classList.add('error')
        spanCheckbox.innerText = 'Selecione o sexo!'
        isFormValid = false
    } else {
        checkbox.classList.remove('error')
        spanCheckbox.innerText = ''
    }
    
    const spanRegistered = document.forms['formRegistration']['submit'].nextElementSibling
    
    if(isFormValid) {
        spanRegistered.innerText = 'Dados cadastrados com sucesso!'
    } else {
        spanRegistered.innerText = ''
    }
}

const formSharing = document.getElementById('formSharing')
formSharing.onsubmit = (e) => {
    e.preventDefault()

    const inputNome = document.forms['formSharing']['name']
    const spanName = inputNome.nextElementSibling
    let isFormValid = true

    if(inputNome.value === '') {
        inputNome.classList.add('error')
        spanName.innerText = 'Preencha o campo nome!'
        isFormValid = false
    } else {
        inputNome.classList.remove('error')
        spanName.innerText = ''
    }

    const inputEmail = document.forms['formSharing']['email']
    const spanEmail = inputEmail.nextElementSibling

    if(inputEmail.value === '') {
        inputEmail.classList.add('error')
        spanEmail.innerText = 'Preencha o campo email!'
        isFormValid = false
    } else {
        inputEmail.classList.remove('error')
        spanEmail.innerText = ''
    }

    const spanRegistered = document.forms['formSharing']['submit'].nextElementSibling

    if(isFormValid) {
        spanRegistered.innerText = 'Dados cadastrados com sucesso!'
    } else {
        spanRegistered.innerText = ''
    }
}

const images = [
    {
        url: './img/img0.png'
    } , 

    {
        url: './img/img1.png'
    } ,

    {
        url: './img/img2.png'
    } , 

    {
        url: './img/img3.png'
    } , 

    {
        url: './img/img4.png'
    } , 

    {
        url: './img/img5.png'
    } , 

    {
        url: './img/img6.png'
    } , 

    {
        url: './img/img7.png'
    } , 

]