const { response } = require('express');
const { Assessor } = require('../models/assessor');
const { Order } = require('../models/order');
const { formatOrderFields, formatDate } = require('../utils/formatOrderFields')


const addNewOrder = async (req, res = response) => {

    const { creator, customer, customerIdentification, address, products } = req.body;

    try {

        const { summary, discounts, total, totalNet, taxes, } = formatOrderFields(products);
        const { applicationDate, deliveryDate } = formatDate();

        if (!creator) {
            let newOrder = await Order.create({
                creator: 'shop',
                cid: '2',
                customer,
                customerIdentification,
                address,
                products: summary.toString(),
                discounts,
                taxes,
                totalNet,
                total,
                applicationDate,
                deliveryDate,
                state: 'invoiced',
                priority: false,
                dispatcher: 'none'
            });

            return res.status(201).json({ ok: true, msg: `A new order has been added,  the delivery date will be the ${deliveryDate}` });
        } else {

            let assessor = await Assessor.findOne({ where: { name: creator } });
            if (assessor !== null) {
                let newOrder = await Order.create({
                    creator,
                    cid: assessor.id,
                    customer,
                    customerIdentification,
                    address,
                    products: summary.toString(),
                    discounts,
                    taxes,
                    totalNet,
                    total,
                    applicationDate,
                    deliveryDate,
                    state: 'invoiced',
                    priority: true,
                    dispatcher: 'none'
                });
                return res.status(201).json({ ok: true, msg: `A new order has been added,  the delivery date will be the ${deliveryDate}` });
            } else {
                return res.status(400).json({ ok: false, msg: 'permission denied' });
            }
        }

    } catch (e) {
        return res.status(500).json({ msg: "error" })
    }
}




const getAllOrders = async (req, res = response) => {
    const { state } = req.query;

    try {
        if (state) {
            const orders = await Order.findAll({ where: { state: state } });
            return res.status(201).json({ orders });
        } else {
            const { count, rows } = await Order.findAndCountAll();
            return res.status(201).json({ orders: rows });
        }
    } catch (error) {
        return res.status(500).json({ msg: 'error' });
    }
}


const updateOrderStatus = async (req, res = response) => {

    const { id, state, assessor } = req.body;

    const adminEmail = assessor.email;

    try {
        const admin = await Assessor.findOne({ where: { email: adminEmail, rol: 'DISTRIBUTION_ROLE' } });

        if (admin.rol === 'DISTRIBUTION_ROLE') {

            const order = await Order.update({ state: state, dispatcher: admin.name }, { where: { id: id } });

            return res.status(201).json({ ok: true, msg: `the order number ${id}, was updated and  is in a state of ${state}` });
        } else {
            return res.status(400).json({ ok: false, msg: 'permission denied' });
        }

    } catch (error) {
        return res.status(500).json({ msg: 'error' });
    }
}





module.exports = {
    addNewOrder,
    getAllOrders,
    updateOrderStatus,
}