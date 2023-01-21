let authBtn = document.getElementById('open-auth-btn')
let authModal = document.getElementById('auth-modal')
let closeModalBtns = authModal.querySelectorAll('.close-btn')
let loginBtn = authModal.querySelector('.login-btn')
let logoutBtn = document.getElementById('logout-btn')
let openCartBtn = document.getElementById('open-cart-btn')

let openModal = () => {
    authModal.classList.add('d-block')
    
    setTimeout(() => {
        authModal.classList.add('show')
    }, 200)
}

let closeModal = () => {
    authModal.classList.remove('show')
    
    setTimeout(() => {
        authModal.classList.remove('d-block')
    }, 500)
}

let checkAuth = () => {
    let authData = JSON.parse(localStorage.getItem('authData'))

    if (authData) {
        login()
    }
}

let login = () => {
    authBtn.classList.add('d-none')

    logoutBtn.classList.remove('d-none')
    openCartBtn.classList.remove('d-none')
    closeModal()
}

let logout = () => {
    localStorage.removeItem('authData')

    authBtn.classList.remove('d-none')

    logoutBtn.classList.add('d-none')
    openCartBtn.classList.add('d-none')
}

authBtn.addEventListener('click', openModal)

closeModalBtns.forEach((closeModalBtn) => {
    closeModalBtn.addEventListener('click', closeModal)
})

loginBtn.addEventListener('click', () => {
    let loginForm = authModal.querySelector('#login-form')
    let loginFormData = new FormData(loginForm)

    let loginValue = loginFormData.get('login')
    let passwordValue = loginFormData.get('password')

    if (loginValue && passwordValue) {
        let authData = {
            login: loginValue,
            password: passwordValue,
        }
    
        localStorage.setItem('authData', JSON.stringify(authData))
    
        login()

        return
    }

    alert('Введите данные для входа')
})

logoutBtn.addEventListener('click', logout)

checkAuth()