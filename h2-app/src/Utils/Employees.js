import { GET, POST } from './API'

export async function getEmployees(data) {
    return await POST('employees/get/', data)
}