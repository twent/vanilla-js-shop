import { get } from "./api"
import { openModal } from "./modals"
import { Rubbles } from "./utils"

let cartModal = document.getElementById('cart-modal')
let openCartBtn = document.getElementById('open-cart-btn')
let totalPriceElement = cartModal.querySelector('#cart-totlal-price')

export let cart = () => {
    openCartBtn.addEventListener('click', async () => {
        let data = await get('/cart?_expand=product')
        
        data && render(data)
        
        openModal(cartModal)
    })
}

let cartContainer = document.getElementById('cart-container')

let render = (data) => {
    let totalAmount = 0
    cartContainer.innerHTML = ''

    data.forEach((item) => {
        let amount = item.product.price * item.count
        totalAmount += amount

        cartContainer.insertAdjacentHTML('beforeend', `
            <div class="row border-bottom pb-3 pt-3">
                <div class="col col-12 col-md-6 mb-3 mb-md-0 fs-4">
                    ${item.product.title}
                </div>
                <div class="col col-12 col-md-6 fs-4 d-flex align-items-center justify-content-end flex-wrap">
                    <h4 class="me-3 d-flex align-itemns-center">${Rubbles.format(amount)}</h4>
                        <button type="button" class="btn btn-outline-dark btn-sm cart-item-controls" id="control-dec">
                            -
                        </button>
                        <h6 class="cart-item-count me-3 ms-3">${item.count}</h6>
                        <button type="button" class="btn btn-outline-dark btn-sm cart-item-controls" id="control-inc">
                            +
                        </button>
                </div>
            </div>
        `)
    })

    totalPriceElement.innerHTML = Rubbles.format(totalAmount)
}
