import { GET, POST } from './API'

export async function getDepartments(seach = null) {
    return GET('departments/get/' + (typeof seach === 'string' ? `?seach=${seach}` : ''))
}

export async function getDepartment(Id) {
    return GET(`department/get/?Id=${Id}`)
}

export async function postDepartment(data) {
    return POST('department/post/', data)
}

export async function postDepartmentManager(data) {
    return POST('department/manager/post/', data)
}

export async function postDepartmentEmployee(data) {
    return POST('department/employee/post/', data)
}