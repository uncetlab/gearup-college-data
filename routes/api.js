var express = require('express')
var router = express.Router()
var fs = require('fs')
const path = require('path')
const csv = require('csv-parser')
const createCsvWriter = require('csv-writer').createObjectCsvWriter



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


async function finalData() { 
        readdir(currDir).then((filenames) => {
            
        filenames = filenames.filter(filtercsvFiles)
        let csvData = {}

            for (let i=0; i < filenames.length; i++) {
                
                let currFilePath = currDir + '/' + filenames[i]
                fs.createReadStream(currFilePath)
                    .on('error', () => {
                        console.log('error')
                    })
                    .pipe(csv())
                    .on('data', (data) => {
                        const INUN_ID = data.INUN_ID
                        csvData[INUN_ID] = {...csvData[INUN_ID],...data}
                    })
                    .on('end', () => {
//                         console.log('CSV successfully processed');
                        console.log(csvData)
                    })
            }

        })

}

finalData()

module.exports = router;