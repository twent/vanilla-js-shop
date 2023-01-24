import slugify from "slugify"

import { request } from "../api"
import { HttpMethods } from "../utils"

export const categoriesModule = () => {
    let form = document.getElementById('create-category-form')
    let inputs = form.querySelectorAll('input')
    let submitBtn = form.querySelector('#create-category-btn')
    let categoriesContainer = document.getElementById("category-container")
    let productCategorySelect = document.getElementById("product-category-select")
    let previewInBase64 = ''

    let validateFormData = () => {
        let formData = new FormData(form)
        let title = formData.get('title')
        let preview = formData.get('preview')

        let previevHasValidFormat =
            preview.type === 'image/jpeg'
            || preview.type === 'image/jpg'
            || preview.type === 'image/png'

        if (!title || !preview || preview.size <= 0 || !previevHasValidFormat) {
            return submitBtn.disabled = true
        }

        let fileReader = new FileReader()

        fileReader.onload = () => {
            submitBtn.disabled = false
            // Get image in Base64
            previewInBase64 = fileReader.result
        }

        fileReader.readAsDataURL(preview)
        
        return [title.trim(), previewInBase64]
    }

    let renderCategoriesTable = async () => {
        let categories = await request('/categories')
        categories && renderCategories(categories)
    }

    let renderCategories = (data) => {
        categoriesContainer.innerHTML = ''

        data.forEach((item, index) => {
            categoriesContainer.insertAdjacentHTML('beforeend', `
                <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${item.title}</td>
                    <td class="text-end">
                        <button type="button" class="btn btn-outline-danger btn-sm delete-category" data-id=${item.id}>
                            удалить
                        </button>
                    </td>
                </tr>
            `)

            // Render select options
            productCategorySelect.insertAdjacentHTML('beforeend', `
                <option value="${item.id}">${item.title}</option>
            `)
        })

        // Delete buttons
        let deleteCategoryBtns = categoriesContainer.querySelectorAll('.btn.btn-outline-danger')

        deleteCategoryBtns.forEach(btn => btn.addEventListener('click', async () => {
            let id = btn.dataset.id

            id && await request('/categories', HttpMethods.DELETE, id)
                .then(() => renderCategoriesTable())
        }))
    }

    inputs.forEach(input => input.addEventListener('input', () => {
        setTimeout(() => validateFormData(), 750)
    }))

    // Create category
    form.addEventListener('submit', async (event) => {
        event.preventDefault()

        let [title, preview] = validateFormData()

        let category = {
            "title": title,
            "slug": slugify(title).toLowerCase(),
            "preview": preview
        }

        return await request('/categories', HttpMethods.POST, category)
            .then(() => {
                form.reset()
                renderCategoriesTable()
            })
    })

    // Init
    validateFormData()
    renderCategoriesTable()
}