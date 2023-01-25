import { request } from "./api"
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

let categoriesContainer = document.getElementById('categories-container')
let categorySearch = document.querySelector('input.catalog-search')

export let renderCategories = async () => {
    let data = await request('/categories')

    data && render(data)

}

categorySearch.addEventListener('input', () => {
    setTimeout(async () => {
        let data = await request(`/categories?q=${categorySearch.value}`)
        data && render(data)
    }, 750)
})


let render = (data) => {
    categoriesContainer.innerHTML = ''

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
