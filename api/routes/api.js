var express = require('express')
var router = express.Router()
var fs = require('fs')
const path = require('path')
// const mysqlConnection = require('./connection')
const csv = require('csv-parser')
const createCsvWriter = require('csv-writer').createObjectCsvWriter


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

const contains = (value, key, objArray) => {
    for (let i=0; i < objArray; i++) {
        if (objArray[i][key] === value) {
            return true
        }
    }

    return false
}

const isEmpty = (objArray) => {
    if (objArray.length === 0) {
        return true
    } else {
        return false
    }
    
}

// const csvWriter = createCsvWriter({
//     path: 'collegeData.csv',
//     header: [
//     ]
// })
readdir(currDir).then((filenames) => {
        filenames = filenames.filter(filtercsvFiles)
        // console.log(filenames)
        let csvData = []

        // populate csvData
        for (let i=0; i < filenames.length; i++) {
            let currFilePath = currDir + '/' + filenames[i]
            // console.log(currFilePath)
            fs.createReadStream(currFilePath)
                .on('error', () => {
                    console.log('error')
                })
                .pipe(csv())
                .on('data', (data) => {
                    if (isEmpty(csvData)) {
                        Object.keys(data)
                        .forEach(function eachKey(key) {
                            csvData[key] = data[key]
                        })
                    } else {
                        // close but only returning last value
                        if (contains(data.INUN_ID, 'INUN_ID', csvData)) {
                            Object.keys(data)
                            .forEach(function eachKey(key) {
                                csvData[j][key] = data[key]
                            })
                        }

                    }
                        
                    
                    
                    // csvData.push(data)
                })
                .on('end', () => {
                    // console.log('CSV successfully processed')
                    if (i === 3) {
                        console.log(csvData)
                    }
                })
            
        }
        
    })


module.exports = router;