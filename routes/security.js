const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const mysqlConnection = require('../configurations/db-conf');


router.post("/login", (req, res) => {
    const body = req.body;
    console.log(body.userName);
    let user;           

    mysqlConnection.query("Select * from usuario where userName = ?", body.userName, (err, rows, field) => {
        if (!err) {
            user = rows[0];
            if (user === undefined) {
                return res.status(401).send('user does not exist');
            }
            if (body.password === user.password) {
                const token = jwt.sign({_id: user.id}, 'secret', { expiresIn: '5m' });
                return res.status(200).json({ token });
            } else {
                return res.status(401).send('Login Invalido');
            }
        } else {
            return res.status(500).send(err);
        }
    });
});

module.exports = router;