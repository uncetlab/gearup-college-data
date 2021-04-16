var express = require('express')
var router = express.Router()
var fs = require('fs')
const path = require('path')
const csv = require('csv-parser')
const createCsvWriter = require('csv-writer').createObjectCsvWriter
const headers = require('./header.js')

headerObj = headers.csvHeader



const currDir = path.join(__dirname + '/../tmp')
// console.log(__dirname)

const csvWriter = createCsvWriter({
    path: __dirname,
    header: headerObj
})

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

const contains = (key) => {
    values = ['INUN_ID', 'NAME', 'LINE1', 'LINE2', 'LINE3', 'CITY', 'STATE_CODE', 'ZIPCODE', 'COUNTY', 'URL_ADDRESS', 'MAIN_FUNCTION_TYPE', 'MAIN_INST_CONTROL', 'EN_TOT_N', 'TUIT_STATE_FT_D', 'TUIT_OVERALL_FT_D', 'TUIT_NRES_FT_D']
    for (let i=0; i < values.length; i++) {
        if (key === values[i]) {
            return true
        }
    }
    return false
}

const combineCSVs = (currDir, filenames) => {
    return new Promise((resolve, reject) => {
        let collegesArr = []
        
        if (filenames.length === 0) {
            reject('No files')
        } else {
            for (let i=0; i < filenames.length; i++) {
                let currFilePath = currDir + '/' + filenames[i]
                fs.createReadStream(currFilePath)
                    .on('error', () => {
                        console.log('error')
                    })
                    .pipe(csv())
                    .on('data', (data) => {
                        const INUN_ID = data.INUN_ID
                        for (const key in data) {
                            // ned to create object in for loop
                            // need to figure out how to properly add to array when complete
                            let college = {}
                            if (contains(key)) {
                              college[key] = data[key]
                            }
                        }
                        
                    })
                    .on('end', () => {
                        // console.log(college)
                    })
            }

        }
        
        
    })
    
}


async function finalData() { 
        readdir(currDir).then((filenames) => {
            
        filenames = filenames.filter(filtercsvFiles)
        // let csvData = {}

//             for (let i=0; i < filenames.length; i++) {
                
//                 let currFilePath = currDir + '/' + filenames[i]
//                 fs.createReadStream(currFilePath)
//                     .on('error', () => {
//                         console.log('error')
//                     })
//                     .pipe(csv())
//                     .on('data', (data) => {
//                         const INUN_ID = data.INUN_ID
//                         csvData[INUN_ID] = {...csvData[INUN_ID],...data}
//                     })
//                     .on('end', () => {
// //                         console.log('CSV successfully processed');
//                         // console.log(csvData)
//                         // return csvData
//                     })
//             }
            combineCSVs(currDir, filenames).then((data) => { 
                // console.log(data)
                // csvWriter.writeRecords(data).then(() => {
                //     try {
                //         console.log('...Done')
                //     } catch {
                //         console.log('Not working')
                //     }
                    
                // })
             })
        })

}

finalData()

module.exports = router;