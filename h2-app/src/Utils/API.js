const API_BASE_URL = 'http://localhost:8080/api/'

function GET(url) {
    const response = fetch(API_BASE_URL + url)
    const body = JSON.parse(response.json())

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body
}

function POST(url, data) {
    const response = fetch(API_BASE_URL + url, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })

    const body = JSON.parse(response.json())

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body
}