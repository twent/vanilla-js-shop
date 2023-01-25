import { request } from "./api"
import { openModal } from "./modals"
import { HttpMethods, Rubbles } from "./utils"

let cartModal = document.getElementById('cart-modal')
let openCartBtn = document.getElementById('open-cart-btn')
let cartContainer = document.getElementById('cart-container')
let totalPriceElement = cartModal.querySelector('#cart-totlal-price')

let getCartItems = async () => await request('/cart?_expand=product')

let updateData = async () => {
    let data = await getCartItems()
        
    data && render(data)

    addCountBtnListeners()
}

export let cart = () => {
    openCartBtn.addEventListener('click', async () => {
        updateData()    
        
        openModal(cartModal)
    })
}

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
                        <button type="button" data-id="${item.id}" class="btn decrease btn-outline-dark btn-sm cart-item-controls" id="control-dec">
                            -
                        </button>
                        <h6 class="cart-item-count me-3 ms-3">${item.count}</h6>
                        <button type="button" data-id="${item.id}" class="btn increase btn-outline-dark btn-sm cart-item-controls" id="control-inc">
                            +
                        </button>
                </div>
            </div>
        `)
    })

    totalPriceElement.innerHTML = Rubbles.format(totalAmount)
}

let addCountBtnListeners = () => {
    // Add increase & decrease listeners
    let increaseBtns = cartContainer.querySelectorAll('button.btn.increase')
    let decreaseBtns = cartContainer.querySelectorAll('button.btn.decrease')

    increaseBtns.forEach(btn => btn.addEventListener('click', async (event) => {
        event.preventDefault()
        let id = Number(btn.dataset.id)
        let countElem = btn.parentElement.querySelector('h6.cart-item-count')
        let count = Number(countElem.textContent.trim())

        let data = { "count": Number(count) + 1 }

        return await request(`/cart/${id}`, HttpMethods.PATCH, data)
            .then(() => updateData())
    }))

    decreaseBtns.forEach(btn => btn.addEventListener('click', async (event) => {
        event.preventDefault()
        let id = Number(btn.dataset.id)
        let countElem = btn.parentElement.querySelector('h6.cart-item-count')
        let count = Number(countElem.textContent.trim())
        
        if (count > 1) {
            let data = { "count": Number(count) - 1 }

            return await request(`/cart/${id}`, HttpMethods.PATCH, data)
                .then(() => updateData())
        }
    }))
}
