var express = require('express')
var router = express.Router()
var fs = require('fs')
const path = require('path')
// const mysqlConnection = require('./connection')
// const fastcsv = require('fast-csv')
const csv = require('csv-parser')


// router.get("/", function(req, res, next) {
//     res.send("API is working")
// });

const currDir = path.join(__dirname + '/../tmp')

const filtercsvFiles = (filenames) => {
    return filenames.split('.')[1] === 'csv'
}

const readdir = (dirname) => {
    return new Promise((resolve, reject) => {
        fs.readdir(dirname, (error, filenames) => {
            if (error) {
                reject(error)
            } else {
                resolve(filenames)
            }
        })
    })
}

readdir(currDir).then((filenames) => {
    filenames = filenames.filter(filtercsvFiles)
    // console.log(filenames)
    let csvData = []

    // populate csvData
    for (let i=0; i < filenames.length; i++) {
        let currFilePath = currDir + '/' + filenames[i]
        // console.log(currFilePath)
        fs.createReadStream(currFilePath)
            .pipe(csv())
            .on('data', (data) => {
                csvData.push(data)
                // console.log(csvData)
                //push array of programs
            })
            .on('end', () => {
                console.log('CSV file successfully processed')
                
            })
        
    }



     
})


module.exports = router;