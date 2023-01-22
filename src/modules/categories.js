import { get } from "./api"

/**
 * Enum for categories.
 * @readonly
 * @enum {{id: int, slug: string, title: string}}
 */
export const Categories = Object.freeze({
    PHONES:   { id: 1, slug: "phones" ,title: "Смартфоны" },
    ACCESSORIES:  { id: 2, slug: "accessories" ,title: "Аксессуары" },
    SMART_DEVICES: { id: 3, slug: "smart-devices" ,title: "Умные устройства" }
})

export const findBySlug = (slug) => {
    switch (slug) {
        case Categories.PHONES.slug:
            return Categories.PHONES
        case Categories.ACCESSORIES.slug:
            return Categories.ACCESSORIES
        case Categories.SMART_DEVICES.slug:
            return Categories.SMART_DEVICES
        default:
            return null
    }
}

export let renderCategories = async () => {
    let data = await get('/categories')

    data && render(data)
}

let categoriesContainer = document.getElementById('categories-container')

let render = (data) => {
    data.forEach((item) => {
        categoriesContainer.insertAdjacentHTML('beforeend', `
            <div class="col col-12 col-md-6 col-lg-4 mb-3">
                <a href="/catalog.html?slug=${item.slug}" class="card-link">
                    <div class="card">
                        <img src="${item.preview}" class="card-img-top" alt="${item.title}">
                        <div class="card-body">
                            <h5 class="card-title">${item.title}</h5>
                        </div>
                    </div>
                </a>
            </div>
        `)
    })
}
