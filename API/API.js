var rest = require("./RestEasy.js") //Import the Module
var mysql = require('promise-mysql');
var db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees',
    connectionLimit: 10
});

//#region Const queries
const isCurrentFromDates = " AND from_date <= current_date() AND to_date >= current_date()"
const empBaseSelect = "SELECT emp_no AS Id, first_name AS firstName, last_name AS lastName, gender, birth_date AS birthDate, hire_date AS hireDate FROM employees [where]"

const empDeptHistory = "SELECT dept_emp.emp_no AS 'employeeId', departments.dept_no AS 'departmentId', departments.dept_name AS 'name', dept_emp.from_date AS 'from', dept_emp.to_date AS 'to' FROM dept_emp INNER JOIN departments ON departments.dept_no = dept_emp.dept_no WHERE dept_emp.emp_no = [empId]"
const empManHistory = "SELECT dept_manager.emp_no AS 'employeeId', dept_manager.dept_no AS departmentId, departments.dept_name AS 'name', from_date AS 'from', to_date AS 'to' FROM dept_manager INNER JOIN departments ON departments.dept_no = dept_manager.dept_no WHERE dept_manager.emp_no = [empId]"
const empTitelHistory = "SELECT emp_no AS 'employeeId', title, title AS 'originalTitle', from_date AS 'from', from_date AS 'originalFrom', to_date AS 'to' FROM titles WHERE emp_no = [empId]"
const empSalHistory = "SELECT emp_no AS 'employeeId', salary, from_date AS 'from', from_date AS 'originalFrom', to_date AS 'to' FROM salaries WHERE emp_no = [empId]"

const deptBaseSelect = "SELECT dept_no AS Id, dept_name AS 'name' FROM departments"
const deptManHistory = "SELECT m.dept_no AS departmentId, e.emp_no AS employeeId, e.first_name AS firstName, e.last_name AS lastName, e.gender, e.birth_date AS birthDate, e.hire_date AS hireDate, m.from_date AS 'from', m.to_date AS 'to' FROM dept_manager AS m INNER JOIN employees AS e ON e.emp_no = m.emp_no WHERE m.dept_no = [deptId]"
//#endregion Const queries

//#region Employee(s) API's
rest.page("/api/employees/get/", async (q, res) => {
    try {
        let baseSQL =  empBaseSelect + " ORDER BY emp_no ASC LIMIT [limitCount]"
        baseSQL = baseSQL.replace('[where]', (q.lastId !== undefined && Number.isNaN(q.lastId) === false) ? ('WHERE emp_no > ' + q.lastId) : '')
        baseSQL = baseSQL.replace('[limitCount]', (q.limit !== undefined && Number.isNaN(q.limit) === false) ? q.limit : '50')
        return db.query(baseSQL)
    } catch {
        res.writeHead(400, "Bad Request")
        return
    }
})

rest.page("/api/employee/get/", async (q, res) => {
    try {
        let getBaseEmp = empBaseSelect.replace('[where]', `WHERE emp_no = ${q.Id}`)      
        var employee = (await db.query(getBaseEmp))[0] //only need one
        if (employee === undefined) {
            res.writeHead(400, "Bad Request")
            return
        }
    
        employee.departments = await db.query(empDeptHistory.replace('[empId]', q.Id))
        employee.deptManager = await db.query(empManHistory.replace('[empId]', q.Id))
        employee.titels = await db.query(empTitelHistory.replace('[empId]', q.Id))
        employee.salary = await db.query(empSalHistory.replace('[empId]', q.Id))
    
        return employee
    } catch {
        res.writeHead(400, "Bad Request")
        return
    }
})
  
rest.page("/api/employee/post/", async (q, res) => {
    try {
        if (!isValidDate(q.birthDate) || !isValidDate(q.hireDate)) {
            res.writeHead(400, "Bad Request")
            return
        }
        let getEmpQery = empBaseSelect.replace('[where]', `WHERE emp_no = ${q.Id}`)
        let currentEmp = await db.query(getEmpQery)
        if (currentEmp.length === 1) {
            // employee exists
            var updateQur = `UPDATE employees SET first_name = '${q.firstName}', last_name = '${q.lastName}', gender = '${q.gender}', birth_date = DATE('${q.birthDate}'), hire_date = DATE('${q.hireDate}') WHERE emp_no = ${q.Id}`
            await db.query(updateQur)        
        } else {
            // employee dosn't exsist
            var empId = await getNextId('employees', 'emp_no')
            var insertQur = `INSERT INTO employees (emp_no, first_name, last_name, gender, birth_date, hire_date) VALUES (${empId}, '${q.firstName}', '${q.lastName}', '${q.gender}', DATE('${q.birthDate}'), DATE('${q.hireDate}'))`
            await db.query(insertQur)
            getEmpQery = empBaseSelect.replace('[where]', `WHERE emp_no = ${empId}`)
        }
    
        return await db.query(getEmpQery)
    } catch {
        res.writeHead(400, "Bad Request")
        return
    }
    
})

rest.page("/api/employee/salary/post/", async (q, res) => {
    try {
        var isBadRequest = false
        if (!isValidDate(q.from) || !isValidDate(q.to)) {
            isBadRequest = true
        } else {
            if (isValidDate(q.originalFrom)) {
                // salary record exists
                var updateQur = `UPDATE salaries SET salary = ${q.salary}, from_date = DATE('${q.from}'), to_date = DATE('${q.to}') WHERE emp_no = ${q.employeeId} AND from_date = DATE('${q.originalFrom}')`
                var updated = await db.query(updateQur)
                if (updated.affectedRows === 0) isBadRequest = true
            } else {
                var insertQur = `INSERT INTO salaries (emp_no, salary, from_date, to_date) VALUES (${q.employeeId}, ${q.salary}, DATE('${q.from}'), DATE('${q.to}'))`
                var inserted = await db.query(insertQur)
                if (inserted.affectedRows === 0) isBadRequest = true
            }
        }
        
        if (isBadRequest) {
            res.writeHead(400, "Bad Request")
            return
        }

        return await db.query(empSalHistory.replace('[empId]', q.employeeId))
    } catch {
        res.writeHead(400, "Bad Request")
        return
    }
})

rest.page("/api/employee/title/post/", async (q, res) => {
    try {
        var isBadRequest = false
        if (!isValidDate(q.from) || !isValidDate(q.to)) {
            isBadRequest = true
        } else {
            if (isValidDate(q.originalFrom)) {
                // tile exists
                var updateQur = `UPDATE titles SET title = ${q.title}, from_date = DATE('${q.from}'), to_date = DATE('${q.to}') WHERE emp_no = ${q.employeeId} AND from_date = DATE('${q.originalFrom} AND title = '${q.originalTitle}'`
                var updated = await db.query(updateQur)
                if (updated.affectedRows === 0) isBadRequest = true
            } else {
                var insertQur = `INSERT INTO title (emp_no, title, from_date, to_date) VALUES (${q.employeeId}, '${q.title}', DATE('${q.from}'), DATE('${q.to}'))`
                var inserted = await db.query(insertQur)
                if (inserted.affectedRows === 0) isBadRequest = true
            }
        }
        
        if (isBadRequest) {
            res.writeHead(400, "Bad Request")
            return
        }

        return await db.query(empTitelHistory.replace('[empId]', q.employeeId))
    } catch {
        res.writeHead(400, "Bad Request")
        return
    }
})
//#endregion Employee(s) API's

//#region Department(s) API's
rest.page("/api/departments/get/", async (q, res) => {
    try {
        return db.query(deptBaseSelect)
    } catch {
        res.writeHead(400, "Bad Request")
        return
    }
})

rest.page("/api/department/get/", async (q, res) => {
    try {
        let getBaseDept = deptBaseSelect + `WHERE dept_no = ${q.Id}`
        var department = (await db.query(getBaseDept))[0] //only need one
        if (department === undefined) {
            res.writeHead(400, "Bad Request")
            return
        }
        
        department.managers = await db.query(deptManHistory.replace('[deptId]', q.Id))

        return department
    } catch {
        res.writeHead(400, "Bad Request")
        return
    }
})

rest.page("/api/department/manager/post/", async (q, res) => {
    try {
        var isBadRequest = false
        if (!isValidDate(q.from) || !isValidDate(q.to)) {
            isBadRequest = true
        } else {
            let getEmpToDeptQery = `SELECT * from dept_manager WHERE emp_no = ${q.employeeId} AND dept_no = '${q.departmentId}'`
            let currentEmpToDept = await db.query(getEmpToDeptQery)
            if (currentEmpToDept.length === 1) {
                // employee is manager in department
                var updateQur = `UPDATE dept_manager SET emp_no = ${q.employeeId}, dept_no = '${q.departmentId}', from_date = DATE('${q.from}'), to_date = DATE('${q.to}') WHERE emp_no = ${q.employeeId} AND dept_no = '${q.departmentId}'`
                var updated = await db.query(updateQur)
                if (updated.affectedRows === 0) isBadRequest = true
            } else {
                var insertQur = `INSERT INTO dept_manager (emp_no, dept_no, from_date, to_date) VALUES (${q.employeeId}, '${q.departmentId}', DATE('${q.from}'), DATE('${q.to}'))`
                var inserted = await db.query(insertQur)
                if (inserted.affectedRows === 0) isBadRequest = true
            }
        }
        
        if (isBadRequest) {
            res.writeHead(400, "Bad Request")
            return
        }

        return await db.query(empManHistory.replace('[empId]', q.employeeId))
    } catch {
        res.writeHead(400, "Bad Request")
        return
    }
})

rest.page("/api/department/employee/post/", async (q, res) => {
    try {
        var isBadRequest = false
        if (!isValidDate(q.from) || !isValidDate(q.to)) {
            isBadRequest = true
        } else {
            let getEmpToDeptQery = `SELECT * from dept_emp WHERE emp_no = ${q.employeeId} AND dept_no = '${q.departmentId}'`
            let currentEmpToDept = await db.query(getEmpToDeptQery)
            if (currentEmpToDept.length === 1) {
                // employee is manager in department
                var updateQur = `UPDATE dept_manager SET emp_no = ${q.employeeId}, dept_no = '${q.departmentId}', from_date = DATE('${q.from}'), to_date = DATE('${q.to}') WHERE emp_no = ${q.employeeId} AND dept_no = '${q.departmentId}'`
                var updated = await db.query(updateQur)
                if (updated.affectedRows === 0) isBadRequest = true
            } else {
                var insertQur = `INSERT INTO dept_emp (emp_no, dept_no, from_date, to_date) VALUES (${q.employeeId}, '${q.departmentId}', DATE('${q.from}'), DATE('${q.to}'))`
                var inserted = await db.query(insertQur)
                if (inserted.affectedRows === 0) isBadRequest = true
            }
        }
        
        if (isBadRequest) {
            res.writeHead(400, "Bad Request")
            return
        }

        if (q.isFromDepartment) return await db.query(empBaseSelect.replace('[empId]', q.employeeId))
        else if (q.isFromEmployee) return await db.query(empDeptHistory.replace('[empId]', q.employeeId))
        else return {}
    } catch {
        res.writeHead(400, "Bad Request")
        return
    }
})
//#endregion Department(s) API's

rest.start(5000) //Initialize the server

async function getNextId(tabel, col) {
    var lastRow = await db.query(`SELECT ${col} FROM ${tabel} ORDER BY ${col} DESC LIMIT 1`)
    if (lastRow.length == 0) return 1
    else {
        var lastId = lastRow[0][col]
        if (!isNaN(lastId)) {
            lastId += 1
            return lastId
        }
        else {
            var start = lastId.slice(0, 1)
            var number = Number(lastId.slice(1, lastId.length)) + 1
            for (var i = 0; i < 3 - number.toString().length; i++)
                start += '0'

            return start + number
        }
    }
}

const isValidDate = (date) => {
    try{
        var d = new Date(date);
        return d.getTime() === d.getTime()
    } catch {
        return false;
    }
  }