var rest = require("./RestEasy.js") //Import the Module

rest.dbSetup(       //Must be called if you want to use mysql calls
    "localhost",    //Host
    "root",         //User
    "",      //Password
    "employees"          //Optionally database
    )

    rest.page("/api/employees/get/", (q) => {
        let baseSQL = "SELECT emp_no AS Id, first_name AS firstName, last_name AS lastName, gender, birth_date AS birthDate, hire_date AS hireDate FROM employees [where] ORDER BY emp_no ASC LIMIT [limitCount]"
            baseSQL = baseSQL.replace('[where]', (q.lastId !== undefined && Number.isNaN(q.lastId) === false) ? ('WHERE emp_no > ' + q.lastId) : '')
            baseSQL = baseSQL.replace('[limitCount]', (q.limit !== undefined && Number.isNaN(q.limit) === false) ? q.limit : '50')
            return baseSQL
    })

    rest.start() //Initialize the server