import { request } from './api'
import { Categories } from './categories'
import { HttpMethods, Rubbles, upperify } from './utils'

let catalogTitleElement = document.getElementById('catalog-title')
let productsContainer = document.getElementById('products-container')
let productSearch = document.querySelector('input.catalog-search')

let params = new URLSearchParams(window.location.search)
let categorySlugUpperCase = params.get('slug') ? upperify(params.get('slug')) : null
let category = Object.hasOwn(Categories, categorySlugUpperCase) ? Categories[categorySlugUpperCase] : null

let path = category ? `/products?categoryId=${category.id}` : '/products'
let searchPath = category ? `/products?categoryId=${category.id}&q=` : '/products?q='
let catalogTitle = category ? category.title : 'Каталог'
//let path = categorySlug ? `/products?category.slug=${categorySlug}&_expand=category` : '/products'

export let renderProducts = async () => {
    let data = await request(path)

    catalogTitleElement.textContent = catalogTitle
    data && render(data)

    let addToCartBtns = productsContainer.querySelectorAll('button.add-to-cart')

    addToCartBtns.forEach(btn => btn.addEventListener('click', async (event) => {
        event.preventDefault()
        let productId = Number(btn.dataset.id)
        let data = { "productId": productId, "count": 1 }
        let cartItem = await request(`/cart?productId=${productId}`)

        if (!cartItem.length > 0) {
            return await request('/cart', HttpMethods.POST, data)
        }

        let putData = {
            "count": Number(cartItem[0].count) + 1
        }
 
        return await request(`/cart/${cartItem[0].id}`, HttpMethods.PATCH, putData)
    }))
}

productSearch.addEventListener('input', () => {
    setTimeout(async () => {
        let data = await request(searchPath + productSearch.value)
        data && render(data)
    }, 750)
})

let render = (data) => {
    productsContainer.innerHTML = ''

    data.forEach((item) => {
        productsContainer.insertAdjacentHTML('beforeend', `
            <div class="col col-12 col-sm-6 col-lg-4 col-xl-3 mb-3">
                <a href="/products/${item.slug}" class="card-link">
                    <div class="card">
                        <img src="${item.preview}" class="card-img-top" alt="${item.title}">
                        <div class="card-body">
                            <span class="mb-2 d-block text-secondary">${item.subcategory}</span>
                            <h6 class="card-title mb-3">${item.title}</h6>

                            <div class="row">
                                <div class="col d-flex align-itemns-center justify-content-between">
                                    <h4>${Rubbles.format(item.price)}</h4>
                                    <button type="button" data-id=${item.id} class="add-to-cart btn btn-outline-dark">
                                        <img src="/images/icon/shopping-cart-big.svg" alt="add-to-cart">
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        `)
    })
}
