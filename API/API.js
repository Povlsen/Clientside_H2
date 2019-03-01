var rest = require("./RestEasy.js") //Import the Module
var mysql = require('promise-mysql');
var db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employees',
    connectionLimit: 10
});

const isCurrentFromDates = " AND from_date <= current_date() AND to_date >= current_date()"
const empBaseSelect = "SELECT emp_no AS Id, first_name AS firstName, last_name AS lastName, gender, birth_date AS birthDate, hire_date AS hireDate FROM employees [where]"

const empDeptHistory = "SELECT departments.dept_no AS 'Id', departments.dept_name AS 'name', dept_emp.from_date AS 'from', dept_emp.to_date AS 'to' FROM dept_emp INNER JOIN departments ON departments.dept_no = dept_emp.dept_no WHERE dept_emp.emp_no = [empId]"
const empCurDept = empDeptHistory + " AND dept_emp.from_date <= current_date() AND dept_emp.to_date >= current_date()"

const empManHistory = "SELECT * FROM dept_manager WHERE emp_no = [empId]"
const empCurMan = empManHistory + isCurrentFromDates

const empTitelHistory = "SELECT * FROM titles WHERE emp_no = [empId]"
const empCurTitel = empTitelHistory + isCurrentFromDates

const empSalHistory = "SELECT * FROM salaries WHERE emp_no = [empId]"
const empCurSal = empSalHistory + isCurrentFromDates



rest.page("/api/employees/get/", async (q) => {
    let baseSQL =  empBaseSelect + " ORDER BY emp_no ASC LIMIT [limitCount]"
        baseSQL = baseSQL.replace('[where]', (q.lastId !== undefined && Number.isNaN(q.lastId) === false) ? ('WHERE emp_no > ' + q.lastId) : '')
        baseSQL = baseSQL.replace('[limitCount]', (q.limit !== undefined && Number.isNaN(q.limit) === false) ? q.limit : '50')
        return db.query(baseSQL)
})

rest.page("/api/employee/get/", async (q) => {
    let getBaseEmp = empBaseSelect.replace('[where]', `WHERE emp_no = ${q.Id}`)      
    var employee = (await db.query(getBaseEmp))[0] //only need one

    employee.departments = await db.query(empCurDept.replace('[empId]', q.Id))
    employee.deptManager = await db.query(empCurMan.replace('[empId]', q.Id))
    employee.titels = await db.query(empCurTitel.replace('[empId]', q.Id))
    employee.salary = await db.query(empCurSal.replace('[empId]', q.Id))

    return employee
})
  
rest.page("/api/employee/post/", async (q) => {
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
})

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
