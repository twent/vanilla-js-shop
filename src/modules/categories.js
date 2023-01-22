import { get } from "./api"

export let categories = async () => {
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
