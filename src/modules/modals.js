let closeModalBtns = document.querySelectorAll('.close-btn')

export let openModal = (modal) => {
    modal.classList.add('d-block')
    
    setTimeout(() => {
        modal.classList.add('show')
    }, 200)
}

export let closeModal = (modal) => {
    modal.classList.remove('show')
    
    setTimeout(() => {
        modal.classList.remove('d-block')
    }, 500)
}

let closeModalBtnHandler = (button) => {
    let parentModal = button.closest('.modal')
    
    button.addEventListener('click', () => closeModal(parentModal))
}

closeModalBtns.forEach((closeModalBtn) => closeModalBtnHandler(closeModalBtn))