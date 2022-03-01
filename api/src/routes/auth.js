//* rutas de los asesores */
const { Router } = require('express');
const { check } = require('express-validator');
const { validateInput } = require('../middlewares/validateInput');
const { validateJwt } = require('../middlewares/validateJwt');
const { createAssessor, loginAssessor, validateToken } = require('../controllers/auth');



const router = Router();


router.post(
    '/new',
    [// middleware de express validator
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').isLength({ min: 8 }),
        check('rol', 'Rol is required').not().isEmpty(),
        check('admin', 'Admin is required').not().isEmpty(),
        validateInput,  validateJwt,
    ],
    createAssessor);

router.post(
    '/login',
    [// middleware de express validator
        check('email', 'Email is required').isEmail(),
        check('password', 'Password is required').isLength({ min: 8 }),
        validateInput
    ],
    loginAssessor);

router.get('/renew', validateJwt, validateToken);


module.exports = router;