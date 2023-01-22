import { openModal } from "./modals"

export let cart = () => {
    let cartModal = document.getElementById('cart-modal')
    let openCartBtn = document.getElementById('open-cart-btn')

    openCartBtn.addEventListener('click', () => openModal(cartModal))
}
