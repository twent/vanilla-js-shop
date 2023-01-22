let baseUrl = 'http://localhost:3001' 

export async function get(path) {
    let response = await fetch(baseUrl + path);
    let json = await response.json();

    return json;
}
