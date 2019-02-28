import { GET, POST } from './API'

export async function getEmployees(data = '') {
    return POST('employees/get/', data)
}

export async function getEmployee(Id) {
    return GET(`employee/get/?Id=${Id}`)
}