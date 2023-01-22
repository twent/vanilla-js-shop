import { get } from './api'
import { openModal, closeModal } from "./modals"

export let auth = () => {
    let authBtn = document.getElementById('open-auth-btn')
    let authModal = document.getElementById('auth-modal')
    let loginBtn = authModal.querySelector('.login-btn')
    let logoutBtn = document.getElementById('logout-btn')
    let openCartBtn = document.getElementById('open-cart-btn')
    
    let loginForm = authModal.querySelector('#login-form')
    let loginInput = document.getElementById("login")
    let passwordInput = document.getElementById("password")

    let checkAuth = () => {
        let authData = JSON.parse(localStorage.getItem('authData'))

        authData && checkAuthData(authData)
    }

    async function validateLoginForm(loginForm) {
        let loginFormData = new FormData(loginForm)

        let loginValue = loginFormData.get('login')
        let passwordValue = loginFormData.get('password')
        let authData = {}

        if (loginValue && passwordValue) {
            authData = {
                login: loginValue,
                password: passwordValue,
            }

            await checkAuthData(authData)
        } else {
            showLoginFormErrors()
            return alert('Введите данные для входа')
        }
    }

    let showLoginFormErrors = () => {
        loginInput.classList.add('is-invalid')
        passwordInput.classList.add('is-invalid')
        loginForm.classList.add('was-validated')
    }

    let resetLoginFormErrors = () => {
        loginInput.classList.remove('is-invalid')
        passwordInput.classList.remove('is-invalid')
        loginForm.classList.remove('was-validated')
    }

    async function checkAuthData(authData) {
        let userData = await get('/profile')

        if (
            (userData.login && userData.login == authData.login) &&
            (userData.password && userData.password == authData.password)
        ) {
            resetLoginFormErrors()
            localStorage.setItem('authData', JSON.stringify(userData))

            successLoginDomActions()
        } else {
            showLoginFormErrors()

            return alert('Неверные данные для входа')
        }
    }

    let successLoginDomActions = () => {
        authBtn.classList.add('d-none')

        logoutBtn.classList.remove('d-none')
        openCartBtn.classList.remove('d-none')
        
        closeModal(authModal)
    }

    let logout = () => {
        localStorage.removeItem('authData')

        authBtn.classList.remove('d-none')

        logoutBtn.classList.add('d-none')
        openCartBtn.classList.add('d-none')
    }

    authBtn.addEventListener('click', () => openModal(authModal))

    loginBtn.addEventListener('click', async () => {
        await validateLoginForm(loginForm)
    })

    logoutBtn.addEventListener('click', logout)

    checkAuth()
}