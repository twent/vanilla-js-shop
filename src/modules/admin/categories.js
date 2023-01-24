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

        if (!title || !preview) { 
            return submitBtn.disabled = true
        }
        
        submitBtn.disabled = false
        
        if (preview.size > 0) {
            if (preview.type !== 'image/jpeg' || preview.type !== 'image/jpg' || preview.type !== 'image/png') {
                submitBtn.disabled = true
            }

            let fileReader = new FileReader()
                
            fileReader.onload = () => {
                submitBtn.disabled = false
                // Get image in Base64
                previewInBase64 = fileReader.result
            }

            fileReader.onerror = () => {
                return submitBtn.disabled = true
            }

            fileReader.readAsDataURL(preview)
        }

        return [title.trim(), previewInBase64]
    }

    let updateCategoriesTable = async () => {
        let categories = await request('/categories')
        categories && renderCategories(categories)
    }

    let renderCategories = (data) => {
        categoriesContainer.innerHTML = ''
        productCategorySelect.innerHTML = '<option selected>Выберите категорию</option>'

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

        let deleteCategoryBtns = categoriesContainer.querySelectorAll('.btn.btn-outline-danger')

        deleteCategoryBtns.forEach(btn => btn.addEventListener('click', async () => {
            let id = btn.dataset.id
            console.log(id);
            id && await request('/categories', HttpMethods.DELETE, id)
                .then(() => updateCategoriesTable())
        }))
    }

    inputs.forEach(input => input.addEventListener('input', () => {
        setTimeout(() => validateFormData(), 750)
    }))

    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        
        let [title, preview] = validateFormData()

        let category = {
            "title": title,
            "slug": slugify(title).toLowerCase(),
            "preview": preview
        }

        await request('/categories', HttpMethods.POST, category).then(() => form.reset())
            .then(() => updateCategoriesTable())
    })

    validateFormData()
    
    updateCategoriesTable()
}