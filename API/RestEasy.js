/*
###RestEasy Beta Version 2###
This code has been shared on the 26th of February 2019 for use at Mercantec

*/

var events = require("events")
var eventEmitter = new events.EventEmitter();
var http = require("http")
var url = require("url")
var fs = require("fs")
var mime = require("mime")

var conn = 0

exports.page = function(path = "/", callback) {
    eventEmitter.on('RestEasy', async function(qPath, query, res) {
        if(path == qPath && !res.foundPage) {
            res.foundPage = true
            var output = await callback(query, res)
            switch (typeof(output)) {
                case "number":
                    handleNumber(output,res)
                    break;
                case "string":
                    handleString(output, res)
                    break;
                case "object":
                    handleObject(output, res)
                    break;
                default:
                    res.end()
                    break;
            }
        }
    })
}

function handleString(query, res) {
    if(isSelectQuery(query) && conn != 0) {
        conn.query(query, function(err, result) {
            if(err) outputError(err, res)
            res.end(JSON.stringify(result))
        })
    } else {
        res.end(query)
    }
}

function handleNumber(query, res) {
    res.end(""+query)
}

function handleObject(query, res) {
    if(query.isRESTQuery) {
        handleQueryObject(query,res)
    } else if (query.isFILEQuery) {
        handleFileObject(query,res)
    } else {
        res.end(JSON.stringify(query))
    }
}

function handleQueryObject(query, res) {
    if(conn) {
        conn.query(query.sql, function(err, result) {
            if(err) outputError(err, res)
            else res.end("Success")
        })
    } else {
        res.end("INTERNAL ERROR no connection")
    }
}

function handleFileObject(query, res) {
    fs.readFile(query.filepath, function (err, data) {        
        if(err) {
            outputError(err,res)
            return
        }
        res.writeHead(200, { 'Content-Type': mime.getType('.\\' + query.filepath) });
        res.end(data)
    })
}

function isSelectQuery(query) {
    return query.trim().toLowerCase().startsWith("select")
} 

function outputError(err, res) {
    var oup = {
        title: "Unhandled Internal Error",
        error_number: err.errno,
        text: err.code
    }
    switch (err.errno) {
        case 1146:
            oup.text = "Error in Query Syntax, are you sure that the table exist?"
            break;
        case 1049:
            oup.text = "Error in Connecting to Database, are you sure that the database exist?"
            break;
        case 1045:
            oup.text = "Connection to database denied, check your credentials"
            break;
        default:
            oup.suggestion = "Please report this error code to <EMAIL> for future handling of this error"
            break;
    }
    if(res) {
        res.end(JSON.stringify(oup," ", 2))
    }
}

exports.start = function(port = 8080) {
    http.createServer(function(req, res) {
        res.setHeader("Access-Control-Allow-Origin", "*")
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
        res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
        if (req.method === "OPTIONS") res.end()
        else req.method === "POST"?handlePost(req,res):handleGet(req,res)
    }).listen(port)
}

function handleGet(req,res) {
    var q = url.parse(req.url, true)
    var pathname = q.pathname
    var query = q.query
    res.foundPage = false;
    eventEmitter.emit('RestEasy', pathname, query, res)
    if(!res.foundPage) {
        res.writeHead(404, "Page not Found")
        res.end()
    }
}
//TODO some repeated code here
function handlePost(req,res) {
    getPostData(req, function(query) {
        var q = url.parse(req.url, true)
        var pathname = q.pathname
        res.foundPage = false;
        eventEmitter.emit('RestEasy', pathname, query, res)
        if(!res.foundPage) {
            res.writeHead(404, "Page not Found")
            res.end()
        }
    })
}

exports.dbSetup = function(host = "localhost", user = "root", password="", database=null) {
    var mysql = require('mysql')

    var connParams = {
        host: host,
        user: user,
        password: password,
    }

    if(database) {
        connParams.database = database
    }

    var con = mysql.createConnection(connParams)
    
    con.connect(function(err) {
        if(err) outputError(err)
        conn = con
    })
}

exports.query = function(query) {
    return {
        isRESTQuery:true,
        sql:query
    }
}

exports.file = function(path) {
    return {
        isFILEQuery:true,
        filepath:path
    }
}

exports.offerFile = function(path) {
    exports.page("/"+path, ()=>exports.file(path))
}

function getPostData(req, callback) {
    var body = '';
    req.on('data', chunk => {
        body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        try {
           body = JSON.parse(body)
        } catch {
            // Doesn't need to do anything here, we just return watever was sent in
        }

        callback(body)
    });
}