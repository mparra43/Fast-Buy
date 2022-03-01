const { response } = require('express');
const bcryptjs = require('bcryptjs');
const { Assessor } = require('../models/assessor')
const { generateJWT } = require('../middlewares/jwt')

const createAssessor = async (req, res = response) => {

    const { name , email, password, rol, admin } = req.body;

    const adminEmail = admin.email;

    try {

        let admin = await Assessor.findOne({ where: {email: adminEmail, rol: 'ADMIN_ROLE' } });

       if ((admin.rol === 'ADMIN_ROLE' )&& (rol === 'SALE_ROLE' || rol === 'DISTRIBUTION_ROLE')  ) {

            let newAdviser = await Assessor.findOne({ where: { email } })

               if (newAdviser !== null) return res.status(400).json({ ok: false, msg: 'This adviser already exists' });

               else {
                // Encriptar contraseña
                const salt = bcryptjs.genSaltSync();
                let assessorPassword = bcryptjs.hashSync(password, salt);

                // crear un nuevo asesor  en la base de datos
                let newAssessor = await Assessor.create({
                    name,
                    email,
                    password: assessorPassword,
                    rol
                });

                return res.status(201).json({ ok: true, msg: ` The advisor ${name} was successfully created  ` });
            } 
        }

    } catch (error) {
        return res.status(500).json({ ok: false, msg: 'error' })
    }
}


const loginAssessor = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        let assessor = await Assessor.findOne({ where: { email } });

        if (assessor  !== null) {

            const validPassword = bcryptjs.compareSync(password, assessor.password);

            if (!validPassword) return res.status(400).json({ ok: false, msg: 'You have entered incorrect data' });

            else {
                const token = await generateJWT(assessor.id, assessor.name);

                return res.status(200).json({ ok: true, msg: `Welcome ${assessor.name}`, token })
            }

        } else {

            return res.status(400).json({ ok: false, msg: 'permission denied' });
        }

    } catch (e) {
        return res.status(500).json({ ok: false, msg: 'error' })
    }
}



const validateToken = async (req, res = response) => {
    const { id, name } = req;

    const token = await generateJWT(id, name);

    res.json({ id: id, name: name, token });
}

module.exports = {
    createAssessor,
    loginAssessor,
    validateToken
}