let closeModalBtns = document.querySelectorAll('.close-btn')

export let openModal = (modal) => {
    let backdrop = document.createElement('div')
    backdrop.classList.add('modal-backdrop', 'fade')
    document.body.append(backdrop)

    modal.classList.add('d-block')
    
    setTimeout(() => {
        backdrop.classList.add('show')
        modal.classList.add('show')
    }, 200)
}

export let closeModal = (modal) => {
    let backdrop = document.querySelector('.modal-backdrop')

    modal.classList.remove('show')
    backdrop && backdrop.classList.remove('show')
    
    setTimeout(() => {
        modal.classList.remove('d-block')
        backdrop && backdrop.remove()
    }, 500)
}

let closeModalBtnHandler = (button) => {
    let parentModal = button.closest('.modal')
    
    button.addEventListener('click', () => closeModal(parentModal))
}

closeModalBtns.forEach((closeModalBtn) => closeModalBtnHandler(closeModalBtn))