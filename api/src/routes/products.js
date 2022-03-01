/* rutas de las products  */
const { Router } = require('express');
const { check } = require('express-validator');
const { validateInput } = require('../middlewares/validateInput');
const { validateJwt } = require('../middlewares/validateJwt');
const { getAllProduct, addNewProduct } = require('../controllers/product');

const router = Router();

router.get('/allProduct', getAllProduct);

router.post('/addNewProduct',
    [// middleware de express validator
        check('name', 'The name of the product is required').not().isEmpty(),
        check('units', 'The available units of the product are mandatory').not().isEmpty(),
        check('price', 'The sale price is mandatory').not().isEmpty(),
        check('discount', 'Sales discount is mandatory').not().isEmpty(),
        check('category', 'the product category is required').not().isEmpty(),
        check('admin', 'Admin is required').not().isEmpty(),
        validateInput, validateJwt
    ],
    addNewProduct);


module.exports = router;