import { GET, POST } from './API'

export async function getEmployees(data = '') {
    return POST('employees/get/', data)
}