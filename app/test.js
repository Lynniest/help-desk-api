const crypto = require('crypto');

const userId =1

const algorithm = 'aes-256-cbc';
const password = 'a password'; 
const key = crypto.scryptSync(password, 'salt', 32);
const iv = crypto.randomBytes(16); 

const cipher = crypto.createCipheriv(algorithm, key, iv);

let encryptedData = cipher.update(userId.toString(), 'utf8', 'hex');
encryptedData += cipher.final('hex');

console.log(encryptedData);

const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
decryptedData += decipher.final('utf8');

console.log(decryptedData); 

