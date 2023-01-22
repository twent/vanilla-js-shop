import { get } from './api'
import { findIdBySlug } from './categories'
import { Rubbles } from './utils'

let params = new URLSearchParams(window.location.search)
let categorySlug = params.get('slug')
let categoryId = findIdBySlug(categorySlug)
let path = categoryId ? `/products?categoryId=${categoryId}` : '/products'
//let path = categorySlug ? `/products?category.slug=${categorySlug}&_expand=category` : '/products'

export let renderProducts = async () => {
    let data = await get(path)
    
    data && render(data)
}

let productsContainer = document.getElementById('products-container')

let render = (data) => {
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
                                    <button type="button" class="btn btn-outline-dark">
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
