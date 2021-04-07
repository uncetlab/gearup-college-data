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
                    if (csvData.length === 0) {
                        csvData.push(data)
                    } else {
                        for(let j=0; j < csvData.length; j++) {
                            if (csvData[j].INUN_ID === data.INUN_ID) {
                                Object.keys(data)
                                .forEach(function eachKey(key) {
                                    csvData[j][key] = data[key]
                                })
                            }
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