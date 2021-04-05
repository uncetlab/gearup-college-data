var express = require('express')
var router = express.Router()
var fs = require('fs')
const path = require('path')
// const mysqlConnection = require('./connection')
const fastcsv = require('fast-csv')


// router.get("/", function(req, res, next) {
//     res.send("API is working")
// });

const currDir = path.join(__dirname + '/../csvfiles')

const readdir = (dirname) => {
    return new Promise((resolve, reject) => {
        fs.readdir(dirname, (error, filenames) => {
            if (error) {
                reject(error)
            } else {
                resolve(filenames)
                console.log(filenames)
            }
        })
    })
}

module.exports = router;