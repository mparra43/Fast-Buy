/* rutas de las ordenes  */
const { Router } = require('express');
const { check } = require('express-validator');
const { validateInput } = require('../middlewares/validateInput');
const { validateJwt } = require('../middlewares/validateJwt');
const { getAllOrders, updateOrderStatus, addNewOrder } = require('../controllers/order');

const router = Router();

router.get('/allOrders', validateJwt, getAllOrders);

router.put('/dispatchOrders', [
    check('id', 'Order id number  is required').not().isEmpty(),
    check('state', 'State is required').not().isEmpty(),
    check('assessor', 'The assessor is required').not().isEmpty(),
    validateInput, validateJwt
],
    updateOrderStatus);

router.post('/addNewOrder',
    [// middleware de express validator
        check('customer', 'Customer name is required').not().isEmpty(),
        check('customerIdentification', 'Customer ID number is required').not().isEmpty(),
        check('address', 'the shipping address is required').not().isEmpty(),
        check('products', 'it is necessary to add at least one product to the order').not().isEmpty(),
        validateInput
    ],
    addNewOrder);


module.exports = router;