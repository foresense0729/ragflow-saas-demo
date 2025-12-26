const bcrypt = require('bcryptjs');

const hash = '$2a$10$7uM9JLnYf1JCeJyb5fQW3eXqfNw2YhL2wuVSKzEY2m5pXL9uBebUa';
const pass = 'Admin123!';

console.log(`Testing password: ${pass}`);
console.log(`Against hash: ${hash}`);

bcrypt.compare(pass, hash).then(valid => {
    console.log(`Match result: ${valid}`);
}).catch(err => {
    console.error("Error:", err);
});
