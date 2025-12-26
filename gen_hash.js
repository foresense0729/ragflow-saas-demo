const bcrypt = require('bcryptjs');
const pass = 'Admin123!';
const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(pass, salt);
console.log("NEW_HASH:" + hash);
