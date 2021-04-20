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

            console.log('error')
            reject(e);
        })
        .pipe(csv())
        .on('data', (data) => {
            const INUN_ID = data.INUN_ID;
            dest[INUN_ID] = {...dest[INUN_ID],...data}
        })
        .on('end', () => {
//                         console.log('CSV successfully processed');
//                            console.log("processing")
            resolve(true);
            return;
        })

    })

}

const processFile2 = (filepath, input, dest) => { 
    return new Promise((resolve, reject) => {
        fs.createReadStream(filepath)
        .on('error', (e) => {

            console.log('error')
            reject(e);
        })
        .pipe(csv())
        .on('data', (data) => {
            const INUN_ID = data.INUN_ID
            dest[INUN_ID] = {...input[INUN_ID], ...data}
//            data[INUN_ID] = {...data[INUN_ID], ...input}
        })
        .on('end', () => {
//                         console.log('CSV successfully processed');
//                            console.log("processing")
            resolve(true);
            return;
        })

    })

}
let bigData = {};
let csvData = {};
async function finalData() { 
     
        readdir(currDir).then((filenames) => {
        //const filenames = await readdir(currDir);  
        filenames = filenames.filter(filtercsvFiles)
        
            let promises = [];
            
            for (let i=0; i < filenames.length; i++) {
                let currFilePath = currDir + '/' + filenames[i]
                promises.push(processFile(currFilePath, csvData));
                //console.log(i);
            }
            return Promise.all(promises);

        }).then(() =>{

            var outputcsv = [];

            for (var ID in csvData) {
                outputcsv.push(csvData[ID]);
            }
            
            var finalcsv = [], item;
            for (const university of outputcsv ) {
                item = {};
                item.Address = university['EN_FRSH_FT_MEN_N'];
                item.Student_Population = university['EN_FRSH_FT_WMN_N'];
                item.Min_Sat_Score = university['EN_FRSH_PT_MEN_N'];
                item.Min_Act_Score = university['EN_FRSH_PT_WMN_N'];
                finalcsv.push(item);
   
            }
            
            csvWriter.writeRecords(finalcsv)       // returns a promise
                .then(() => {
                    console.log('...Done');
            });
            
        } )

}



const csvWriter = createCsvWriter({
    path: '../exp_csv/2020.csv',
    header: [
        {id: 'Address', title: 'Address'},
        {id: 'Student_Population', title: 'Student_Population'},
        {id: 'Min_Sat_Score', title: 'Min_Sat_Score'},
        {id: 'Min_Act_Score', title: 'Min_Act_Score'},
//        {id: 'instatetuition', title: 'In-State Tuition'},
//        {id: 'outstatetuition', title: 'Out-of-State Tuition'}
    ]
});

finalData()
 


module.exports = router;