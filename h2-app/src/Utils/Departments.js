import { GET, POST } from './API'

export async function getDepartments() {
    return GET('departments/get/')
}

export async function getDepartment(Id) {
    return GET(`department/get/?Id=${Id}`)
}

export async function postDepartmentManager(data) {
    return POST('department/manager/post/', data)
}

export async function postDepartmentEmployee(data) {
    return POST('department/employee/post/', data)
}