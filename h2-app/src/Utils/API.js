const API_BASE_URL = 'http://localhost:5000/api/'

export async function GET(url) {
    const response = await fetch(API_BASE_URL + url)
    const body = response.json()

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body
}

export async function POST(url, data) {
    const response = await fetch(API_BASE_URL + url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    const body = response.json()

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body
}