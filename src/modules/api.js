import { HttpMethods } from "./utils"


let baseUrl = 'http://localhost:3001'

/**
 * @async
 * @method
 * @param {string} path
 * @param {string|null} method
 * @param {object|null} data
 */
export let request = async (path, method = HttpMethods.GET, data = null) => {
    let config = {}

    if (Object.hasOwn(HttpMethods, method.toUpperCase())) {
        config = {
            method,
            headers: {
                'Content-Type': 'application/json'
            }
        }

        if (method === HttpMethods.POST || method === HttpMethods.PATCH || method === HttpMethods.PUT) {
            config.body = JSON.stringify(data)
        }

        if (method === HttpMethods.DELETE) {
            path = `${path}/${data}`
        }
    } else {
        throw Error('Такой Http метод не существует')
    }

    return await fetch(baseUrl + path, config)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Ошибка получения данных: ${path}`)
            }

            // let message
            // switch (method) {
            //     case HttpMethods.POST: {
            //         message = 'Data has been added'
            //         break
            //     }
            //     case HttpMethods.DELETE: {
            //         message = 'Data has been removed'
            //         break
            //     }
            //     case HttpMethods.PUT, HttpMethods.UPDATE: {
            //         message = 'Data has been updated'
            //         break
            //     }
            //     default: {
            //         message = 'Data has been received'
            //     }
            // }

            return response.json()
        })
        .catch(error => {
            console.error(error.message)
            return Promise.reject(error.message)
        })
}
