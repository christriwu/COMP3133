const csv = require('csv-parser')
const fs = require('fs')

//a.	Delete canada.txt and usa.txt if already exist using fs module 
if (fs.existsSync("canada.txt")) {
    fs.unlinkSync("canada.txt");
    console.log('canada.txt deleted')
}

if (fs.existsSync("usa.txt")) {
    fs.unlinkSync("usa.txt");
    console.log('usa.txt deleted')
}

const canadaFile = fs.createWriteStream('canada.txt');
const usaFile = fs.createWriteStream('usa.txt');

fs.createReadStream('input_countries.csv').pipe(csv()).on("data",
(data) => {
//b.	Filter data of Canada and write data to canada.txt
    if(data.country.toLowerCase() === 'canada'){
        canadaFile.write(`${data.country}, ${data.year}, ${data.population}\n`)
    }
//c.	Filter data of United States and write data to usa.txt
    if(data.country.toLowerCase() === 'united states'){
        usaFile.write(`${data.country}, ${data.year}, ${data.population}\n`)
    }
})
.on("end", ()=>{
    console.log("completed reading csv")
    
})


