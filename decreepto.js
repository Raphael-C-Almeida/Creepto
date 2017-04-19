//Dependencies
const crypto    = require('crypto');
const fs        = require('fs');

//Configurations
const encryptionAlgorithm = 'aes-256-ctr';
const key = '$myvirus_sample_encryption_key!!';

//Get the target file name from the first command line parameter
const fileName = process.argv[2];

//Read file and execute callback with file content
function readFileContents(file, callback) {
    fs.readFile(file, (err, data)=>{
        if (err) throw err;
        callback(data);
    });
}

//Receive encrypted file content and a password and return the original file content
function decryptFile(fileContents, password) {
    let decipher = crypto.createDecipher(encryptionAlgorithm,password);
    return Buffer.concat([decipher.update(fileContents), decipher.final()]);
}

//Save data to a file located at fileLocation and execute the callback with fileLocation
function saveToFile(fileLocation, data, callback){
    fs.writeFile(fileLocation, data, (err)=>{
        if(err) {
            return console.log(err);
        }
        callback(fileLocation);
    });
}

//Read file content, decipher it and overwrite the encrypted file
readFileContents(fileName, (fileData)=>{
    let fileByteData = decryptFile(fileData, key);
    saveToFile(fileName, fileByteData, (fileName)=>{
        console.log(fileName+' decrypted')
    })
});