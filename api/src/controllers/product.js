const {response} = require('express');
const { Assessor } = require('../models/assessor')
const {Product} = require('../models/product');




const getAllProduct = async (req, res = response) => {

    try {
        const {count, rows} = await Product.findAndCountAll();
        return res.status(201).json({products:rows});
    } catch (error) {
        return res.status(500).json({msg: "error fallo"});
    }
}


const addNewProduct = async (req, res = response) => {

    const {name, units, price, discount, category, admin} = req.body;

    const adminEmail = admin.email;

    try {

        let admin = await Assessor.findOne({ where: {email: adminEmail, rol: 'ADMIN_ROLE' } });

        if (admin.rol === 'ADMIN_ROLE' ) {

            let product = await Product.findOne({ where: { name } });

                 if (product !== null) return res.status(400).json({ ok: false, msg: 'This product already exists' });
                 else {
                    let newProduct = await Product.create({
                         name,
                         units,
                         price,
                         discount,
                         category
                    });
                     return res.status(201).json({ok: true, msg: `  ${name} was added to the product list`});
                  }

        }else {
            return res.status(400).json({ ok: false, msg: 'permission denied' });
        }

    } catch (error) {
        return res.status(500).json({ ok: false, msg: 'error' })
    }
}




module.exports = {
    getAllProduct,
    addNewProduct,
}