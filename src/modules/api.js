let baseUrl = 'http://localhost:3001' 

export let get = async (path) => {
    return await fetch(baseUrl + path)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка получения данных: ${path}`)
            }

            return response.json()
        })
        .catch(error => console.error(error.message))
}
