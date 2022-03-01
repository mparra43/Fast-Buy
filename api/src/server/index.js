const express= require('express');
const morgan = require('morgan');
const cors = require('cors');


const server= express();

require('dotenv').config();
require('../database');

server.use(morgan('dev'));


server.use(cors())

server.use(express.json() );


server.use('/auth', require('../routes/auth') );
server.use('/products', require('../routes/products') );
server.use('/orders', require('../routes/orders') );



module.exports = server;
