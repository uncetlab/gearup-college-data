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

const readdir = async (dirname) => {
    //return await fs.readdir(dirname, undefined);
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


const processFile = (filepath, dest) => { 
    return new Promise((resolve, reject) => {
        fs.createReadStream(filepath)
        .on('error', (e) => {

            console.log('error in processFile()')
            reject(e)
        })
        .pipe(csv())
        .on('data', (data) => {
            const INUN_ID = data.INUN_ID;
            dest[INUN_ID] = {...dest[INUN_ID],...data}
        })
        .on('end', () => {
            resolve(true)
            return
        })

    })

}

let csvData = {}
async function finalData() { 
     
        readdir(currDir).then((filenames) => {
        filenames = filenames.filter(filtercsvFiles)
        
            let promises = [];
            
            for (let i=0; i < filenames.length; i++) {
                let currFilePath = currDir + '/' + filenames[i]
                promises.push(processFile(currFilePath, csvData))
            }
            return Promise.all(promises)

        }).then(() =>{

            var outputcsv = []

            for (var ID in csvData) {
                outputcsv.push(csvData[ID]);
            }
            
            var finalcsv = [], item
            for (const university of outputcsv ) {
                item = {}
                item.INUN_ID = university['INUN_ID']
                item.NAME = university['NAME']
                item.LINE1 = university['LINE1']
                item.LINE2 = university['LINE2']
                item.LINE3 = university['LINE3']
                item.CITY = university['CITY']
                item.STATE_CODE = university['STATE_CODE']
                item.ZIPCODE = university['ZIPCODE']
                item.COUNTY = university['COUNTY']
                item.URL_ADDRESS = university['URL_ADDRESS']
                item.MAIN_FUNCTION_TYPE = university['MAIN_FUNCTION_TYPE']
                item.MAIN_INST_CONTROL = university['MAIN_INST_CONTROL']
                item.EN_TOT_N = university['EN_TOT_N']
                item.TUIT_STATE_FT_D = university['TUIT_STATE_FT_D']
                item.TUIT_NRES_FT_D = university['TUIT_NRES_FT_D']
                item.TUIT_OVERALL_FT_D = university['TUIT_OVERALL_FT_D']
                finalcsv.push(item)
            }
            
            csvWriter.writeRecords(finalcsv)       // returns a promise
                .then(() => {
                    console.log('...Done')
            });
            
        } )

}



const csvWriter = createCsvWriter({
    path: '../exp_csv/2020.csv',
    header: [
        {id: 'INUN_ID', title: 'INUN_ID'},
        {id: 'NAME', title: 'NAME'},
        {id: 'LINE', title: 'LINE1'},
        {id: 'LINE2', title: 'LINE2'},
        {id: 'LINE3', title: 'LINE3'},
        {id: 'CITY', title: 'CITY'},
        {id: 'STATE_CODE', title: 'STATE_CODE'},
        {id: 'ZIPCODE', title: 'CITY'},
        {id: 'COUNTY', title: 'COUNTY'},
        {id: 'URL_ADDRESS', title: 'URL_ADDRESS'},
        {id: 'MAIN_FUNCTION_TYPE', title: 'MAIN_FUNCTION_TYPE'},
        {id: 'MAIN_INST_CONTROL', title: 'MAIN_INST_CONTROL'},
        {id: 'EN_TOT_N', title: 'EN_TOT_N'},
        {id: 'TUIT_STATE_FT_D', title: 'TUIT_STATE_FT_D'},
        {id: 'TUIT_NRES_FT_D', title: 'TUIT_NRES_FT_D'},
        {id: 'TUIT_OVERALL_FT_D', title: 'TUIT_OVERALL_FT_D'}
    ]
});

finalData()
 


module.exports = router;