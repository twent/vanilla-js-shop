import slugify from "slugify"

import { request } from "../api"
import { HttpMethods } from "../utils"
import { Rubbles, Timestamp } from "../utils"

export const productsModule = () => {
    let form = document.getElementById('create-product-form')
    let inputs = form.querySelectorAll('input')
    let submitBtn = form.querySelector('#create-product-btn')
    let productsContainer = document.getElementById("products-table")
    let productCategorySelect = document.getElementById("product-category-select")
    let previewInBase64 = ''

    let validateFormData = () => {
        let formData = new FormData(form)
        let title = formData.get('title')
        let category_id = formData.get('category_id')
        let subcategory = formData.get('subcategory') 
        let price = formData.get('price') ? Number(formData.get('price')) : 0
        let preview = formData.get('preview')

        let previevHasValidFormat =
            preview.type === 'image/jpeg'
            || preview.type === 'image/jpg'
            || preview.type === 'image/png'

        if (
            !title || !preview || !category_id || category_id == 0 || !subcategory || !price || price <= 0
            || preview.size <= 0 || !previevHasValidFormat
        ) {
            return submitBtn.disabled = true
        }

        let fileReader = new FileReader()

        fileReader.onload = () => {
            submitBtn.disabled = false
            // Get image in Base64
            return previewInBase64 = fileReader.result
        }

        fileReader.readAsDataURL(preview)

        return [category_id, subcategory.trim(), title.trim(), price, previewInBase64]
    }

    let renderProductsTable = async (category_id = null) => {
        let path = category_id ? `/products?categoryId=${category_id}` : '/products' 
        let products = await request(path)
        products && renderProducts(products)
    }

    let renderProducts = (data) => {
        productsContainer.innerHTML = ''

        data.forEach((item, index) => {
            productsContainer.insertAdjacentHTML('beforeend', `
                <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${item.subcategory}</td>
                    <td>${item.title}</td>
                    <td>${Rubbles.format(item.price)}</td>
                    <td class="text-end">
                        <button type="button" data-id="${item.id}" class="btn btn-outline-danger btn-sm">
                            удалить
                        </button>
                    </td>
                </tr>
            `)
        })

        // Delete buttons
        let deleteProductBtns = productsContainer.querySelectorAll('.btn.btn-outline-danger')

        deleteProductBtns.forEach(btn => btn.addEventListener('click', async () => {
            let id = btn.dataset.id

            id && await request('/products', HttpMethods.DELETE, id)
                .then(() => renderProductsTable())
        }))
    }

    inputs.forEach(input => input.addEventListener('input', () => {
        setTimeout(() => validateFormData(), 750)
    }))

    productCategorySelect.addEventListener('change', (event) => {
        let id = event.target.value != 0 ? event.target.value : null

        validateFormData()
        renderProductsTable(id)
    })

    // Create product
    form.addEventListener('submit', async (event) => {
        event.preventDefault()

        let [
            category_id,
            subcategory,
            title,
            price,
            previewInBase64
        ]
            = validateFormData()

        let product = {
            "categoryId": category_id,
            "subcategory": subcategory,
            "slug": slugify(title).toLowerCase(),
            "title": title,
            "preview": previewInBase64,
            "price": price,
            "createdAt": Timestamp
        }

        return await request('/products', HttpMethods.POST, product)
            .then(() => {
                form.reset()
                renderProductsTable()
            })
    })

    // Init
    validateFormData()
    renderProductsTable()
}