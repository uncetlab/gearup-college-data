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
async function finalData() { 
        readdir(currDir).then((filenames) => {
            
        filenames = filenames.filter(filtercsvFiles)
        // console.log(filenames)
        let csvData = {}
        
        //let finalData = [];

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
                    const INUN_ID = data.INUN_ID;
//                    if (!csvData[INUN_ID]) {
//                        csvData[INUN_ID] = data;
//                    } else {
                        csvData[INUN_ID] = {...csvData[INUN_ID],...data};
                    //}
                    
//                    if (isEmpty(csvData)) {
//                        csvData.push(data);
//                    } else if (contains(data.INUN_ID, 'INUN_ID', csvData){
//                        
//                    }
//                    csvData.push(data);
                    //console.log(data);
//                    console.log(i);
//                        
//                        if (isEmpty(csvData)) {
////                            Object.keys(data)
////                            .forEach(function eachKey(key) {
////                                //console.log(key, data[key])
////                                csvData[key] = data[key]
////                                console.log(csvData);
////                            })
//                            csvData['test'] = 'value';
//                            csvData['test1'] = 'value1';
//                            console.log(csvData);
//                        } else {
//                            if (contains(data.INUN_ID, 'INUN_ID', csvData)) {
//                                Object.keys(data)
//                                .forEach(function eachKey(key) {
//                                    csvData[j][key] = data[key]
//                                })
//                            }
//    
//                        }
                    })
                    .on('end', () => {
                         console.log('CSV successfully processed');
                        console.log(csvData);
                        // resolve(csvData)
                    })
                
            }

        
        
        })

 
}

finalData();


module.exports = router;