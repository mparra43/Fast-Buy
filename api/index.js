require('dotenv').config();

const server = require('./src/server');

server.listen(process.env.PORT, () => {
    console.log("server running " + process.env.PORT)
})